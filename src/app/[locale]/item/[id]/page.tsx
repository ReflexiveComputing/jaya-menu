"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Beef, Flame, Beer, Trash2 } from "lucide-react"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ImageSlider } from "@/components/ui/image-slider/image-slider"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'
import { useWishlist } from '@/components/providers/wishlist-provider'
import { MenuItemFull } from "@/types/menu";


export default function ItemDetails() {
  // wishlist is persisted via the WishlistProvider (localStorage)
  const { toggle, isFavorite: providerIsFavorite } = useWishlist()
  const [showFullDescription, setShowFullDescription] = useState(false)
  const t = useTranslations('Common');
  const params = useParams()

  // menu item fetched from the API (client-side)
  const [menuItemDetails, setMenuItemDetails] = useState<MenuItemFull | null>(null)

  useEffect(() => {
    const id = params?.id
    if (!id) return

    let cancelled = false

    async function load() {
      try {
        console.log(`Fetching menu item with id: ${id}`)
        const res = await fetch(`/api/item?id=${encodeURIComponent(String(id))}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const payload = await res.json()
        // backend shape: { success: true, data: ... }
        const data = payload?.data ?? payload
        if (!cancelled) setMenuItemDetails(data)
      } catch (err) {
        console.error('Failed to load menu item', err)
      }
    }

    load()
    return () => { cancelled = true }
  }, [params])

  const toggleFavorite = () => {
    if (!menuItemDetails) return
    toggle(menuItemDetails)
  }






  if (!menuItemDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      {/* Back Button */}
      <Link href="/food" className="absolute top-4 left-4 z-20  backdrop-blur-sm rounded-full p-2">
        <ChevronLeft className="w-6 h-6 text-app-dark-highlight " />
      </Link>
      {/* Image Carousel */}
      <div className="relative h-96 ">


        {/* Favorite Button */}
        {/* <ImageSliderHeartComponent
          variant="red"

          liked={isFavorite}
          likes={likes}
          toggleFavorite={toggleFavorite}
        /> */}

        {/* Carousel Images */}
        <ImageSlider
          images={(menuItemDetails.images && menuItemDetails.images.length > 0)
            ? menuItemDetails.images
            : [
                { id: 0, url: menuItemDetails.mainImage?.url || '/combo-background-2.jpg', menuItemId: Number(menuItemDetails.id || 0), sequence: 1 },
              ]}
          margin="md"
        />


      </div>

      {/* Content */}
      <div className="flex-1 bg-app-dark-highlight -mt-4 z-10 px-6 py-6 border-t border-app-dark-highlight rounded-3xl">
        {/* Header */}
        <div className="mb-6 text-gray-50">
          <h1 className="text-2xl uppercase font-header text-app-light-highlight font-bold mb-2">{menuItemDetails.name}</h1>
          <div className="text-2xl  font-header font-bold w-full flex flex-row justify-between pr-4">
            {menuItemDetails.price}€ 
           <div className="flex items-center justify-between">
            {/* <FoodTags tags={item.tags} /> */}
            {providerIsFavorite(menuItemDetails?.id) ? (
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

        {/* Features
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
        </div> */}

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-50 leading-relaxed pb-4">
            {menuItemDetails.description}
          </p>

          {/* <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            size="full" variant={"grayGhost"}>
            {showFullDescription ? t('showLess') : t('showMore')}
          </Button> */}
        </div>

        {/* Found in these combos */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Goes Well Wtih</h3>
          <div className="w-16 h-1 bg-black mb-6"></div>

          {itemDetails.combos.map((combo) => (
            <div key={combo.id} className="border-b border-gray-200 py-4 last:border-b-0">
              <ComboSuggestion combo={combo} />
            </div>
          ))}
        </div> */}
      </div>

      {/* Bottom Action Button
      <div className="m-auto px-6 pb-6">
        <Button variant="wishlist" size="mid" onClick={toggleFavorite} >Add to Wishlist</Button>
      </div> */}
    </div>
  )
}
