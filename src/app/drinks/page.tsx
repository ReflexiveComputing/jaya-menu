import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchDrinksCategories, fetchDrinksCategoryItems, fetchDrinksTopThisMonth } from "@/lib/server/drinks-fetch"

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function DrinksPage() {
  // Parallel fetch
  const [categories, topItems] = await Promise.all([
    fetchDrinksCategories(),
    fetchDrinksTopThisMonth(3)
  ])

  // Preload all category items (if many categories consider streaming / pagination)
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchDrinksCategoryItems(c)] as const)
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white">
        <Header title="Drinks" showChevron linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {topItems.length > 0 && (
          <div className="py-6">
            <SectionDivider href="/drinks/popular" title="Popular This Month" />
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
        )}

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
                    {items.slice(0,5).map(item => (
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

