
// Types matching the `menu_item_data` shape from the detailed API export
export type CategoryObject = {
  id: string;
  restaurant_id?: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TagObject = {
  name: string;
  description: string | null;
  color: string | null;
  is_active: boolean;

};

export type ProteinObject = {
  id?: string;
  name?: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SpiceObject = {
  id?: string;
  name?: string;
  heat_level?: number;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SizeObject = {
  id?: string;
  name?: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

// This represents the inner `menu_item_data` object in the API response
export type MenuItemNew = {
  id: string;
  name: string;
  description: string;
  long_description: string | null;
  price: number;
  thumbnail_url: string;
  images: string[];
  is_available: boolean;
  category: {
    name: string;
    description: string;
    is_active: boolean;
    is_drink: boolean;
  };
  tags: TagObject[];
  specials?: {
    name: string;
    description: string;
    icon: string;
  }[];
  protein?: {
    name: string;
    description: string;
  };
  spice?: {
    name: string;
    description: string;
  };
  size?: {
    name: string;
    description: string;
  };
  likes?: number;
};

// Convenience type for the API shape: { [uuid]: { menu_item_data: MenuItemNew } }
export type MenuItemsApiResponse = Record<string, { menu_item_data: MenuItemNew }>;

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  mainCategory?: MainCategory;
  shortDescription?: string;
  description?: string;
  restaurantId: number;
  ingrediants?: Ingrediant[];
  mainIngrediants?: MenuItemMainIngrediant[];
}

export interface MainIngrediantJoin {
  id: number;
  menuItemId: number;
  ingrediantId: number;
  position: number;
  ingrediant?: Ingrediant;
}

export interface MenuItemFull extends MenuItem {
  categories?: Category[];
  allergens?: Allergen[];
  images?: Image[];
  mainIngrediants?: MainIngrediantJoin[];
  mainImage?: Image | null;
  drinkCategories?: Category[];
}

export interface Restaurant {
  id: number;
  code: string;
  name: string;
  description?: string;
  MenuItem?: MenuItem[];
  menu?: MenuItem[];

}
export interface MainCategory {
  id: number;
  name: string;
  description?: string;
  displayName?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  displayName?: string;
  sequence?: number;
}

export interface Allergen {
  id: number;
  code: string;
  name: string;
  description?: string;
  iconName?: string;
}

export interface Ingrediant {
  id: number;
  name: string;
  description?: string;
  iconName?: string;
  displayName?: string;
}

export interface Image {
  id: number;
  url: string;
  menuItemId: number;
  sequence?: number;
}

export interface MenuItemMainIngrediant {
  id: number;
  menuItemId: number;
  ingrediantId: number;
  position: number;       // DB enforces 1..3
  ingrediant?: Ingrediant; // optional nested payload (use Ingrediant here)
}

export type MenuItemMainIngrediantWithIngrediant = MenuItemMainIngrediant & { ingrediant: Ingrediant };
export type MenuItemWithMainIngrediants = MenuItem & { mainIngrediants: MenuItemMainIngrediantWithIngrediant[] };