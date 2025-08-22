import "server-only";
import type { Drink } from "@/types/drink";
import apiResponseData from "@/lib/static/detailed_drinks_response.json";

const apiResponse = apiResponseData as unknown as { data?: Record<string, { drink_data: Drink }> };

function getItems(): Drink[] {
  if (!apiResponse || !apiResponse.data) return [];
  return Object.values(apiResponse.data).map(entry => entry.drink_data).filter(Boolean);
}

export async function fetchDrinksCategoriesFromApi(): Promise<string[]> {
  const items = getItems();
  const names = items.map(i => i.category?.name).filter(Boolean) as string[];
  return Array.from(new Set(names));
}

export async function fetchDrinksCategoryItemsFromApi(category: string): Promise<Drink[]> {
  const items = getItems();
  return items.filter(i => i.category?.name === category);
}

export async function fetchDrinksTopThisMonthFromApi(limit = 3): Promise<Drink[]> {
  const items = getItems();

  const itemsWithLikes = items.filter(i => typeof (i as any).likes === "number") as (Drink & { likes?: number })[];

  if (itemsWithLikes.length > 0) {
    return itemsWithLikes.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, limit);
  }

  return items
    .filter(i => !!i.created_at)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export default null;
