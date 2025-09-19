import { Link } from '@/i18n/routing';
import Image from "next/image"
import { MenuItemFull } from "@/types/menu"
import { PriceBox } from './price-box';

interface FoodCardProps {
  item: MenuItemFull
  // Remove legacy props - client heart handles its own state
}

export function FoodCard({
  item,
}: FoodCardProps) {
  // derive badge from first tag object when available


  const badge: string | undefined = undefined;
  const badgeColor: 'gold' | 'green' | 'purple' | 'default' | null | undefined = 'default';


  // likes: prefer existing value if present, otherwise random 1-50 for demo
  const likes = Math.floor(Math.random() * 50) + 1

    // price formatting for split styling (stable, avoids hydration mismatch)


  return (

    <div className="flex-shrink-0 w-55 bg-app-dark-highlight rounded-sm shadow-sm overflow-hidden">
      <div className="relative">
        <div className={`h-52 rounded-t-sm overflow-hidden`}>
          <Link href={`/item/${item.id}`} className="block">
            <Image
              src={item.mainImage?.url || "https://snhltnwklxscjle7.public.blob.vercel-storage.com/menu-items/no-image/no-image.png"}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-full object-cover object-bottom"
            />
          </Link>
        </div>
        {/* <FoodBadge badge={badge} showBadge={showBadge} color={badgeColor} /> */}
        {/* <ClientHeart
          item={item}
          likes={likes}
        /> */}
      <PriceBox price={item.price || 0} />
      </div>
      <div className="flex flex-col  relative w-full min-h-24">
        <div className="m-auto flex w-full flex-col justify-between ">
          <Link href={`/item/${item.id}`}>
            <div className="m-auto flex justify-between w-full px-2">
              <h3 className="m-auto font-header uppercase w-full text-app-light-highlight text-xl text-left font-bold">{item.name}</h3>
              {/* <p className="m-auto w-1/4 text-right font-semibold">{item.price}€</p> */}
            </div>
          </Link>

        </div>
        <div className="flex w-full justify-between relative">
          <div className="w-full p-2 text-sm text-gray-50 font-semibold">
            <p>{item.shortDescription}</p>
          </div>

          
        </div>
      </div>

    </div>
  )
}