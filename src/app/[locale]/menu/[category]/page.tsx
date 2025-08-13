import { Header } from "@/components/ui/header"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { fetchMenuCategories, fetchMenuCategoryItems } from "@/lib/server/menu-fetch"

export const revalidate = 600

export async function generateStaticParams() {
  const categories = await fetchMenuCategories()
  return categories.map(c => ({ category: c }))
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function MenuCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const items = await fetchMenuCategoryItems((await params).category)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title={cap((await params).category)} showChevron linkTo="/menu" align="center" size="default" />
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
          <div className="flex items-center justify-center h-64 text-gray-500">
            No items in this category
          </div>
        )}
      </div>
    </div>
  )
}
