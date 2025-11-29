import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { fetchDrinkCategoriesFromApi, fetchDrinkCategoryItemsFromApi } from "@/lib/server/drink-fetch-api"
import { getTranslations, getLocale } from 'next-intl/server';
import { MenuItemFull } from "@/types/menu"
import { Category } from "@/types/menu"
import Image from "next/image"
import SpecialItem from "@/components/ui/special-item";
import HistoryCard from "@/components/ui/history-card/history-card";
import NepaliMoonIcon from "@/components/ui/icons/svg/nepali-moon";
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun";


export const revalidate = 600  // ISR for full page
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function DrinksPage() {
  const t = await getTranslations('Drinks');
  const story1 = await getTranslations('Story1');
  const story2 = await getTranslations('Story2');
  const story3 = await getTranslations('Story3');
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

  const colors = ["#FEBD3A", "#FF1070", "#23FFCB"]

  // Only keep categories that will actually render (have items)
  const visibleEntries = categoryEntries.filter(([, items]) => items.length > 0)
  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      {/* <div className="bg-app-dark-highlight">
        <Header className="uppercase" title={menu('title')} titleLink="/food" secondaryTitle={t('title')} secondaryTitleLink="/drinks" titleHighlighted={false} showChevron linkTo="/" size="default" />
      </div> */}
      <SpecialItem />

      <div className="flex-1 overflow-y-auto">


        {visibleEntries.slice(0, 3).map(([category, items], index) => {
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
        <div className="overflow-x-auto font-(family-name:--font-fjalla-one) py-5 px-4 scrollbar-hide flex gap-4 pb-2">
          <HistoryCard color={colors[0]}>
            <div className="absolute left-5 top-3 z-20">
              <NepaliSunIcon size={25} backgroundColor={colors[0]} />
            </div>
            <div className="w-fit">
              <Image
                src={story1('image')}
                alt="History Image"
                fill
                className="object-contain z-0"
                priority={false}
                sizes="10vw"
              />

            </div>

            <div className="absolute bottom-3 right-3 z-20">
              <NepaliSunIcon size={45} backgroundColor={colors[0]} />
            </div>
          </HistoryCard>
          {[0, 1, 2].map(i => (
            <HistoryCard key={`history-text-${i}`} color={colors[0]}>
              <div className="absolute top-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
              <div className="flex justify-center items-center flex-col">
                
                <p key={`story1-line-${i+1}`} className="text-center text-sm text-app-dark-highlight px-2">
                  {story1('text-' + (i+1))}
                </p>
                 

              </div>
              <div className="absolute bottom-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
            </HistoryCard>
          ))}
        </div>

        {visibleEntries.slice(3, 5).map(([category, items], index) => {
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
        <div className="overflow-x-auto font-(family-name:--font-fjalla-one) py-5 px-4 scrollbar-hide flex gap-4 pb-2">
          <HistoryCard color={colors[1]}>
            <div className="absolute left-5 top-3 z-20">
              <NepaliSunIcon size={25} backgroundColor={colors[1]} />
            </div>
            <div className="w-fit">
              <Image
                src={story2('image')}
                alt="History Image"
                fill
                className="object-cover z-0"
                priority={false}
                sizes="15vw"
              />
            </div>

            <div className="absolute bottom-3 right-3 z-20">
              <NepaliSunIcon size={45} backgroundColor={colors[1]} />
            </div>
          </HistoryCard>
          {[0, 1, 2].map(i => (
            <HistoryCard key={`history-text-${i}`} color={colors[1]}>
              <div className="absolute top-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
              <div className="flex justify-center items-center flex-col">
                
                <p key={`story1-line-${i+1}`} className="text-center text-sm text-app-dark-highlight px-2">
                  {story2('text-' + (i+1))}
                </p>
                 

              </div>
              <div className="absolute bottom-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
            </HistoryCard>
          ))}
        </div>
        {visibleEntries.slice(5).map(([category, items], index) => {
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
      <div className="overflow-x-auto font-(family-name:--font-fjalla-one) py-5 px-4 scrollbar-hide flex gap-4 pb-2">
          <HistoryCard color={colors[2]}>
            <div className="absolute left-5 top-3 z-20">
              <NepaliSunIcon size={25} backgroundColor={colors[2]} />
            </div>
            <div className="w-fit">
              <Image
                src={story3('image')}
                alt="History Image"
                fill
                className="object-cover z-0"
                priority={false}
                sizes="10vw"
              />

            </div>

            <div className="absolute bottom-3 right-3 z-20">
              <NepaliSunIcon size={45} backgroundColor={colors[2]} />
            </div>
          </HistoryCard>
          {[0, 1, 2].map(i => (
            <HistoryCard key={`history-text-${i}`} color={colors[2]}>
              <div className="absolute top-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
              <div className="flex justify-center items-center flex-col">
                
                <p key={`story3-line-${i+1}`} className="text-center text-sm text-app-dark-highlight px-2">
                  {story3('text-' + (i+1))}
                </p>
                 

              </div>
              <div className="absolute bottom-3">
                <NepaliSunIcon size={20} backgroundColor="#272323" />
              </div>
            </HistoryCard>
          ))}
        </div>
      </div>
      <div className="flex w-full py-10 m-auto">
        <div className="w-fit m-auto">

          <Image
            src="https://snhltnwklxscjle7.public.blob.vercel-storage.com/jaya-public/powered-by-flavar.png"
            alt="Powered by Flavar"
            width={118}
            height={55}
            className="object-cover"
          />
        </div>

      </div>
    </div>
  )
}

