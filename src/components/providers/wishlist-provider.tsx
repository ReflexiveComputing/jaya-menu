"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { MenuItem } from "@/types/menu"

interface WishlistContextValue {
  favorites: number[]
  toggle: (id: number) => void
  isFavorite: (id: number) => boolean
  getFavoriteItems: (allItems: MenuItem[]) => MenuItem[]
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favorites))
  }, [favorites])

  const toggle = (id: number) => {
    setFavorites(f =>
      f.includes(id) ? f.filter(i => i !== id) : [...f, id]
    )
  }

  const isFavorite = (id: number) => favorites.includes(id)

  const getFavoriteItems = (allItems: MenuItem[]) => {
    return allItems.filter(item => favorites.includes(item.id))
  }

  return (
    <WishlistContext.Provider value={{ favorites, toggle, isFavorite, getFavoriteItems }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}