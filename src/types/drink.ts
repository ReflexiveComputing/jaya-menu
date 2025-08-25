import type { CategoryObject } from "@/types/menu";

export type Drink = {
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
  tags: string[];
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
  likes?: number;
};

export type DrinksApiResponse = Record<string, { drink_data: Drink }>;

export default DrinksApiResponse;
