import { Link } from '@/i18n/routing';
import Image from "next/image"
import { MenuItemFull } from "@/types/menu"
import { PriceBox } from './price-box';
import { FoodTags } from './food-tags';
import { AddItem } from './add-item';

interface FoodCardProps {
  item: MenuItemFull
  // Remove legacy props - client heart handles its own state
   color: string,
}

export function FoodCard({
  item,
  color,
}: FoodCardProps) {

  const previewDescription = item.shortDescription?.trim() || (() => {
    const words = item.description?.trim().split(/\s+/) ?? [];
    return words.slice(0, 6).join(' ');
  })();


  return (

    <div className="relative flex flex-col flex-shrink-0 w-40 bg-app-dark-highlight rounded-xs shadow-sm overflow-hidden">
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
      <div className='flex w-full pt-2 px-2'>
        <FoodTags color={color} tags={item.mainIngredients?.flatMap(mainIngredient => mainIngredient.ingredient?.iconName ?? "") ?? []} />
        <div className="flex flex-col justify-start relative px-2 w-full min-h-20">
          <div className="flex w-full flex-col ">
            <Link href={`/item/${item.id}`}>
              <div className="m-auto flex justify-between w-full">
                <h3 style={{ color }} className="m-auto font-[family-name:var(--font-fjalla-one)] uppercase w-full text-left font-medium leading-tight">{item.name}</h3>
              </div>
            </Link>

          </div>
          <div className="flex pt-1 w-full justify-between relative">
            <div className="w-full text-sm text-gray-50 leading-tight">
              <p>{previewDescription}</p>
            </div>


          </div>

        </div>
      </div>
      <div className='w-6 h-6'></div>
      <div className='absolute w-full m-auto bottom-0 text-right'>
        <AddItem item={item} />
      </div>

    </div>
  )
}