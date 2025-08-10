"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { MenuItem } from "@/types/menu"

export default function Wishlist() {
  const { favorites, toggle } = useWishlist()
  console.log("Wishlist items:", favorites)


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="My Wishlist" showChevron />

      <div className="flex-1 overflow-y-auto px-4 mb-6">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <FoodCardSlider
              key={item.id}
              item={item}
            // favorites and toggleFavorite now handled by provider inside FoodCardSlider
            />
          ))
        ) : (
          <div className="m-auto flex flex-col items-center justify-center h-96 gap-6">
            <div className="text-center text-gray-500 text-lg font-medium">
              Nothing in your wishlist yet.<br />
              Let me help you choose or go through the menu!
            </div>
            <div className="w-full flex flex-col justify-center gap-4">

              <div className="w-fit m-auto gap-4">
                <Button variant="primary" size={"mid"} asChild>
                  <Link href="/surprise">Our Recommendation</Link>
                </Button>
              </div>
              <div className="w-fit m-auto gap-4">
                <Button variant="secondary" size={"mid"} asChild>
                  <Link href="/menu">Go to Menu</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
