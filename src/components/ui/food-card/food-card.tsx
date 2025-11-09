import { Link } from '@/i18n/routing';
import Image from "next/image"
import { MenuItemFull } from "@/types/menu"
import { PriceBox } from './price-box';
import { FoodTags } from './food-tags';
import { AddItem } from './add-item';

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

  const previewDescription = item.shortDescription?.trim() || (() => {
    const words = item.description?.trim().split(/\s+/) ?? [];
    return words.slice(0, 6).join(' ');
  })();


  return (

    <div className="flex flex-col flex-shrink-0 w-40 bg-app-dark-highlight rounded-xs shadow-sm overflow-hidden">
      <div className="relative">
        <div className={`m-auto h-52 rounded-t-sm overflow-hidden relative`}>
          <Link href={`/item/${item.id}`} className="block">
            <Image
              src={item.mainImage?.url || "https://snhltnwklxscjle7.public.blob.vercel-storage.com/menu-items/24/1758227441005-chana_masala.jpg"}
              alt={item.name}
              width={200}
              height={300}
              className="m-auto w-full h-52 object-cover"
            />
          </Link>
        </div>
        <PriceBox price={item.price || 0} />
      </div>
      <div className='flex w-full pt-2 px-2 m-auto'>
        <FoodTags tags={item.mainIngredients?.flatMap(mainIngredient => mainIngredient.ingredient?.iconName ?? "") ?? []} />
        <div className="flex flex-col justify-start relative w-full min-h-20">
          <div className="flex w-full flex-col ">
            <Link href={`/item/${item.id}`}>
              <div className="m-auto flex justify-between w-full">
                <h3 className="m-auto font-fajala uppercase w-full text-app-light-highlight text-left font-semibold">{item.name}</h3>
                {/* <p className="m-auto w-1/4 text-right font-semibold">{item.price}€</p> */}
              </div>
            </Link>

          </div>
          <div className="flex pt-1 w-full justify-between relative">
            <div className="w-full text-sm text-gray-50 ">
              <p>{previewDescription}</p>
            </div>


          </div>

        </div>
      </div>
      <div className='w-full m-auto bottom-0 text-right'>
        <AddItem item={item} />
      </div>

    </div>
  )
}