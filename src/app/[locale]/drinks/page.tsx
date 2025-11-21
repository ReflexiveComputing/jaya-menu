import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchDrinkCategoriesFromApi, fetchDrinkCategoryItemsFromApi } from "@/lib/server/drink-fetch-api"
import { getTranslations, getLocale } from 'next-intl/server';
import { MenuItemFull } from "@/types/menu"
import { Category } from "@/types/menu"

export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function DrinksPage() {
  const t = await getTranslations('Drinks');
  const menu = await getTranslations('Menu');
  const locale = await getLocale(); // Get current locale

  // Parallel fetch (API-shaped)
  const [categories] = await Promise.all([
    fetchDrinkCategoriesFromApi(),
  ]) as [Category[]]

  // Preload all category items (API-shaped)
  const categoryEntries = await Promise.all(
    categories.map(async c => [c, await fetchDrinkCategoryItemsFromApi(c.name, locale)] as const)
  ) as readonly (readonly [Category, MenuItemFull[]])[];

  const colors = ["#FEBD3A", "#E64342", "#E4C4AE"]

  // Only keep categories that will actually render (have items)
  const visibleEntries = categoryEntries.filter(([, items]) => items.length > 0)
  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <div className="bg-app-dark-highlight">
        <Header className="uppercase" title={menu('title')} titleLink="/food" secondaryTitle={t('title')} secondaryTitleLink="/drinks" titleHighlighted={false} showChevron linkTo="/" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">


         {visibleEntries.map(([category, items], index) => {
          if (!items.length) return null
          const color = colors[index % colors.length]
          return (
            <div key={category.id} className="py-6">
              <SectionDivider
                color={color}
                title={cap(category.displayName ?? category.name)}
              />
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-4 pb-2">
                  {items.map(item => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      color={color}
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

