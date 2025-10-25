"use client"

import React from "react"
import { Plus, Heart } from "lucide-react"
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { AddItem } from "./food-card/add-item"
import { MenuItemFull } from "@/types/menu"
import { AddMenuItem } from "./add-menu-item"

interface BottomNavbarProps {
  item: MenuItemFull
  selectedNav: string
  onNavClick: (nav: string) => void
  
}

export function JoystickMenuNavbar({ item, selectedNav, onNavClick }: BottomNavbarProps) {
  const t = useTranslations('Navigation')

  const handle = (key: string, href?: string) => {
    onNavClick(key)
  }

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {/* vertical column container */}
      <div className="flex flex-col w-12 space-y-1">
        {/* top: yellow square with plus */}
        <AddMenuItem item={item} />
        

        <div className={`w-12 h-12 overflow-hidden rounded-full`}>
          {/*
            If you have a route for wishlist keep Link, otherwise this can be a button.
            Link from '@/i18n/routing' behaves like next/link in your project.
          */}
          <Link
            href="/wishlist"
            onClick={() => handle("favorites", "/wishlist")}
            className="w-full h-full flex items-center justify-center  bg-app-dark-highlight/10 backdrop-blur-sm text-white"
            aria-label={t('wishlist') || "Add to Plate"}
          >
            <Heart className="w-9 h-9 text-white" />
            <span className="sr-only">{t('wishlist') || "Your Plate"}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
