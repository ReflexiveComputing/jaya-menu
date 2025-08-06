"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Menu, Package, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { ImageSlider } from "@/components/ui/image-slider/image-slider"
import { ImageSliderHeartComponent } from "@/components/ui/image-slider/slider-heart-component"
import { FoodBadge } from "@/components/ui/food-card/food-badge"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"

const favouriteItems = [
	{
		id: 1,
		name: "Burrito Berliner",
		description: "Burrito with taste of Berlin",
		longDescription: "Slightly Longer Description",
		price: "10€",
		images: [
			"/nila-4th-image.png",
			"/nila-5th-image.png",
			"/nila-6th-image.png",
		],
		likes: 13,
		isVegetarian: true,
		badge: "Guest Favourite",
		badgeColor: "gold",
		tags: ["shell", "vegan", "wine"],
	},
	{
		id: 2,
		name: "Mediterranean Bowl",
		description: "Fresh bowl with Mediterranean flavors",
		longDescription: "Packed with fresh vegetables, olives, and feta cheese",
		price: "12€",
		images: [
			"/nila-4th-image.png",
			"/nila-5th-image.png",
			"/nila-6th-image.png",
		],
		likes: 18,
		isVegetarian: true,
		badge: "Popular",
		badgeColor: "green",
		tags: ["shell", "vegan", "wine"],
	},
	{
		id: 3,
		name: "Spicy Chicken Wrap",
		description: "Wrapped with spicy chicken and fresh vegetables",
		longDescription: "Tender chicken with our signature spicy sauce",
		price: "11€",
		images: [
			"/nila-4th-image.png",
			"/nila-5th-image.png",
			"/nila-6th-image.png",
		],
		likes: 15,
		isVegetarian: false,
		badge: "Spicy",
		badgeColor: "purple",
		tags: ["shell", "vegan", "wine"],
	},
	{
		id: 4,
		name: "Veggie Power Bowl",
		description: "Nutritious bowl packed with superfoods",
		longDescription: "Quinoa, avocado, and seasonal vegetables",
		price: "13€",
		images: [
			"/nila-4th-image.png",
			"/nila-5th-image.png",
			"/nila-6th-image.png",
		],
		likes: 22,
		isVegetarian: true,
		badge: "Healthy",
		tags: ["shell", "vegan", "wine"],
	},
]

export default function ThisMonthFavourites() {
	const [favorites, setFavorites] = useState<number[]>([1, 4])

	const toggleFavorite = (itemId: number) => {
		setFavorites((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header */}

			<Header title="Popular This Month" showChevron />

			{/* Main Content - Vertical Scrolling List */}
			<div className="flex-1 overflow-y-auto px-4 py-6 mb-6">
				{favouriteItems.map((item) => (
					<FoodCardSlider
						key={item.id}
						item={item}
						favorites={favorites}
						toggleFavorite={toggleFavorite}
					/>
				))}
			</div>
		</div>
	)
}
