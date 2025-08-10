"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { MenuItem } from "@/types/menu"

interface WishlistContextValue {
  favorites: MenuItem[]
  toggle: (item: MenuItem) => void
  isFavorite: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MenuItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favorites))
  }, [favorites])

  const toggle = (item: MenuItem) => {
    setFavorites(favorites =>
      favorites.some(i => i.id === item.id) ? favorites.filter(i => i.id !== item.id) : [...favorites, item]
    )
  }

  const isFavorite = (id: number) => favorites.some(item => item.id === id)


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