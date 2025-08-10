import Link from "next/link"
import Image from "next/image"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { HeartCounter } from "@/components/ui/food-card/heart-component"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { Button } from "../button"
import { ImageSlider } from "../image-slider/image-slider"
import { MenuItem } from "@/types/menu"

interface FoodCardProps {
  item: MenuItem
  showBadge?: boolean
  favorites: number[]
  toggleFavorite: (id: number) => void
}

export function FoodCardSlider({
  item,
  showBadge = false,
  favorites,
  toggleFavorite,
}: FoodCardProps) {

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
          <HeartCounter
            variant="red"
            itemId={item.id}
            toggleFavorite={toggleFavorite}
            liked={favorites.includes(item.id)}
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
            <Button size="mid">Add to Wishlist</Button>
          </div>

        </div>
      </div>
    </Link>
  )
}