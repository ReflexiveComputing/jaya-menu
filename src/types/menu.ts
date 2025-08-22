export type MenuItem = {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  images: string[];
  likes: number;
  isVegetarian: boolean;
  badge: string;
  badgeColor: "gold" | "green" | "purple" | "default" | null | undefined;
  tags: string[];
  category: string[]; // NEW
  mainCategory: string; // NEW
};

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
  id: string;
  name?: string;
  description?: string | null;
  color?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
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
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
  long_description: string | null;
  price: number;
  thumbnail_url: string | null;
  images: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
  category: CategoryObject;
  tags: TagObject[];
  protein?: ProteinObject;
  spice?: SpiceObject;
  size?: SizeObject;
};

// Convenience type for the API shape: { [uuid]: { menu_item_data: MenuItemNew } }
export type MenuItemsApiResponse = Record<string, { menu_item_data: MenuItemNew }>;