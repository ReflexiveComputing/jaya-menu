import { MenuItemFull } from "@/types/menu";
import React from "react";
import NepaliMoonIcon from "./icons/svg/nepali-moon";
import NepaliSunIcon from "./icons/svg/nepali-sun";
import { Icon } from '@iconify-icon/react';
import { AddWhishlistItem } from "./add-whishlist-item";
import VerticalDashedLines from "./vertical-dashed-lines";


type WishlistItem = {
    count: number
    menuItem: MenuItemFull
}

export default function FoodListItem({ favorite }: { favorite: WishlistItem }) {
    return (
        <div className="food-item flex flex-col items-start px-2 first:pt-4">
            <div className="relative flex w-full flex-start items-center ">
                {favorite.menuItem.drinkCategories?.length ? (<NepaliMoonIcon size={24} backgroundColor="#febd3a" />) : (<NepaliSunIcon size={24} backgroundColor="#febd3a" />)}


                <div className="w-2/3 flex-1 flex-start">
                    <div className="flex items-center flex-start gap-2">
                        <h3 className="text-lg text-app-light-highlight font-medium">{favorite.menuItem.name}</h3>
                        <div className="flex gap-2 self-end">
                            {favorite.menuItem.mainIngredients?.map(mi =>
                                <Icon key={mi.ingredient?.id} className="text-app-light-highlight w-3 h-3" icon={mi.ingredient?.iconName || "mdi:information-outline"} />

                            )}
                           
                        </div>

                    </div>
                </div>
                <div className="flex flex-end justify-center items-center">
                    <AddWhishlistItem item={favorite.menuItem} />
                </div>
            </div>
            <div className="flex w-full justify-start min-h-[60px]">
                <VerticalDashedLines className="mx-2 max-w-0.5 min-h-full" color="#febd3a" dashHeight={4} gap={3} width={2} />
                {favorite.menuItem.shortDescription ? (
                    <p className="w-full description text-sm text-gray-200">{favorite.menuItem.shortDescription}</p>
                ) : <p className="w-3/5 description text-sm text-gray-200">Some text to test the component some more text</p>}
            </div>
        </div>
    );
}

