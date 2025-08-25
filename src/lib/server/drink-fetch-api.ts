
import "server-only";
import type { Drink } from "@/types/drink";
import categories from "@/lib/static/drink/categories.json";
import fs from "fs";
import path from "path";
import { MenuItemNew } from "@/types/menu";

type DrinkCategory = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};


function getAllDrinkItems(): MenuItemNew[] {
  // Read all sub-category JSON files and aggregate menu_item_data as Drink
  const dir = path.join(process.cwd(), "src/lib/static/drink/sub-category");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items: MenuItemNew[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    for (const entry of data) {
      if (entry.menu_item_data) {
        // Assign random likes for demo
        entry.menu_item_data.likes = Math.floor(Math.random() * 100);
        // Add id if missing (for demo)
        if (!entry.menu_item_data.id) {
          entry.menu_item_data.id = file + Math.random().toString(36).slice(2, 8);
        }
        items.push(entry.menu_item_data);
      }
    }
  }
  return items;
}

export async function fetchDrinksCategoriesFromApi(): Promise<string[]> {
  // Return category names from static file
  return (categories as DrinkCategory[]).map(cat => cat.name);
}

export async function fetchDrinksCategoryItemsFromApi(category: string): Promise<MenuItemNew[]> {
  const items = getAllDrinkItems();
  return items.filter(i => i.category?.name === category);
}

export async function fetchDrinksTopThisMonthFromApi(limit = 3): Promise<MenuItemNew[]> {
  const items = getAllDrinkItems();
  // Return 3 random items
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

const _default = null;
export default _default;
