"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useWishlist } from "@/components/providers/wishlist-provider"
import FoodListItem from "@/components/ui/food-list";
import { X } from "lucide-react";
import VerticalDashedLines from "@/components/ui/vertical-dashed-lines";

export default function Wishlist() {
  const t = useTranslations('Wishlist');
  const tCommon = useTranslations('Common');
  const tSurprise = useTranslations('Surprise');
  const { favorites } = useWishlist()


  return (
    favorites.length > 0 ? (
      <div className="min-h-screen bg-app-background flex flex-col">
        <div className="bg-app-dark-highlight">
          <Header title={t('title')} showChevron className="uppercase" />
        </div>

        <div className="flex-1 flex flex-col px-6 mb-6 min-h-0">       {/* container can shrink */}
          <div className="flex-1 overflow-y-auto space-y-2">          {/* scrollable list area */}
            {favorites.map((item) => (
              <FoodListItem key={item.menuItem.id} favorite={item} />
            ))}
          </div>

          <div className="flex items-center min-h-40 w-full mt-auto"> {/* stays at bottom when list is short */}
            <Button asChild variant="wishlist" size={"mid"} className="w-3/4 m-auto">
              <Link href="/wishlist/ready-to-order">{t('readyToOrder')}</Link>
            </Button>
            <Link href="/food" className="w-1/4 max-w-12 h-full bg-app-dark-highlight flex items-center justify-center">
              <X className="w-12 h-12 m-auto text-app-light-highlight" />
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-app-background flex flex-col">
        <div className="bg-app-dark-highlight">
          <Header title={t('title')} showChevron />
        </div>
        <div className="flex w-full justify-center items-center pt-20 min-h-50">
          <VerticalDashedLines className="mx-4 max-w-0.5" color="#febd3a" dashHeight={4} gap={3} width={2} />
          <div className="text-center text-gray-50 text-lg font-medium ">
            {t('emptyMessage')}<br />
            {t('emptySubMessage')}
          </div>

        </div>
        <div className="w-full flex flex-col justify-center gap-4">

          <div className="w-fit m-auto pt-5 gap-4">
            <Button variant="surpriseMe" size={"mid"} asChild>
              <Link href="/food">{t('goToMenu')}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
