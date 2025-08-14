"use client"

import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { ClientHeart } from "@/components/ui/food-card/client-heart"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { Button } from "../button"
import { ImageSlider } from "../image-slider/image-slider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { MenuItem } from "@/types/menu"

interface FoodCardProps {
  item: MenuItem
  showBadge?: boolean
}

export function FoodCardSlider({
  item,
  showBadge = false,
}: FoodCardProps) {
  const t = useTranslations('Common');
  const { favorites, toggle } = useWishlist()
  
  const isInWishlist = favorites.some(fav => fav.id === item.id)
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    e.stopPropagation()
    toggle(item)
  }

  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className="flex-shrink-0 bg-white rounded-2xl mb-6 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="rounded-t-2xl">
            <ImageSlider
              images={item.images}
              size="md"
            />
          </div>
          <FoodBadge badge={item.badge} showBadge={showBadge} color={item.badgeColor} />
          <ClientHeart
            item={item}
            likes={item.likes}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-left gap-2">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            </div>
            <div className="text-xl font-bold">{item.price}</div>
          </div>
          <div className="flex items-center justify-between">
            <FoodTags tags={item.tags} />
            {isInWishlist ? (
              <button
                onClick={handleWishlistToggle}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            ) : (
              <Button size="mid" onClick={handleWishlistToggle}>
                {t('addToWishlist')}
              </Button>
            )}
          </div>

        </div>
      </div>
    </Link>
  )
}