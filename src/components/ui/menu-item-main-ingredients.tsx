import * as React from "react";
import { Icon } from '@iconify-icon/react';
import { Allergen, Ingredient } from "@/types/menu";



type MenuItemMainIngredientsProps = {
  ingredients: Ingredient[]; // each item supplies its own icon + name
  iconSize?: number;
  className?: string;
  color?: string;
};

export const MenuItemMainIngredients: React.FC<MenuItemMainIngredientsProps> = ({
  ingredients,
  iconSize = 16,
  className = "",
  color = "#ffffff",
}) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {ingredients.map((i, idx) => (
        <div key={i.name + idx} className="flex items-center gap-2">
          <Icon
            icon={i.iconName || "mdi:information-outline"}
            width={iconSize}
            height={iconSize}
            color={color}
            aria-hidden
          />
          <span className="text-sm text-gray-200">{i.displayName}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuItemMainIngredients;
