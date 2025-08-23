import "server-only";
import type { MenuItemNew } from "@/types/menu";
import apiResponseData from "@/lib/static/detailed_menu_items_response_clean.json";

// The JSON has shape: { data: { <uuid>: { menu_item_data: MenuItemNew } } }
const apiResponse = apiResponseData as unknown as { data?: Record<string, { menu_item_data: MenuItemNew }> };

function getItems(): MenuItemNew[] {
  if (!apiResponse || !apiResponse.data) return [];
  return Object.values(apiResponse.data)
    .map(entry => entry.menu_item_data)
    .filter(Boolean);
}

export async function fetchMenuCategoriesFromApi(): Promise<string[]> {
  const items = getItems();
  const names = items.map(i => i.category?.name).filter(Boolean) as string[];
  return Array.from(new Set(names));
}

export async function fetchMenuCategoryItemsFromApi(category: string): Promise<MenuItemNew[]> {
  const items = getItems();
  return items.filter(i => i.category?.name === category);
}

export async function fetchMenuTopThisMonthFromApi(limit = 3): Promise<MenuItemNew[]> {
  const items = getItems();

  // Type guard for likes
  function hasLikes(item: MenuItemNew): item is MenuItemNew & { likes: number } {
    return typeof item.likes === "number";
  }

  const itemsWithLikes = items.filter(hasLikes);

  if (itemsWithLikes.length > 0) {
    return itemsWithLikes.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, limit);
  }

  return items
    .filter(i => !!i.created_at)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export default null;
