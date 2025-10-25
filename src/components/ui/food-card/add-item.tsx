"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/components/providers/wishlist-provider"
import type { MenuItemFull } from "@/types/menu"

interface AddItemProps {
  item: MenuItemFull
  className?: string
}

export function AddItem({ item, className }: AddItemProps) {
  const { addMenuItem, removeMenuItem, isFavorite } = useWishlist()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isFavorite(item.id)) {
      removeMenuItem(item)
    } else {
      addMenuItem(item)
    }
  }

  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      className={cn(" ", className)}
      onClick={handleClick}
    >
      {isFavorite(item.id) ? (
        <X className="w-6 h-6 text-app-light-highlight" />
      ) : (
        <Plus className="w-6 h-6 text-app-light-highlight" />
      )}
    </button>
  )
}