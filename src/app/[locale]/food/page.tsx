import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchMenuCategories, fetchMenuCategoryItems, fetchMenuTopThisMonth } from "@/lib/server/menu-fetch"
import { getTranslations } from 'next-intl/server';
import { ComboCard } from "@/components/ui/combo-card/combo-card";

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }


export default async function MenuPage() {
  const t = await getTranslations('Menu');

  // Parallel fetch
  const [categories, topItems] = await Promise.all([
    fetchMenuCategories(),
    fetchMenuTopThisMonth(3)
  ])

  // Preload all category items (if many categories consider streaming / pagination)
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchMenuCategoryItems(c)] as const)
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white">
        <Header title={t('title')} showChevron linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="overflow-x-auto scrollbar-hide ">
          <div className="flex gap-4 p-1">
            {/* Demo combos: Himalayan Trek, Kathmandu Combo, Everest Set */}
            {[
              {
                title: "Himalayan Trek",
                background: "bg-global-lightblue",
                image: "/masks/mask-4.png",
              },
              {
                title: "Kathmandu Combo",
                background: "bg-global-gold",
                image: "/masks/mask-5.png",
              },
              {
                title: "Everest Set",
                background: "bg-global-green",
                image: "/masks/mask-3.png",
              },
            ].map((combo, i) => (
              <ComboCard
                key={i}
                className={combo.background}
                image={combo.image}
                title={combo.title}
                subtitle="#found your flavar"
                href={`/food/flavar/${i + 1}`}
              />
            ))}
          </div>
        </div>


        {topItems.length > 0 && (
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
        )}

        {categoryEntries.map(([category, items]) => {
          if (!items.length) return null
          return (
            <div key={category} className="py-6">
              <SectionDivider
                href={`/food/category/${category}`}
                title={cap(category)}
              />
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-4 pb-2">
                  {items.slice(0, 5).map(item => (
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
