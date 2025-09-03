import { Link } from '@/i18n/routing';
import Image from "next/image"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { ClientHeart } from "@/components/ui/food-card/client-heart"
import { MenuItemNew, TagObject } from "@/types/menu"
import { Plus } from "lucide-react"

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

    <div className="flex-shrink-0 w-55 bg-white rounded-sm shadow-sm overflow-hidden">
      <div className="relative">
        <div className={`h-48 bg-white rounded-t-sm overflow-hidden`}>
          <Link href={`/item/${item.id}`} className="block">
            <Image
              src={item.thumbnail_url || "/nila-qst-image.png"}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-full object-cover object-bottom"
            />
          </Link>
        </div>
        <FoodBadge badge={badge} showBadge={showBadge} color={badgeColor} />
        <ClientHeart
          item={item}
          likes={likes}
        />
      </div>
      <div className="flex flex-col bg-stone-50 relative w-full min-h-24">
        <div className="m-auto flex w-full flex-col justify-between ">
          <Link href={`/item/${item.id}`}>
            <div className="m-auto flex justify-between w-full px-2">
              <h3 className="m-auto w-3/4 text-left font-semibold">{item.name}</h3>
              <p className="m-auto w-1/4 text-right font-semibold">{item.price}€</p>
            </div>
          </Link>

        </div>
        <div className="flex w-full justify-between relative">
          <div className="px-2 pb-2 flex items-center justify-between">
            <FoodTags tags={["beef", "wheat-off", "bean"]} />
          </div>

          <div className='absolute right-0 bottom-0 w-8 h-8 rounded-br-sm rounded-tl-xl bg-global-gold flex justify-center items-center'>
            <Plus className='w-6 h-6 m-auto text-white' />
          </div>
        </div>
      </div>

    </div>
  )
}