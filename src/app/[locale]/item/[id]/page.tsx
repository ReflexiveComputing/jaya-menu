"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Beef, Flame, Beer, Trash2 } from "lucide-react"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ImageSlider } from "@/components/ui/image-slider/image-slider"
import { ImageSliderHeartComponent } from "@/components/ui/image-slider/slider-heart-component"
import { Button } from "@/components/ui/button"
import { ComboSuggestion } from "@/components/ui/combo-suggestion"

const menuItemDetails = {
      "name": "The Mitho Cha Experience",
      "description": "For the starter, enjoy a Mixed Momo platter with 2 pieces each of Vegan, Paneer, and Chicken Momos, served with 2 different chutneys.\nThe main course is our Mitho Cha Thali, a curated selection of Daal Bhat specialties including Chicken Curry, Khasi Saag, Mustang Alu, Chana Masala, Vegetable Curry, Daal, and Spinach, served with salad, rice, and papadams.\nTo finish, the dessert is Shikarni – two small bowls of yogurt blended with cinnamon, cardamom, and cloves, topped with nuts and a Gulab Jamun.",
      "long_description": null,
      "price": 46.9,
      "thumbnail_url": "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/yogi_bhat.png",
      "images": [
        "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/yogi_bhat.png",
        "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/74.png",
        "https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/40.png"
      ],
      "is_available": true,
      "category": {
        "name": "Sizzler",
        "description": "",
        "is_active": true,
        "is_drink": false
      },
      "tags": [
        {
          "name": "Favourites",
          "description": "Customer favourites",
          "color": "purple",
          "is_active": true
        }
      ],
      "specials": [
        {
          "name": "Customer Favorite",
          "description": "Loved by customers",
          "icon": "⭐"
        }
      ],
      "protein": {
        "name": "chicken, lamb",
        "description": ""
      },
      "spice": {
        "name": "warming",
        "description": ""
      },
      "size": {
        "name": "full",
        "description": ""
      },
      "id": "ab5ccb33-4ac8-4e90-966e-3655a7f25612"
    }

// Keep the mock data for reference:
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
      "name": "Bhat",
      "description": "Small bowl of basmati rice.",
    },
    {
      id: 2,
      "name": "Sherpa Tee ",
      "description": "Homemade oat-yogi chai prepared with fresh ingredients using an old family recipe (contains oat milk & sugar)",
    },
    {
      id: 3,
     "name": "Barasinghe Pale Ale",
      "description": "Nepali Beer, Ask for availability",
    },
  ],
}

export default function ItemDetails() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [likes, setLikes] = useState(itemDetails.likes)
  const t = useTranslations('Common');


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
      <Link href="/food" className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2">
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
          images={["https://snhltnwklxscjle7.public.blob.vercel-storage.com/Mitho-cha/yogi_bhat.png", "/combo-background-2.jpg", "/combo-background.jpg"]}
          margin="md"
        />


      </div>

      {/* Content */}
      <div className="flex-1 bg-background -mt-4 z-10 px-6 py-6 border-t rounded-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{menuItemDetails.name}</h1>
          <h2 className="text-lg font-medium mb-3">{menuItemDetails.description.slice(0, 50)}</h2>
          <div className="text-2xl font-bold w-full flex flex-row justify-between pr-4">
            {menuItemDetails.price}€ 
           <div className="flex items-center justify-between">
            {/* <FoodTags tags={item.tags} /> */}
            {isFavorite ? (
              <button
                onClick={toggleFavorite}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4 text-global-red" />
              </button>
            ) : (
              <Button variant={"wishlist"} size="mid" onClick={toggleFavorite}>
                {t('addToWishlist')}
              </Button>
            )}
          </div>
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
            {showFullDescription ? menuItemDetails.description : `${menuItemDetails.description.substring(0, 150)}...`}
          </p>

          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            size="full" variant={"grayGhost"}>
            {showFullDescription ? t('showLess') : t('showMore')}
          </Button>
        </div>

        {/* Found in these combos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Goes Well Wtih</h3>
          <div className="w-16 h-1 bg-black mb-6"></div>

          {itemDetails.combos.map((combo) => (
            <div key={combo.id} className="border-b border-gray-200 py-4 last:border-b-0">
              <ComboSuggestion combo={combo} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="m-auto px-6 pb-6">
        <Button variant="wishlist" size="mid" onClick={toggleFavorite} >Add to Wishlist</Button>
      </div>
    </div>
  )
}
