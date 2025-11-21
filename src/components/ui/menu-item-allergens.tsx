import * as React from "react";
import { Icon } from '@iconify-icon/react';
import { Allergen, Additive } from "@/types/menu";



type MenuItemAllergensProps = {
  allergens: Allergen[] | Additive[]; // each item supplies its own icon + name
  iconSize?: number;
  className?: string;
  color?: string;
};

export const MenuItemAllergens: React.FC<MenuItemAllergensProps> = ({
  allergens,
  iconSize = 16,
  className = "",
  color = "#ffffff",
}) => {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {allergens.map((a, idx) => (
        <div key={a.name + idx} className="flex flex-col items-center gap-2">
          <Icon
            icon={a.iconName || "mdi:information-outline"}
            width={iconSize}
            height={iconSize}
            color={color}
            aria-hidden
          />
          <span className="text-sm text-gray-200">{a.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuItemAllergens;