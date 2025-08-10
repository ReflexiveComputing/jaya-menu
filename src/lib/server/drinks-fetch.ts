import "server-only";
import { MenuItem } from "@/types/menu";
import drinksData from "@/lib/static/drinks.json";

export async function fetchDrinksCategories(): Promise<string[]> {
  return [...new Set(drinksData.map(item => item.category).flat())];
}

export async function fetchDrinksCategoryItems(category: string): Promise<MenuItem[]> {
  let filteredItems = drinksData.filter(item =>
    item.category.includes(category)
  );

  if (filteredItems.length < 2) {
    const remainingItems = drinksData.filter(
      item => !filteredItems.some(filtered => filtered.id === item.id)
    );
    const randomItems = remainingItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    filteredItems = [...filteredItems, ...randomItems];
  }

  return filteredItems as MenuItem[];
}

export async function fetchDrinksTopThisMonth(limit = 3): Promise<MenuItem[]> {
  return drinksData
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit) as MenuItem[];
}