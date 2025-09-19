"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { MenuItemFull } from "@/types/menu"
import type { Drink } from "@/types/drink"

interface WishlistContextValue {
  favorites: MenuItemFull[]
  toggle: (item: MenuItemFull) => void
  isFavorite: (id: string | number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MenuItemFull[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favorites))
  }, [favorites])

  const toggle = (item: MenuItemFull) => {
    setFavorites(favorites =>
      favorites.some(i => String(i.id) === String(item.id)) ? favorites.filter(i => String(i.id) !== String(item.id)) : [...favorites, item]
    )
  }

  const isFavorite = (id: string | number) => favorites.some(item => String(item.id) === String(id))


  return (
    <WishlistContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}