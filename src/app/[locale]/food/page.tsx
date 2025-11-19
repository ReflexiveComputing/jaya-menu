import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchMenuCategoriesFromApi, fetchMenuCategoryItemsFromApi, } from "@/lib/server/menu-fetch-api"
import type { MenuItemFull } from "@/types/menu"
import { getTranslations, getLocale } from 'next-intl/server';
import { ComboCard } from "@/components/ui/combo-card/combo-card";
import { Category } from "@/types/category"
import HistoryCard from '@/components/ui/history-card/history-card'
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun"
import NepaliMoonIcon from "@/components/ui/icons/svg/nepali-moon"
import Image from "next/image"

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
  const colors = ["#FEBD3A", "#E64342", "#E4C4AE"]
  const historyColors = ["#FEBD3A", "#E64342", "#E4C4AE"]
  let historyGroupIndex = 0

  // Only keep categories that will actually render (have items)
  const visibleEntries = categoryEntries.filter(([, items]) => items.length > 0)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="">
        <Header title={t('title')} titleLink="/food" secondaryTitle={drinks("title")} secondaryTitleLink="/drinks" showChevron linkTo="/" size="default" className="uppercase" />
      </div>

      <div className="flex-1 overflow-y-auto">


        {visibleEntries.map(([category, items], index) => {
          // index here counts only rendered categories, so colors cycle correctly
          const color = colors[index % colors.length];
          const showHistory = ((index + 1) % 3 === 0)
          let historyColor: string | undefined
          if (showHistory) {
            historyColor = historyColors[historyGroupIndex % historyColors.length]
            historyGroupIndex++
          }
          return (
            <div key={`component-${category.name}`} >

              <div id={category.name} key={category.name} className="py-6">
                <SectionDivider

                  title={cap(category.displayName ?? category.name)}
                  color={color}
                />
                <div className="overflow-x-auto px-4 scrollbar-hide">
                  <div className="flex gap-4 pb-2">
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
              {/* On every 3rd category render three HistoryCard components in the same horizontal row */}
              {showHistory && (
                <div className="overflow-x-auto font-[family-name:var(--font-fjalla-one)] py-5 px-4 scrollbar-hide flex gap-4 pb-2">
                  <HistoryCard color={historyColor}>
                    <div className="absolute left-5 top-3 z-20">
                        <NepaliSunIcon size={25} backgroundColor={historyColor} />
                      </div>
                    <Image
                      src="/history_image.jpg"
                      alt="History Image"
                      fill
                      className="object-cover z-0"
                      priority={false}
                      sizes="15vw"
                    />
                    <div className="absolute bottom-3 right-3 z-20">
                        <NepaliSunIcon size={45} backgroundColor={historyColor} />
                      </div>
                  </HistoryCard>
                  {[0, 1, 2].map(i => (
                    <HistoryCard key={`history-${category.name}-${i}`} color={historyColor}>
                      <div className="absolute top-3">
                        <NepaliSunIcon size={20} backgroundColor="#272323" />
                      </div>
                      <div className="flex justify-center items-center flex-col">
                        <p className="text-center text-sm text-app-dark-highlight px-2">Mitho Cha
                          bedeutet:
                          &ldquo;Es schmeckt gut!&rdquo; – und
                          genau das versprechen wir
                          Ihnen.
                        </p>
                      </div>
                      <div className="absolute bottom-3">
                        <NepaliMoonIcon size={20} backgroundColor="#272323" />
                      </div>
                    </HistoryCard>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
