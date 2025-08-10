import "server-only";
import { MenuItem } from "@/types/menu";
import menuData from "@/lib/static/menu.json";

export async function fetchMenuCategories(): Promise<string[]> {
  return [...new Set(menuData.map(item => item.category).flat())];
}

export async function fetchMenuCategoryItems(category: string): Promise<MenuItem[]> {
  let filteredItems = menuData.filter(item =>
    item.category.includes(category)
  );

  if (filteredItems.length < 2) {
    const remainingItems = menuData.filter(
      item => !filteredItems.some(filtered => filtered.id === item.id)
    );
    const randomItems = remainingItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    filteredItems = [...filteredItems, ...randomItems];
  }

  return filteredItems as MenuItem[];
}

export async function fetchMenuTopThisMonth(limit = 3): Promise<MenuItem[]> {
  return menuData
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit) as MenuItem[];
}