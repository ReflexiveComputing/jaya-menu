import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchDrinksCategoriesFromApi, fetchDrinksCategoryItemsFromApi, fetchDrinksTopThisMonthFromApi } from "@/lib/server/drink-fetch-api"
import type { Drink } from '@/types/drink'
import {getTranslations} from 'next-intl/server';
import { MenuItemNew } from "@/types/menu"

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function DrinksPage() {
  const t = await getTranslations('Drinks');
  
  // Parallel fetch (API-shaped)
  const [categories, topItemsNew] = await Promise.all([
    fetchDrinksCategoriesFromApi(),
    fetchDrinksTopThisMonthFromApi(3)
  ]) as [string[], MenuItemNew[]]

  // Preload all category items (API-shaped)
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchDrinksCategoryItemsFromApi(c)] as const)
  ) as readonly (readonly [string, MenuItemNew[]])[];

  const topItems = topItemsNew

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white">
        <Header title={t('title')} showChevron linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* {topItems.length > 0 && (
          <div className="py-6">
            <SectionDivider href="/drinks/popular" title={t('popularThisMonth')} />
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
            return (
              <div key={category} className="py-6">
                <SectionDivider
                  href={`/drinks/${category}`}
                  title={cap(category)}
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

