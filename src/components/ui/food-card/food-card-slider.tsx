"use client"

import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import { Trash2 } from "lucide-react"
import { Button } from "../button"
import { ImageSlider } from "../image-slider/image-slider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { MenuItemFull } from "@/types/menu"

interface FoodCardProps {
  item: MenuItemFull
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
  ? 'flex-shrink-0 rounded-sm mb-4 shadow-sm overflow-hidden'
    : 'flex-shrink-0 rounded-sm mb-6 shadow-sm overflow-hidden'

  // likes: preer existing value if present, otherwise random 1-50 for demo

  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className={wrapperClass}>
        <div className="relative">
          <div className="rounded-t-sm bg-stone-200">
            <ImageSlider
              images={item.images ?? []}
              size={compact ? 'sm' : 'md'}
            />
          </div>
          {/* <ClientHeart
            item={item}
            likes={likes}
          /> */}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-left gap-2">
              <h3 className={compact ? 'font-bold text-app-light-highlight text-md mb-1' : 'font-bold uppercase text-2xl mb-1 text-app-light-highlight'}>{item.name}</h3>
              <p className={compact ? 'text-app-light-highlight text-xs mb-2' : 'text-gray-50 text-sm mb-3'}>
                 {(item.description ?? '')
                  .split(' ')
                  .slice(0, 10)
                  .join(' ')
                }
                {(item.description ?? '').split(' ').length > 10 ? '…' : ''}
              </p>
            </div>
            <div className="text-xl text-app-light-highlight font-bold">{item.price}€</div>
          </div>
          <div className="flex items-center justify-between">
            {/* <FoodTags tags={item.tags} /> */}
            {isInWishlist ? (
              <button
                onClick={handleWishlistToggle}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4 text-global-red" />
              </button>
            ) : (
              <Button variant={"wishlist"} size="mid" onClick={handleWishlistToggle}>
                {t('addToWishlist')}
              </Button>
            )}
          </div>

        </div>
      </div>
    </Link>
  )
}