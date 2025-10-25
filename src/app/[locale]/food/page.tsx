import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchMenuCategoriesFromApi, fetchMenuCategoryItemsFromApi, } from "@/lib/server/menu-fetch-api"
import type { MenuItemFull } from "@/types/menu"
import { getTranslations, getLocale } from 'next-intl/server';
import { ComboCard } from "@/components/ui/combo-card/combo-card";
import { Category } from "@/types/category"

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }


export default async function MenuPage() {
  const t = await getTranslations('Menu');
  const drinks = await getTranslations('Drinks');

  const locale = await getLocale(); // Get current locale


  // Parallel fetch (API-shaped data)
  const [categories] = await Promise.all([
    fetchMenuCategoriesFromApi(),
  ]) as [Category[]];

  // Preload all category items (API-shaped). We'll update components to accept this shape later.
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchMenuCategoryItemsFromApi(c.name, locale)] as const)
  ) as readonly (readonly [Category, MenuItemFull[]])[];


  return (
    <div className="min-h-screen flex flex-col">
      <div className="">
        <Header title={t('title')} secondaryTitle={drinks("title")} showChevron linkTo="/" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">


        {categoryEntries.map(([category, items]) => {
          if (!items.length) return null
          // Use filename directly for URLs and keys
          return (
            <div key={category.name} className="py-6">
              <SectionDivider
                
                title={cap(category.displayName?? category.name)}
              />
              <div className="overflow-x-auto px-4 scrollbar-hide">
                <div className="flex gap-4 pb-2">
                  {items.map(item => (
                    <FoodCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
