
import "server-only";

import type { MenuItemNew } from "@/types/menu";
import categoriesData from "@/lib/static/menu/categories.json";
import fs from "fs";
import path from "path";
import { MenuCategory } from "@/types/category";



const categories: MenuCategory[] = categoriesData;

function getMenuItemsByCategoryFilename(filename: string): MenuItemNew[] {
  const filePath = path.join(process.cwd(), "src/lib/static/menu/sub-category", filename + ".json");
  if (!fs.existsSync(filePath)) return [];
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const items: MenuItemNew[] = [];
  for (const entry of data) {
    if (entry.menu_item_data) {
      items.push(entry.menu_item_data);
    }
  }
  return items;
}


export async function fetchMenuCategoriesFromApi(): Promise<MenuCategory[]> {
  // Return categories from static file
  return categories;
}


export async function fetchMenuCategoryItemsFromApi(categoryKey: string): Promise<MenuItemNew[]> {
  // Try to find by name first
  let category = categories.find(c => c.name === categoryKey);
  if (!category) {
    // Try to find by filename (with or without .json)
    category = categories.find(c => c.filename.replace(/\.json$/, "") === categoryKey);
  }
  if (!category) return [];
  return getMenuItemsByCategoryFilename(category.filename);
}


// Optionally, you can implement a 'top this month' by picking random items from all categories
export async function fetchMenuTopThisMonthFromApi(limit = 3): Promise<MenuItemNew[]> {
  let allItems: MenuItemNew[] = [];
  for (const cat of categories) {
    allItems = allItems.concat(getMenuItemsByCategoryFilename(cat.filename));
  }
  // Return random items
  const shuffled = allItems.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

