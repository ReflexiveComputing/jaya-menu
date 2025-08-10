"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { SectionDivider } from "@/components/ui/section-divider"
import { MenuItem } from "@/types/menu"
import { 
  getMenuCategories, 
  getMenuByCategory, 
  getTopMenuThisMonth, 
  generateCategorySections,
  capitalizeFirstLetter 
} from "@/lib/api-calls/menu"

export default function MenuPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [topItems, setTopItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoryItems, setCategoryItems] = useState<{ [key: string]: MenuItem[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch top items this month
      const topMenuItems = await getTopMenuThisMonth()
      setTopItems(topMenuItems)
      
      // Fetch categories
      const menuCategories = await getMenuCategories()
      setCategories(menuCategories)
      
      // Fetch items for each category
      const categoryData: { [key: string]: MenuItem[] } = {}
      for (const category of menuCategories) {
        const items = await getMenuByCategory(category)
        categoryData[category] = items
      }
      setCategoryItems(categoryData)
      
      setLoading(false)
    }

    fetchData()
  }, [])

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => (
      prev.includes(itemId) 
        ? prev.filter((id) => id !== itemId) 
        : [...prev, itemId]
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header title="Menu" showChevron={true} linkTo="/" align="center" size="default" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading menu...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="top-0 z-10 bg-white transition-transform duration-300">
        <Header title="Menu" showChevron={true} linkTo="/" align="center" size="default" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Top This Month Section */}
        {topItems.length > 0 && (
          <div className="py-6">
            <SectionDivider href="/menu/popular" title="Popular This Month" />
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 px-4 pb-2">
                {topItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    showBadge={true}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Sections */}
        {categories.map((category) => {
          const items = categoryItems[category] || []
          if (items.length === 0) return null

          return (
            <div key={category} className="py-6">
              <SectionDivider 
                href={`/menu/${category}`} 
                title={capitalizeFirstLetter(category)} 
              />
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-4 pb-2">
                  {items.slice(0, 5).map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      showBadge={true}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
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
