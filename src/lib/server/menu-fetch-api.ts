
import "server-only";
import type { MenuItemNew } from "@/types/menu";
import categories from "@/lib/static/menu/categories.json";
import fs from "fs";
import path from "path";

function getAllMenuItems(): MenuItemNew[] {
  // Read all sub-category JSON files and aggregate menu_item_data
  const dir = path.join(process.cwd(), "src/lib/static/menu/sub-category");
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items: MenuItemNew[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    for (const entry of data) {
      if (entry.menu_item_data) {
        // Assign random likes for demo
        entry.menu_item_data.likes = Math.floor(Math.random() * 100);
        items.push(entry.menu_item_data);
      }
    }
  }
  return items;
}

export async function fetchMenuCategoriesFromApi(): Promise<string[]> {
  // Return categories from static file
  return categories;
}

export async function fetchMenuCategoryItemsFromApi(category: string): Promise<MenuItemNew[]> {
  const items = getAllMenuItems();
  return items.filter(i => i.category?.name === category);
}

export async function fetchMenuTopThisMonthFromApi(limit = 3): Promise<MenuItemNew[]> {
  const items = getAllMenuItems();
  // Return 3 random items
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

const _default = null;
export default _default;
