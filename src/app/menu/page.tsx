"use client"

import { useState } from "react"
import { Heart, Menu, Package, ChevronLeft, Utensils } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { DynamicIcon } from 'lucide-react/dynamic';
import { MenuFilters } from "@/components/ui/menu-filters"
import React from "react"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { HeartCounter } from "@/components/ui/food-card/heart-component"
import { FoodTags } from "@/components/ui/food-card/food-tags"
import { FoodCard } from "@/components/ui/food-card/food-card"
import { BottomNavbar } from "@/components/ui/bottom-navbar"

const categories = [
  { id: "all", label: "All" },
  { id: "meals", label: "Meals" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "lamb", label: "Lamb" },
  { id: "chicken", label: "Chicken" },
  { id: "beef", label: "Beef" },
]

const popularItems = [
  {
    id: 1,
    name: "Burrito Berliner",
    description: "Burrito with taste of Berlin",
    price: "10€",
    image: "/nila-2nd-image.png",
    badge: "Guest Favourite",
    badgeColor: "gold",
    likes: 13,
    isVegetarian: true,
    tags: ["nut", "beer", "beef"],
  },
  {
    id: 2,
    name: "Mediterranean Bowl",
    description: "Fresh bowl with Mediterranean flavors",
    price: "12€",
    image: "/nila-1st-image.png",
    badge: "Popular",
    badgeColor: "green",
    likes: 8,
    isVegetarian: true,
    tags: ["flame", "beer", "fish"],
  },
  {
    id: 3,
    name: "Spicy Wrap",
    description: "Wrapped with spicy ingredients",
    price: "9€",
    image: "/nila-3rd-image.png",
    badge: "New",
    badgeColor: "purple",
    likes: 15,
    isVegetarian: false,
    tags: ["flame", "amphora", "snail"],
  },
]

const vegetarianItems = [
  {
    id: 4,
    name: "Veggie Delight",
    description: "Pure vegetarian goodness",
    price: "11€",
    image: "/nila-4th-image.png",
    likes: 13,
    isVegetarian: true,
    badge: "Popular",
    tags: ["shell", "vegan", "wine"],
  },
  {
    id: 5,
    name: "Green Power Bowl",
    description: "Packed with green vegetables",
    price: "13€",
    image: "/nila-5th-image.png",
    likes: 9,
    badge: "Popular",
    isVegetarian: true,
  },
]

export default function MenuPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Toggle filters
  const toggleMenuFilters = (categoryId: string) => {
    setActiveFilters((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const [show, setShow] = React.useState(true)
  const lastScrollY = React.useRef(0)
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY.current) {
        setShow(true) // scrolling up
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false) // scrolling down
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div
        className={`sticky top-0 z-10 bg-white transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Header */}
        <Header title="Menu" showChevron={true} linkTo="/" align="center" size="default" />
        {/* Menu Filters */}
        <MenuFilters
          categories={categories}
          toggleMenuFilters={toggleMenuFilters}
          activeFilters={activeFilters}

        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular This Month Section */}
        <div className="py-6">
          <div className="px-4 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Popular This Month</h2>
              <div className="w-16 h-1 bg-black mt-1"></div>
            </div>
            <Link href="/this-month-favourites" className="text-teal-600 text-sm font-medium hover:text-teal-700">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-4 pb-2">
              {popularItems.map((item) => (
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

        {/* Vegetarian Section */}
        <div className="py-6">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-bold">Vegetarian</h2>
            <div className="w-16 h-1 bg-black mt-1"></div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-4 pb-2">
              {vegetarianItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  showBadge={true}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavbar />
    </div>
  )
}
