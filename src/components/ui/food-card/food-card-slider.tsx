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
import { MenuItemNew } from "@/types/menu"

interface FoodCardProps {
  item: MenuItemNew
  showBadge?: boolean
  compact?: boolean
}

export function FoodCardSlider({
  item,
  showBadge = false,
  compact = false,
}: FoodCardProps) {
  const t = useTranslations('Common');
  const { favorites, toggle } = useWishlist()
  
  const isInWishlist = favorites.some(fav => fav.id === item.id)
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    e.stopPropagation()
    toggle(item)
  }

  const wrapperClass = compact
  ? 'flex-shrink-0 bg-white rounded-sm mb-4 shadow-sm overflow-hidden'
    : 'flex-shrink-0 bg-white rounded-sm mb-6 shadow-sm overflow-hidden'

  // derive badge from first tag object when available
  const firstTag = item.tags && item.tags.length ? item.tags[0] : undefined
  const badge = (firstTag && firstTag.name) || undefined
  const badgeColor = (firstTag && firstTag.color) ? 'green' : 'default'

  // likes: prefer existing value if present, otherwise random 1-50 for demo
  const likes = Math.floor(Math.random() * 50) + 1

  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className={wrapperClass}>
        <div className="relative">
          <div className="rounded-t-sm bg-stone-200">
            <ImageSlider
              images={item.images}
              size={compact ? 'sm' : 'md'}
            />
          </div>
          <FoodBadge badge={badge} showBadge={showBadge} color={badgeColor} />
          <ClientHeart
            item={item}
            likes={likes}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-left gap-2">
              <h3 className={compact ? 'font-bold text-md mb-1' : 'font-bold text-lg mb-1'}>{item.name}</h3>
              <p className={compact ? 'text-gray-600 text-xs mb-2' : 'text-gray-600 text-sm mb-3'}>{item.description}</p>
            </div>
            <div className="text-xl font-bold">{item.price}</div>
          </div>
          <div className="flex items-center justify-between">
            {/* <FoodTags tags={item.tags} /> */}
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