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
import NepaliSunIcon from "@/components/ui/icons/svg/nepali-sun";
import NepaliMoonIcon from "@/components/ui/icons/svg/nepali-moon";

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
            <Link href="/drinks" className="w-1/4 max-w-12 h-full bg-app-dark-highlight flex items-center justify-center">
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
          <div className="flex w-4 flex-col justify-center items-center min-h-50 ">
            <div className="mr-3 pb-1">
              <NepaliSunIcon size={24} backgroundColor="#febd3a" />
            </div>
            <div className="w-4 flex flex-col min-h-50 ">
              <VerticalDashedLines className=" max-w-0.5" color="#febd3a" dashHeight={4} gap={3} width={2} />
            </div>
            <div className="mr-3">
              <NepaliMoonIcon size={24} backgroundColor="#febd3a" />
            </div>
          </div>
          <div className="w-2/3 text-center text-gray-50 text-lg font-medium ">
            {t('emptyMessage')}<br />
            {t('emptySubMessage')}
          </div>

        </div>
        <div className="w-full flex flex-col justify-center gap-4">


        </div>
      </div>
    )
  )
}
