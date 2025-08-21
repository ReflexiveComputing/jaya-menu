import { Header } from "@/components/ui/header"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { Button } from "@/components/ui/button"
import {Link} from '@/i18n/routing';
import {getTranslations} from 'next-intl/server';
import menuData from '@/lib/static/menu.json';
import drinksData from '@/lib/static/drinks.json';
import { MenuItem } from '@/types/menu';

// menu.json / drinks.json are static JSON files; cast to MenuItem[] for TS correctness
const menu: MenuItem[] = menuData as unknown as MenuItem[];
const drinks: MenuItem[] = drinksData as unknown as MenuItem[];

export const revalidate = 600

export async function generateStaticParams() {
  return menuData.map(item => ({ id: String(item.id) }))
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function FlavarItemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id)
  const item = menu.find((m: MenuItem) => m.id === id)
  const t = await getTranslations('Menu');

  // background classes (same order as used on /food combo cards)
  const bgClasses = [
    'bg-global-red',
    'bg-global-blue',
    'bg-global-green',
    'bg-global-lightblue',
    'bg-global-gold'
  ]

  const currentBg = bgClasses[(Math.max(1, id) - 1) % bgClasses.length]

  if (!item) {
    // If id not found, redirect back to /food
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-gray-700">{t('itemNotFound') || 'Item not found'}</div>
          <Button asChild>
            <Link href="/food">{t('backToFood') || 'Back to food'}</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Reuse same UI as category page but for a single item (show slider) ${currentBg}
  return (
    <div className={`min-h-screen  flex flex-col`}>
      <Header title={cap('Himalayan Trek')} showChevron linkTo="/food" align="center" size="default" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* For a combo flavar: pick 2 menu items + 1 drink and render them */}
        <div className="flex-1 overflow-y-auto mb-6">
          {
            (() => {
              // Defensive: ensure enough items
              const menuPool = menu.length ? [...menu] : []
              const drinkPool = drinks.length ? [...drinks] : []

              // simple shuffle
              const shuffle = <T,>(arr: T[]) => arr.sort(() => Math.random() - 0.5)

              const selectedMenu = shuffle(menuPool).slice(0, 2)
              const selectedDrink = shuffle(drinkPool).slice(0, 1)

              const comboItems: MenuItem[] = [...selectedMenu, ...selectedDrink]

              return (
                <div className="flex flex-col gap-6">
                  {comboItems.map(ci => (
                    <FoodCardSlider key={`combo-${ci.id}`} item={ci} compact />
                  ))}
                </div>
              )
            })()
          }
        </div>
      </div>
    </div>
  )
}
