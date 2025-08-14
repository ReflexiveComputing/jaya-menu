import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import {routing, Locale} from './i18n/routing';

const LOCALE_COOKIE = 'NEXT_LOCALE'

function detectLocaleFromHeaders(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) {
    return routing.defaultLocale
  }

  // Parse Accept-Language header
  const preferredLanguages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality] = lang.trim().split(';q=')
      return {
        code: code.toLowerCase().split('-')[0], // Get just the language part (en from en-US)
        quality: quality ? parseFloat(quality) : 1.0
      }
    })
    .sort((a, b) => b.quality - a.quality) // Sort by quality score

  // Find the first supported locale
  for (const lang of preferredLanguages) {
    if (routing.locales.includes(lang.code as Locale)) {
      return lang.code as Locale
    }
  }

  return routing.defaultLocale
}

export default function middleware(request: NextRequest) {
  // Check for existing locale cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  
  let preferredLocale: Locale
  
  if (cookieLocale && routing.locales.includes(cookieLocale as Locale)) {
    // Use cookie locale if valid
    preferredLocale = cookieLocale as Locale
  } else {
    // Detect from headers and set cookie
    preferredLocale = detectLocaleFromHeaders(request)
  }

  // Create the next-intl middleware with our detected locale
  const handleI18nRouting = createMiddleware({
    ...routing,
    defaultLocale: preferredLocale
  })

  const response = handleI18nRouting(request)

  // Set the locale cookie if it's not already set or different from current
  if (!cookieLocale || cookieLocale !== preferredLocale) {
    response.cookies.set(LOCALE_COOKIE, preferredLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  return response
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/menu` -> `/menu` for default locale)
    '/((?!_next|_vercel|.*\\..*).*)' 
  ]
};