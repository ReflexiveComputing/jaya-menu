import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchMenuCategoriesFromApi, fetchMenuCategoryItemsFromApi, fetchMenuTopThisMonthFromApi } from "@/lib/server/menu-fetch-api"
import type { MenuItemNew } from "@/types/menu"
import { getTranslations } from 'next-intl/server';
import { ComboCard } from "@/components/ui/combo-card/combo-card";

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }


export default async function MenuPage() {
  const t = await getTranslations('Menu');

  // Parallel fetch (API-shaped data)
  const [categories, topItemsNew] = await Promise.all([
    fetchMenuCategoriesFromApi(),
    fetchMenuTopThisMonthFromApi(3)
  ]) as [string[], MenuItemNew[]];

  // Preload all category items (API-shaped). We'll update components to accept this shape later.
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchMenuCategoryItemsFromApi(c)] as const)
  ) as readonly (readonly [string, MenuItemNew[]])[];

  // keep naming compatible with rendering below
  const topItems = topItemsNew;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white">
        <Header title={t('title')} showChevron linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="overflow-x-auto scrollbar-hide ">
          <div className="flex gap-4 p-4">
            {/* Demo combos: Himalayan Trek, Kathmandu Combo, Everest Set */}
            {[
              {
                title: "Himalayan Trek",
                background: "bg-global-lightblue",
                image: "/combo-background.jpg",
                items: [
                  { id: 1, name: "Momo", image: "/images/momo.png", description: "Steamed dumplings", price: 5.99 },
                  { id: 2, name: "Thukpa", image: "/images/thukpa.png", description: "Noodle soup", price: 7.99 },
                  { id: 3, name: "Dal Bhat", image: "/images/dal-bhat.png", description: "Lentil soup with rice", price: 6.99 },
                ]
              },
              {
                title: "Kathmandu Combo",
                background: "bg-global-gold",
                image: "/combo-background-2.jpg",
                items: [
                  { id: 1, name: "Momo", image: "/images/momo.png", description: "Steamed dumplings", price: 5.99 },
                  { id: 2, name: "Thukpa", image: "/images/thukpa.png", description: "Noodle soup", price: 7.99 },
                  { id: 3, name: "Dal Bhat", image: "/images/dal-bhat.png", description: "Lentil soup with rice", price: 6.99 },
                ]
              },
              {
                title: "Everest Set",
                background: "bg-global-blue",
                image: "",
                 items: [ 
                   { id: 2, name: "Thukpa", image: "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/64.png", description: "Noodle soup", price: 7.99 },
                  { id: 1, name: "Momo", image: "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/41.png", description: "Steamed dumplings", price: 5.99 },
                  { id: 3, name: "Dal Bhat", image: "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/khasi_saag.png", description: "Lentil soup with rice", price: 6.99 },
                ]
              },
            ].map((combo, i) => (
              <ComboCard
                key={i}
                className={combo.background}
                image={combo.image}
                title={combo.title}
                subtitle="#found your flavar"
                href={`/food/flavar/${i + 1}`}
                items={combo.items}
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
