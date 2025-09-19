"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider"
import { Button } from "@/components/ui/button"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useWishlist } from "@/components/providers/wishlist-provider"

export default function Wishlist() {
  const { favorites, toggle } = useWishlist()
  const t = useTranslations('Wishlist');
  const tCommon = useTranslations('Common');
  const tSurprise = useTranslations('Surprise');
  console.log("Wishlist items:", favorites)


  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <div className="bg-app-dark-highlight">

        <Header title={t('title')} showChevron />
      </div>

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
            <div className="text-center text-gray-50 text-lg font-medium">
              {t('emptyMessage')}<br />
              {t('emptySubMessage')}
            </div>
            <div className="w-full flex flex-col justify-center gap-4">

              <div className="w-fit m-auto gap-4">
                <Button variant="secondary" size={"mid"} asChild>
                  <Link href="/food">{t('goToMenu')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
