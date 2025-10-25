"use client"

import * as React from "react"
import { Minus, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/components/providers/wishlist-provider"
import type { MenuItemFull } from "@/types/menu"

interface MenuItemProps {
  item: MenuItemFull
  className?: string
}

export function AddMenuItem({ item, className }: MenuItemProps) {
  const { favorites, addMenuItem, removeMenuItem, isFavorite } = useWishlist()

  const count = favorites.find(f => f.menuItem.id === item.id)?.count ?? 0

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addMenuItem(item)
  }

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    removeMenuItem(item)
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {isFavorite(item.id) ? (
        <>
          <div className="flex items-center justify-center w-12 h-12 bg-app-light-highlight">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
              className="w-full h-full flex items-center justify-center"
            >
              <Minus className="w-9 h-9 text-app-dark-highlight" />
            </button>
          </div>

          <div className="flex items-center justify-center w-12 h-12 bg-app-dark-highlight/10 backdrop-blur-sm">
            <div className="text-white text-2xl">{count}</div>
          </div>

          <div className="flex items-center justify-center w-12 h-12 bg-app-light-highlight">
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={handleIncrease}
              className="w-full h-full flex items-center justify-center"
            >
              <Plus className="w-9 h-9 text-app-dark-highlight" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-12 h-12 bg-app-light-highlight">
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault()
              addMenuItem(item)
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <Plus className="w-9 h-9 text-app-dark-highlight" />
          </button>
        </div>
      )}
    </div>
  )
}