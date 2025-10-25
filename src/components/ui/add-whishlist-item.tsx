"use client"

import * as React from "react"
import { Minus, Plus, Trash2, } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/components/providers/wishlist-provider"
import type { MenuItemFull } from "@/types/menu"

interface MenuItemProps {
  item: MenuItemFull
  className?: string
}

export function AddWhishlistItem({ item, className }: MenuItemProps) {
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
    <div className={cn("flex items-center justify-center", className)}>
      {isFavorite(item.id) ? (
        <>
          <div className="flex items-center justify-center w-8 h-8 bg-app-dark-highlight">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
              className="w-full h-full flex items-center justify-center"
            >{count === 1 ? (
              <Trash2 className="w-6 h-6 text-app-light-highlight" />
            ) : (
              <Minus className="w-6 h-6 text-app-light-highlight" />
            )}</button>
          </div>
            {/* Count */}
          <div className="flex items-center justify-center w-8 h-8 bg-app-background">
            <div className="text-white text-2xl">{count}</div>
          </div>

          <div className="flex items-center justify-center w-8 h-8 bg-app-dark-highlight">
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={handleIncrease}
              className="w-full h-full flex items-center justify-center"
            >
              <Plus className="w-6 h-6 text-app-light-highlight" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-8 h-8 bg-app-dark-highlight">
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault()
              addMenuItem(item)
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-app-light-highlight" />
          </button>
        </div>
      )}
    </div>
  )
}