import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchMenuCategoriesFromApi, fetchMenuCategoryItemsFromApi, fetchMenuTopThisMonthFromApi } from "@/lib/server/menu-fetch-api"
import type { MenuItemNew } from "@/types/menu"
import { getTranslations } from 'next-intl/server';
import { ComboCard } from "@/components/ui/combo-card/combo-card";
import { MenuCategory } from "@/types/category"

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }


export default async function MenuPage() {
  const t = await getTranslations('Menu');

  // Parallel fetch (API-shaped data)
  const [categories, topItemsNew] = await Promise.all([
    fetchMenuCategoriesFromApi(),
    fetchMenuTopThisMonthFromApi(3)
  ]) as [MenuCategory[], MenuItemNew[]];

  // Preload all category items (API-shaped). We'll update components to accept this shape later.
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchMenuCategoryItemsFromApi(c.name)] as const)
  ) as readonly (readonly [MenuCategory, MenuItemNew[]])[];

  // keep naming compatible with rendering below
  const topItems = topItemsNew;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white">
        <Header title={t('title')} showChevron linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* {topItems.length > 0 && (
          <div className="py-6">
            <SectionDivider href="/food/category/popular" title={t('popularThisMonth')} />
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 px-4 pb-2">
                {topItems.map(item => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    showBadge
                  />
                ))}
              </div>
            </div>
          </div>
        )} */}

        {categoryEntries.map(([category, items]) => {
          if (!items.length) return null
          // Use filename directly for URLs and keys
          return (
            <div key={category.filename} className="py-6">
              <SectionDivider
                href={`/food/category/${category.filename}`}
                title={cap(category.name)}
              />
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-4 pb-2">
                  {items.map(item => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      showBadge
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
