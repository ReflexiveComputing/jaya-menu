import {Link} from '@/i18n/routing';
import Image from "next/image"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { ClientHeart } from "@/components/ui/food-card/client-heart"
import { MenuItemNew, TagObject } from "@/types/menu"

interface FoodCardProps {
  item: MenuItemNew
  showBadge?: boolean
  // Remove legacy props - client heart handles its own state
}

export function FoodCard({
  item,
  showBadge = false,
}: FoodCardProps) {
  // derive badge from first tag object when available

  function hasTags(obj: MenuItemNew): obj is MenuItemNew {
    return Array.isArray(obj?.tags) && obj.tags.length > 0;
  }

  let badge: string | undefined = undefined;
  let badgeColor: 'gold' | 'green' | 'purple' | 'default' | null | undefined = 'default';
  if (hasTags(item)) {
    const firstTag = item.tags[0];
    badge = firstTag?.name;
    badgeColor = firstTag?.color === 'green' ? 'green' : 'default';
  }

  // likes: prefer existing value if present, otherwise random 1-50 for demo
  const likes = Math.floor(Math.random() * 50) + 1
  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className="flex-shrink-0 w-75 bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="relative">
          <div className="h-48 bg-gradient-to-br rounded-t-sm overflow-hidden">
            <Image
              src={item.thumbnail_url || "/nila-qst-image.png"}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <FoodBadge badge={badge} showBadge={showBadge} color={badgeColor} />
          <ClientHeart
            item={item}
            likes={likes}
          />
        </div>
        <div className="px-4 py-2">
          <div className="flex flex-col items-center justify-between mb-2">
            <div className="flex items-left justify-between w-full">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="font-bold text-lg mb-1">{item.price}€</p>
            </div>
            <div className="justify-start w-full">
              <p className="text-gray-600 text-sm mb-1 min-h-10 max-h-10">
                {item.description
                  .split(' ')
                  .slice(0, 10)
                  .join(' ')
                }
                {item.description.split(' ').length > 10 ? '…' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* <FoodTags tags={item.tags} /> */}
          </div>
        </div>
      </div>
    </Link>
  )
}