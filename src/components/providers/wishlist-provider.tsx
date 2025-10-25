"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { MenuItemFull } from "@/types/menu"

type WishlistItem = {
  count: number
  menuItem: MenuItemFull
}

interface WishlistContextValue {
  favorites: WishlistItem[]
  addMenuItem: (item: MenuItemFull) => void
  removeMenuItem: (item: MenuItemFull) => void
  isFavorite: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<WishlistItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favorites))
  }, [favorites])

  const addMenuItem = (item: MenuItemFull) => {
    setFavorites(favorites =>
      favorites.some(i => i.menuItem.id === item.id)
        ? favorites.map(i =>
            i.menuItem.id === item.id ? { ...i, count: i.count + 1 } : i
          )
        : [...favorites, { count: 1, menuItem: item }]
    )
  }

  const removeMenuItem = (item: MenuItemFull) => {
    setFavorites(favorites =>
      favorites.some(i => i.menuItem.id === item.id)
        ? favorites.map(i =>
            i.menuItem.id === item.id ? { ...i, count: i.count - 1 } : i
          ).filter(i => i.count > 0)
        : favorites
    )
  }

  const isFavorite = (id: number) => favorites.some(item => item.menuItem.id === id)


  return (
    <WishlistContext.Provider value={{ favorites, addMenuItem, removeMenuItem, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}