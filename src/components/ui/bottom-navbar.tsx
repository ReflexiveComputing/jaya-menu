"use client"

import React from "react"
import { Utensils, Heart, Settings2, CupSoda } from "lucide-react"
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

interface BottomNavbarProps {
  selectedNav: string
  onNavClick: (nav: string) => void
}

export function BottomNavbar({ selectedNav, onNavClick }: BottomNavbarProps) {
  const [showBottomNav, setShowBottomNav] = React.useState(true)
  const lastScrollY = React.useRef(0)
  const t = useTranslations('Navigation');

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY.current) {
        setShowBottomNav(true) // scrolling up
      } else if (currentScrollY > lastScrollY.current) {
        setShowBottomNav(false) // scrolling down
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4  transition-transform duration-300 ${showBottomNav ? "translate-y-0" : "translate-y-full"
        }`}
    >
      <div className="flex justify-around items-center">
        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "food" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("food")}
        >
          <Link href="/food" className="flex flex-col items-center gap-1">
            <Utensils className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">{t('food')}</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "combos" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("combos")}
        >
          <Link href="/drinks" className="flex flex-col items-center gap-1">
            <CupSoda className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">{t('drinks')}</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "favorites" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("favorites")}
        >
          <Link href="/wishlist">
            <Heart className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">{t('wishlist')}</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 text-gray-600`}
          onClick={() => onNavClick("options")}
        >
          <Settings2 className="m-auto w-6 h-6" />
          <span className="text-xs font-medium">{t('options')}</span>
        </button>
      </div>
    </div>
  )
}
