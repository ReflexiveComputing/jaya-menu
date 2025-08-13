"use client"

import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import Image from "next/image"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { ClientHeart } from "@/components/ui/food-card/client-heart"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { Button } from "../button"
import { ImageSlider } from "../image-slider/image-slider"
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
            <Button size="mid">{t('addToWishlist')}</Button>
          </div>

        </div>
      </div>
    </Link>
  )
}