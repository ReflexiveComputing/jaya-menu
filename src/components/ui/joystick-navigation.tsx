"use client"

import React from "react"
import { Utensils, Heart, Settings2, Coffee, Menu, X } from "lucide-react"
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface BottomNavbarProps {
  selectedNav: string
  onNavClick: (nav: string) => void
}

export function JoystickNavigation({ selectedNav, onNavClick }: BottomNavbarProps) {
  // whether the user is actively scrolling (controls transparency)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const lastScrollY = React.useRef(0)
  const scrollTimeout = React.useRef<number | null>(null)
  const t = useTranslations('Navigation')

  React.useEffect(() => {
    const handleScroll = () => {
      // any scroll marks the navbar as 'scrolling' (more transparent)
      setIsScrolling(true)
      // close menu immediately on scroll
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current)
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false)
        scrollTimeout.current = null
      }, 200)
      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current)
    }
  }, [])

  // radial menu items (order matches existing nav)
  const items = [
    // { key: 'food', icon: <Utensils className="w-9 h-9" />, label: t('food'), href: '/food' },
    // { key: 'drinks', icon: <Coffee className="w-9 h-9" />, label: t('drinks'), href: '/drinks' },
    { key: 'favorites', icon: <Heart className="w-9 h-9" />, label: t('wishlist'), href: '/wishlist' },
    // { key: 'options', icon: <Settings2 className="w-9 h-9" />, label: t('options'), href: undefined },
  ]


  const handleItemClick = (key: string) => {
    onNavClick(key)
  }

  return (
    <>
      {/* backdrop when menu open for contrast */}


      <div
        className={`fixed z-50 bottom-12 right-1`}
      >
        <div className="relative m-auto w-14 h-full">
          {/* radial buttons */}
          {items.filter((item) => item.key !== selectedNav).map((it, i) => {

            return (
              <div
                key={it.key}
                className={`m-auto w-12 h-12   transparent shadow-lg flex items-center justify-center `}
              >
                {it.href ? (
                  <Link href={it.href} onClick={() => handleItemClick(it.key)} className=" bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center w-full h-full text-white">
                    {it.icon}
                    <span className="sr-only">{it.label}</span>
                  </Link>
                ) : (
                  <button
                    className="flex flex-col items-center justify-center w-full h-full text-gray-700"
                    onClick={() => handleItemClick(it.key)}
                    aria-label={it.label}
                  >
                    {it.icon}
                  </button>
                )}
              </div>
            )
          })}


        </div>
      </div>
    </>
  )
}
