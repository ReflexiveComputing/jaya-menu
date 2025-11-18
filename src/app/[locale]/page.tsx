"use client"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import Image from "next/image"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useNavbar } from "@/components/providers/navbar-provider";
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun";

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
          <div className="flex flex-col justify-center text-center uppercase font-[family-name:var(--font-fjalla-one)] ">
            <div className="m-auto w-fit">
              <NepaliSunIcon size={64} backgroundColor="#febd3a"/>
            </div>
            <h1 className="text-5xl font-medium text-white mb-2 tracking-tight drop-shadow-lg ">{t('title')}</h1>
          </div>
          <div className="">
            <Image
              src="/Mithocha_logo_transparent.png"
              alt="Mithocha Logo"
              width={270}
              height={200}
              className="object-contain"
              priority
            />
          </div>

          {/* Headline */}
          <div className=" flex flex-col text-center uppercase font-[family-name:var(--font-fjalla-one)] ">
            <h1 className="text-2xl font-medium text-white tracking-tight drop-shadow-lg ">{t('subtitle')}</h1>
          </div>
        </div>

        {/* Action Buttons - Positioned at bottom */}
        <div className="px-6 pt-10">
          <div className="w-2/3 max-w-sm mx-auto space-y-4 ">
            <Button variant="surpriseMe" asChild>
              <Link href="/food" className="w-block font-[family-name:var(--font-fjalla-one)]" onClick={() => setSelectedNav('food')}>
                {t('helpMeChoose')}
              </Link>
            </Button>
            
            <Button variant="surpriseMeSecondary" asChild>
              <Link href="/drinks" className="w-block uppercase font-[family-name:var(--font-fjalla-one)]" onClick={() => setSelectedNav('drinks')}>
                {t('showMenu')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="w-full pt-10 bottom-0 right-0 flex justify-end p-4">
          <LanguageSwitcher />
        </div>

      </div>

    </div>
  )
}
