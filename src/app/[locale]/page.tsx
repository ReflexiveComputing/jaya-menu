"use client"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import Image from "next/image"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useNavbar } from "@/components/providers/navbar-provider";
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const { setSelectedNav } = useNavbar();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedNav('drinks');
      router.push('/drinks');
    }, 6000);

    return () => clearTimeout(timer);
  }, [router, setSelectedNav]);
  return (
    <div className="min-h-screen relative overflow-hidden bg-app-red">
      {/* Background Image */}
      {/* <Image
        src="/background-1.png"
        alt="Mitho-Cha-Restaurant"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      /> */}

      {/* Light overlay for better text readability */}
      <div className="absolute min-h-full inset-0 " />

      {/* Content */}
      <div className="relative z-10 min-h-[90vh] my-10 flex flex-col w-2/3 m-auto border-9">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-10 px-6 py-0">
          {/* Logo */}
           <div className=" w-fit">
              
              <Image
              src="https://snhltnwklxscjle7.public.blob.vercel-storage.com/jaya-public/flavar-logo-jaya.png"
              alt="Yaya Logo"
              width={118}
              height={55}
              className="object-cover"
              priority
            />
            </div>
            <div className=" w-fit">
              
              <NepaliSunIcon size={38} backgroundColor="#febd3a"/>
            </div>
            <div className=" w-fit">
              
              <NepaliSunIcon size={66} backgroundColor="#23FFCB"/>
            </div>
          <div className="flex flex-col justify-center text-center uppercase font-(family-name:--font-fjalla-one) ">
          </div>
          <div className=" bg-app-red min-w-screen max-h-[300px] flex justify-center mb-6 mt-4 rounded-full overflow-hidden ">
            <Image
              src="https://snhltnwklxscjle7.public.blob.vercel-storage.com/jaya-public/Yaka_illust_png.png"
              alt="Yaya Logo"
              width={270}
              height={200}
              className="object-cover"
              priority
            />
          </div>

          {/* Headline */}
          <div className=" flex flex-col text-center uppercase font-(family-name:--font-fjalla-one) ">
            <h1 className="text-7xl font-medium text-white mb-2 tracking-tight drop-shadow-lg ">{t('title')}</h1>
            <h1 className="text-7xl font-medium text-white tracking-tight drop-shadow-lg ">{t('subtitle')}</h1>
          </div>
        </div>

        {/* Action Buttons - Positioned at bottom */}
        {/* <div className="px-6 pt-10">
          <div className="w-2/3 max-w-sm mx-auto space-y-4 ">
           
            
            <Button variant="surpriseMeSecondary" asChild>
              <Link href="/drinks" className="w-block uppercase font-(family-name:--font-fjalla-one)" onClick={() => setSelectedNav('drinks')}>
                {t('showMenu')}
              </Link>
            </Button>
          </div>
        </div> */}

        {/* Language Switcher */}
        {/* <div className="w-full pt-10 bottom-0 right-0 flex justify-end p-4">
          <LanguageSwitcher />
        </div> */}

      </div>

    </div>
  )
}
