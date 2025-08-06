"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Beef, Flame, Beer } from "lucide-react"
import Link from "next/link"
import { ImageSlider } from "@/components/ui/image-slider/image-slider"
import { ImageSliderHeartComponent } from "@/components/ui/image-slider/slider-heart-component"
import { Button } from "@/components/ui/button"
import { ComboSuggestion } from "@/components/ui/combo-suggestion"

// Mock data for the item details
const itemDetails = {
  id: 1,
  name: "Burrito Berliner",
  subtitle: "Taste Local Cuisine Mexican Way.",
  description: "Made with locally sourced beef from metro",
  price: "10€",
  likes: 13,
  images: [
    "/nila-4th-image.png",
    "/nila-5th-image.png",
    "/nila-6th-image.png",
  ],
  features: [
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Spicy Dish",
      description: "For those who can take it",
    },
    {
      icon: <Beef className="w-6 h-6" />,
      title: "Made with beef",
      description: "For those who can take it",
    },
    {
      icon: <Beer className="w-6 h-6" />,
      title: "Goes well beer",
      description: "For those who can take it",
    },
  ],
  fullDescription:
    "A bold and fiery burrito packed with tender grilled meat, rice, beans, and melted cheese. Wrapped in a warm flour tortilla and smothered with our house-made spicy salsa. Served with crispy tortilla chips and a side of creamy jalapeño dip. Not for the faint of heart!",
  combos: [
    {
      id: 1,
      name: "The Brave Burrito",
      description: "Combination of some meals to bring spices to the max. Comes with yogurt",
    },
    {
      id: 2,
      name: "Cheesy Spiced Beef",
      description: "Combination of some meals to bring spices to the max. Comes with yogurt",
    },
    {
      id: 3,
      name: "Cheesy Spiced Beef",
      description: "Combination of some meals to bring spices to the max. Comes with yogurt",
    },
  ],
}

export default function ItemDetails() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [likes, setLikes] = useState(itemDetails.likes)



  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toggleLikes()
  }

  const toggleLikes = () => {
    setLikes(isFavorite ? likes - 1 : likes + 1)
    console.log(`Likes updated to: ${likes}`)
  }



  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button */}
      <Link href="/menu" className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2">
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </Link>
      {/* Image Carousel */}
      <div className="relative h-96 ">


        {/* Favorite Button */}
        <ImageSliderHeartComponent
          variant="red"

          liked={isFavorite}
          likes={likes}
          toggleFavorite={toggleFavorite}
        />

        {/* Carousel Images */}
        <ImageSlider
          images={["/nila-1st-image.png", "/nila-2nd-image.png", "/nila-4th-image.png", "/nila-6th-image.png"]}
          margin="md"
        />


      </div>

      {/* Content */}
      <div className="flex-1 bg-background -mt-4 z-10 px-6 py-6 border-t rounded-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{itemDetails.name}</h1>
          <h2 className="text-lg font-medium mb-3">{itemDetails.subtitle}</h2>
          <p className="text-gray-600 mb-4">{itemDetails.description}</p>
          <div className="text-2xl font-bold w-full flex flex-row justify-between pr-4">
            {itemDetails.price}
            <Button size={"mid"} onClick={toggleFavorite} >Add to Wishlist</Button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          {itemDetails.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="text-gray-800">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed pb-4">
            {showFullDescription ? itemDetails.fullDescription : `${itemDetails.fullDescription.substring(0, 150)}...`}
          </p>

          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            size="full" variant={"grayGhost"}>
            {showFullDescription ? "Show Less" : "Show More"}
          </Button>
        </div>

        {/* Found in these combos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Found in these combos</h3>
          <div className="w-16 h-1 bg-black mb-6"></div>

          {itemDetails.combos.map((combo) => (
            <div key={combo.id} className="border-b border-gray-200 py-4 last:border-b-0">
              <ComboSuggestion combo={combo} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="px-6 pb-6">
        <Button variant="primary" onClick={toggleFavorite} >Add to Wishlist</Button>
      </div>
    </div>
  )
}
