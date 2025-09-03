"use client"

import React from "react"
import { Utensils, Heart, Settings2, Coffee, Menu, X } from "lucide-react"
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface BottomNavbarProps {
  selectedNav: string
  onNavClick: (nav: string) => void
}

export function JoystickMenuNavbar({ selectedNav, onNavClick }: BottomNavbarProps) {
  const [showBottomNav, setShowBottomNav] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const lastScrollY = React.useRef(0)
  const t = useTranslations('Navigation')

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY.current) {
        setShowBottomNav(true) // scrolling up
      } else if (currentScrollY > lastScrollY.current) {
        setShowBottomNav(false) // scrolling down
        // consider closing menu while scrolling
        setOpen(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // radial menu items (order matches existing nav)
  const items = [
    { key: 'food', icon: <Utensils className="w-5 h-5" />, label: t('food'), href: '/food' },
    { key: 'combos', icon: <Coffee className="w-5 h-5" />, label: t('drinks'), href: '/drinks' },
    { key: 'favorites', icon: <Heart className="w-5 h-5" />, label: t('wishlist'), href: '/wishlist' },
    { key: 'options', icon: <Settings2 className="w-5 h-5" />, label: t('options'), href: undefined },
  ]

  const radius = 85 // px - how far buttons travel

  const start = 75
  const end = 190
  const count = items.length // 4
  const angles = Array.from({ length: count }, (_, i) =>
    Math.round(start + i * (end - start) / (count - 1))
  )

  const handleItemClick = (key: string) => {
    onNavClick(key)
    setOpen(false)
  }

  return (
    <>
      {/* backdrop when menu open for contrast */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        className={`fixed z-50 bottom-6 right-6 transition-transform duration-300 ${showBottomNav ? 'translate-y-0' : 'translate-y-20'}`}
        aria-expanded={open}
      >
        <div className="relative w-14 h-14">
          {/* radial buttons */}
          {items.map((it, i) => {
            const rad = (angles[i] * Math.PI) / 180
            const x = Math.round(Math.cos(rad) * radius)
            const y = Math.round(Math.sin(rad) * radius)
            const style = {
              transform: open ? `translate(${x}px, ${y * -1}px) scale(1)` : 'translate(0,0) scale(0.6)',
            }
            return (
              <div
                key={it.key}
                style={style}
                className={`absolute left-0 bottom-0 w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center transition-all duration-350 ease-out ${open ? 'opacity-100' : 'opacity-0'} ${selectedNav === it.key ? 'ring-2 ring-teal-400' : ''}`}
              >
                {it.href ? (
                  <Link href={it.href} onClick={() => handleItemClick(it.key)} className="flex flex-col items-center justify-center w-full h-full text-gray-700">
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

          {/* main hamburger / toggle button */}
          <button
            className={`relative w-14 h-14 rounded-full bg-white/75 shadow-xl flex items-center justify-center transition-all duration-200 ${open ? 'scale-90' : 'scale-100'}`}
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-pressed={open}
          >
            <span className="pointer-events-none text-gray-800">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
