import "server-only";

import type { MenuItemFull } from "@/types/menu";
import { Category } from "@/types/category";



const BACKEND = process.env.BACKEND_REST_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8443/v1/api'




export async function fetchMenuCategoriesFromApi(): Promise<Category[]> {
  // Try fetching categories from the backend API. If anything goes wrong,
  // fall back to the static categories bundled with the app.
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/categories`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error('fetchMenuCategoriesFromApi: network response not ok', res.status, res.statusText);
      return [];
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: Category[] }
    if (payload && payload.success && Array.isArray(payload.data)) {
      return payload.data as Category[];
    }

    console.error('fetchMenuCategoriesFromApi: unexpected payload', payload);
    return [];
  } catch (err) {
    console.error('fetchMenuCategoriesFromApi: error fetching categories', err);
    return [];
  }
}

export async function fetchMenuCategoryItemsFromApi(categoryName: string): Promise<MenuItemFull[]> {
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/menu-items/full/category/${encodeURIComponent(categoryName)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error('fetchMenuCategoryItemsFromApi: network response not ok', res.status, res.statusText);
      return [];
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: MenuItemFull[] }
    if (payload && payload.success && Array.isArray(payload.data)) {
      return payload.data as MenuItemFull[];
    }

    console.error('fetchMenuCategoryItemsFromApi: unexpected payload', payload);
    return [];
  } catch (err) {
    console.error('fetchMenuCategoryItemsFromApi: error fetching category items', err);
    return [];
  }
}

export async function fetchFullMenuItemById(id: number): Promise<MenuItemFull | null> {
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/menu-items/full?id=${encodeURIComponent(String(id))}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error('fetchFullMenuItemById: network response not ok', res.status, res.statusText);
      return null;
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: MenuItemFull }
    if (payload && payload.success && payload.data) {
      return payload.data as MenuItemFull;
    }

    console.error('fetchFullMenuItemById: unexpected payload', payload);
    return null;
  } catch (err) {
    console.error('fetchFullMenuItemById: error fetching item', err);
    return null;
  }
}

