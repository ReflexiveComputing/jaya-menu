"use client"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import Image from "next/image"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useNavbar } from "@/components/providers/navbar-provider";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const { setSelectedNav } = useNavbar();
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/background-1.png"
        alt="Mitho-Cha-Restaurant"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Light overlay for better text readability */}
      <div className="absolute min-h-full inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 pt-10 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-1">
          {/* Logo */}
          <div className="">
            <Image
              src="/Mithocha_logo_transparent.png"
              alt="Mithocha Logo"
              width={200}
              height={100}
              className="object-contain"
              priority
            />
          </div>

          {/* Headline */}
          <div className="text-center uppercase ">
            <h1 className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg font-header">{t('title')}</h1>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg font-header">{t('subtitle')}</h1>
            <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg font-header">{t('subtitle2')}</h1>
          </div>
        </div>

        {/* Action Buttons - Positioned at bottom */}
        <div className="px-6 pt-20">
          <div className="w-full max-w-sm mx-auto space-y-4 ">
            <Button variant="surpriseMe" asChild>
              <Link href="/food" className="w-block" onClick={() => setSelectedNav('food')}>
                {t('helpMeChoose')}
              </Link>
            </Button>

            <Button variant="surpriseMeSecondary" asChild>
              <Link href="/drinks" className="w-block uppercase" onClick={() => setSelectedNav('drinks')}>
                {t('showMenu')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="w-full pt-30 bottom-0 right-0 flex justify-end p-4">
          <LanguageSwitcher />
        </div>

      </div>

    </div>
  )
}
