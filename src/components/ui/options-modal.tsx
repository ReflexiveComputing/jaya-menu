"use client"

import React from "react"
import { AlertTriangle, Globe, MessageSquare, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter as useIntlRouter } from '@/i18n/routing'
import { Header } from "./header"
import { Button } from "./button"
import { OptionsItem } from "./options-item"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";

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

interface OptionsModalProps {
    open: boolean
    onClose: () => void
}

export function OptionsModal({ open, onClose }: OptionsModalProps) {
    const router = useRouter()
    const t = useTranslations('LanguageSwitcher')
    const locale = useLocale()
    const pathname = usePathname()
    const intlRouter = useIntlRouter()
    const [languagePopoverOpen, setLanguagePopoverOpen] = React.useState(false)
    
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    const handleNavigationClick = (navigationPath: string) => {
        onClose()
        router.push(navigationPath)
    }

    const currentLanguage = languages.find(lang => lang.code === locale)

    const handleLanguageChange = (languageCode: string) => {
        // Set the locale cookie
        setCookie(LOCALE_COOKIE, languageCode)
        
        // Navigate to the new locale
        intlRouter.push(pathname, { locale: languageCode })
        setLanguagePopoverOpen(false)
    }




    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
            {/* Header */}
            <Header title={"Options"} />

            {/* Options List */}
            <div className="flex-1 flex flex-col items-center justify-center w-full ">
                <div className="w-full flex flex-col gap-1">
                    {/* Option Card Example */}
                    <Link onClick={onClose} href="/surprise">
                        <OptionsItem
                            title={"Retake Quiz"}
                            description={"Retake the quiz and get new recommendations"}
                            icon="message-circle-question-mark"
                        />
                    </Link>
                    <Link onClick={onClose} href="/dietary-preferences">
                        <OptionsItem
                            title={"Dietary Preferences"}
                            description={"Manage your dietary restrictions"}
                            icon="alert-triangle"
                        />
                    </Link>
                    <Popover open={languagePopoverOpen} onOpenChange={setLanguagePopoverOpen}>
                        <PopoverTrigger asChild>
                            <div>
                                <OptionsItem
                                    title={"Change Language"}
                                    description={`Current: ${currentLanguage?.name || 'English'}`}
                                    icon="globe"
                                    asChild
                                >
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </OptionsItem>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0" align="center">
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
                    <Link onClick={onClose} href="/feedback">
                        <OptionsItem
                            title={"Send Feedback"}
                            description={"Help us improve your experience"}
                            icon="message-square"
                        />
                    </Link>
                </div>
            </div>
            {/* Close Button at Bottom */}
            <div className="w-full px-6 pb-8 flex justify-end">
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    )
}

