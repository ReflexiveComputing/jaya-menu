
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