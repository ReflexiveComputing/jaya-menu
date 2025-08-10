"use client"

import { useEffect, useState } from "react"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { HeartCounter } from "@/components/ui/food-card/heart-component"

interface ClientHeartProps {
  itemId: number
  likes: number
  className?: string
}

export function ClientHeart({ itemId, likes, className }: ClientHeartProps) {
  const [mounted, setMounted] = useState(false)
  const { isFavorite, toggle } = useWishlist()

  // Only render after hydration to avoid server/client mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show empty heart during SSR and before hydration
  if (!mounted) {
    return (
      <HeartCounter
        variant="red"
        itemId={itemId}
        toggleFavorite={() => {}}
        liked={false}
        likes={likes}
        className={className}
      />
    )
  }

  return (
    <HeartCounter
      variant="red"
      itemId={itemId}
      toggleFavorite={toggle}
      liked={isFavorite(itemId)}
      likes={likes}
      className={className}
    />
  )
}
