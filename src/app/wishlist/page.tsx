"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { MenuItem } from "@/types/menu"

export default function Wishlist() {
  const { getFavoriteItems } = useWishlist()
  const [allItems, setAllItems] = useState<MenuItem[]>([])
  const [favoriteItems, setFavoriteItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAllItems() {
      try {
        // Fetch both menu and drinks items
        const [menuRes, drinksRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/drinks')
        ])
        
        const [menuData, drinksData] = await Promise.all([
          menuRes.json(),
          drinksRes.json()
        ])
        
        const combined = [
          ...(menuData.items || []),
          ...(drinksData.items || [])
        ]
        
        setAllItems(combined)
        setFavoriteItems(getFavoriteItems(combined))
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllItems()
  }, [getFavoriteItems])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header title="My Wishlist" showChevron />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="My Wishlist" showChevron />

      <div className="flex-1 overflow-y-auto px-4 py-6 mb-6">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <FoodCardSlider
              key={item.id}
              item={item}
              // favorites and toggleFavorite now handled by provider inside FoodCardSlider
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-96 gap-6">
            <div className="text-center text-gray-500 text-lg font-medium">
              Nothing in your wishlist yet.<br />
              Let me help you choose or go through the menu!
            </div>
            <div className="flex gap-4">
              <Button variant="primary" asChild>
                <Link href="/surprise">Let me help you</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/menu">Go to Menu</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
