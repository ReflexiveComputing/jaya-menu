import { Header } from "@/components/ui/header"
import { fetchDrinksCategories, fetchDrinksCategoryItems } from "@/lib/server/drinks-fetch"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { Button } from "@/components/ui/button"
import {Link} from '@/i18n/routing';
import {getTranslations} from 'next-intl/server';

export const revalidate = 600

export async function generateStaticParams() {
  const categories = await fetchDrinksCategories()
  return categories.map(c => ({ category: c }))
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function DrinksCategoryPage(
  {
    params

  }:
    {
      params: Promise<{ category: string }>
    }) {
  const resolvedParams = await params;
  const items = await fetchDrinksCategoryItems(resolvedParams.category)
  const t = await getTranslations('Drinks');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title={cap(resolvedParams.category)} showChevron linkTo="/drinks" align="center" size="default" />
      <div className="flex-1 overflow-y-auto p-6">
        {items.length ? (
          <div className="flex-1 overflow-y-auto mb-6">
            {items.map((item) => (
              <FoodCardSlider
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <div className="text-gray-500 text-lg">
              {t('noItemsInCategory')}
            </div>
            <Button variant="secondary" asChild>
              <Link href="/drinks">
                {t('browseOtherCategories')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
