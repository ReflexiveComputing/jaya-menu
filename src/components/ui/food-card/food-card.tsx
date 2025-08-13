import {Link} from '@/i18n/routing';
import Image from "next/image"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { ClientHeart } from "@/components/ui/food-card/client-heart"
import { MenuItem } from "@/types/menu"

interface FoodCardProps {
  item: MenuItem
  showBadge?: boolean
  // Remove legacy props - client heart handles its own state
}

export function FoodCard({
  item,
  showBadge = false,
}: FoodCardProps) {
  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="relative">
          <div className="h-48 bg-gradient-to-br rounded-t-2xl overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <FoodBadge badge={item.badge} showBadge={showBadge} color={item.badgeColor} />
          <ClientHeart
            item={item}
            likes={item.likes}
          />
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center justify-between mb-2">
            <div className="flex items-left justify-between w-full">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="font-bold text-xl mb-1">{item.price}</p>
            </div>
            <div className="justify-start w-full">
              <p className="text-gray-600 text-sm mb-3 min-h-10 max-h-10">{item.description}</p>
              
            </div>
          </div>
          <div className="flex items-center justify-between">
            <FoodTags tags={item.tags} />
          </div>
        </div>
      </div>
    </Link>
  )
}