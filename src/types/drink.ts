import type { CategoryObject } from "@/types/menu";

export type Drink = {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
  long_description: string | null;
  price: number;
  thumbnail_url: string | null;
  images: string[];
  is_alcoholic: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  category: CategoryObject;
  likes?: number;
};

export type DrinksApiResponse = Record<string, { drink_data: Drink }>;

export default null;
