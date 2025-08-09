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