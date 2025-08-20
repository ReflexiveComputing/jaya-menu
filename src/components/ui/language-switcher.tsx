"use client"

import * as React from "react"
import { ChevronDown, Globe } from "lucide-react"
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  { code: 'en', name: 'english', flag: '🇺🇸' },
  { code: 'de', name: 'german', flag: '🇩🇪' }
]

const LOCALE_COOKIE = 'NEXT_LOCALE'

// Helper function to set cookie
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleLanguageChange = (languageCode: string) => {
    // Set the locale cookie
    setCookie(LOCALE_COOKIE, languageCode)
    
    // Navigate to the new locale
    router.push(pathname, { locale: languageCode })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between bg-white/20 border border-gray-300 text-gray-900 font-bold text-lg"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span className="font-medium">
              {currentLanguage?.code.toUpperCase()}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <div className="p-1">
          <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 border-b border-gray-100">
            {t('switchLanguage')}
          </div>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`
                w-full flex items-center gap-3 px-2 py-2 text-sm rounded-sm hover:bg-gray-100 transition-colors
                ${locale === language.code ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600'}
              `}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{t(language.name)}</span>
              {locale === language.code && (
                <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
