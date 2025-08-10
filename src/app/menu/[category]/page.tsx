"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/ui/header"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { getMenuByCategory, capitalizeFirstLetter } from "@/lib/api-calls/menu"
import { MenuItem } from "@/types/menu"

export default function MenuCategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [items, setItems] = useState<MenuItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      if (category) {
        setLoading(true)
        const categoryItems = await getMenuByCategory(category)
        setItems(categoryItems)
        setLoading(false)
      }
    }

    fetchItems()
  }, [category])

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => 
      prev.includes(itemId) 
        ? prev.filter((id) => id !== itemId) 
        : [...prev, itemId]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header title="Loading..." showChevron={true} linkTo="/menu" align="center" size="default" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading items...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title={capitalizeFirstLetter(category)} 
        showChevron={true} 
        linkTo="/menu" 
        align="center" 
        size="default" 
      />
      
      <div className="flex-1 overflow-y-auto p-6">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                showBadge={true}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">No items found in this category</div>
          </div>
        )}
      </div>
    </div>
  )
}
