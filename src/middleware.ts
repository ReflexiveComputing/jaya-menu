import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',
    // Enable redirects that add missing locales but explicitly exclude API routes
    // so that `/api/*` endpoints are not rewritten to `/:locale/api/*` and can be
    // handled directly by their route handlers.
    '/((?!_next|_vercel|api|.*\\..*).*)'
  ]
};