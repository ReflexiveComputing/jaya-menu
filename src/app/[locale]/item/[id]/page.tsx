"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Beef, Flame, Beer, Trash2, ArrowLeft } from "lucide-react"
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ImageSlider } from "@/components/ui/image-slider/image-slider"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'
import { useWishlist } from '@/components/providers/wishlist-provider'
import { Ingredient, MenuItemFull } from "@/types/menu";
import { ImageSliderHeartComponent } from "@/components/ui/image-slider/slider-heart-component";
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun";
import VerticalDashedLines from "@/components/ui/vertical-dashed-lines";
import MenuItemAllergens from "@/components/ui/menu-item-allergens";
import { JoystickMenuNavbar } from "@/components/ui/joystick-menu-navbar";


export default function ItemDetails() {
  // wishlist is persisted via the WishlistProvider (localStorage)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const t = useTranslations('Common');
  const params = useParams()
  const locale = useLocale();

  // menu item fetched from the API (client-side)
  const [menuItemDetails, setMenuItemDetails] = useState<MenuItemFull | null>(null)

  useEffect(() => {
    const id = params?.id
    if (!id) return

    let cancelled = false

    async function load() {
      try {
        console.log(`Fetching menu item with id: ${id}`)
        const res = await fetch(`/api/item?id=${encodeURIComponent(String(id))}`, {
          headers: {
            'Accept-Language': locale || 'en',
          },
        })
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






  if (!menuItemDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading…</div>
      </div>
    )
  }

  // format price into main + decimals like PriceBox
  const priceNumber = typeof menuItemDetails.price === "number"
    ? menuItemDetails.price
    : parseFloat(String(menuItemDetails.price)) || 0;
  const priceStr = priceNumber.toFixed(2);
  const [priceMain, priceDec] = priceStr.split(".");

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      {/* Back Button */}
      <Link href="/food" className="absolute top-4 left-4 z-20  backdrop-blur-sm rounded-full p-2">
        <ArrowLeft className="w-6 h-6  text-app-dark-highlight " />
      </Link>
      {/* Image Carousel */}
      <div className="relative h-96 ">


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
      <div className="flex-1 bg-app-dark-highlight z-10 px-4 py-6 border-t border-app-dark-highlight ">
        {/* Header */}
        <div className="pb-2 text-gray-50">
          <div className="m-auto w-full flex flex-row flex-start">
            <div className="m-auto px-2 ">
              <NepaliSunIcon size={24} backgroundColor="#febd3a" />
            </div>
            <h1 className="m-auto w-full text-2xl uppercase font-[family-name:var(--font-fjalla-one)] text-app-light-highlight font-medium mb-2">{menuItemDetails.name}</h1>
          </div>



        </div>



        {/* Description */}
        <div className="flex w-full mb-6 h-max">
          <VerticalDashedLines className="mx-4 min-h-full" color="#febd3a" dashHeight={4} gap={3} width={2} />
          <p className="text-gray-50 leading-relaxed w-2/3 pb-4 text-right">
            {menuItemDetails.description}
          </p>

          <div className="mx-auto w-1/3 flex flex-col items-end">

            <div className="text-2xl font-[family-name:var(--font-fjalla-one)] font-medium  flex flex-row justify-end">
              <p>
                <span className="text-app-light-highlight font-medium mr-2">€</span>
                <span className="font-[family-name:var(--font-fjalla-one)] font-medium text-2xl text-gray-50">{priceMain}</span>
                <span className="text-sm ml-1 text-gray-200">.{priceDec}</span>
              </p>

            </div>
            <div className="mt-4 ">
              <MenuItemAllergens iconSize={24} allergens={menuItemDetails.mainIngredients?.flatMap(mainIngredient => mainIngredient.ingredient).filter((ing): ing is Ingredient => ing !== undefined) || []} className="text-app-light-highlight w-1/3 pr-1 m-auto" />
            </div>
          </div>

        </div>

        {/* Found in these combos */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Goes Well Wtih</h3>
          <div className="w-16 h-1 bg-black mb-6"></div>

          {itemDetails.combos.map((combo) => (
            <div key={combo.id} className="border-b border-gray-200 py-4 last:border-b-0">
              <ComboSuggestion combo={combo} />
            </div>
          ))}
        </div> */}
      </div>

          <JoystickMenuNavbar item={menuItemDetails} selectedNav={""} onNavClick={function (nav: string): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  )
}
