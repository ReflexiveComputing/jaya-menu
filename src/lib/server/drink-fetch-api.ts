import "server-only";

import type { MenuItemFull } from "@/types/menu";
import { Category } from "@/types/menu";



const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8443/v1/api'




export async function fetchDrinkCategoriesFromApi(): Promise<Category[]> {
  // Try fetching categories from the backend API. If anything goes wrong,
  // fall back to the static categories bundled with the app.
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/drink-categories`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error('fetchDrinkCategoriesFromApi: network response not ok', res.status, res.statusText);
      return [];
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: Category[] }
    if (payload && payload.success && Array.isArray(payload.data)) {
      return payload.data as Category[];
    }

    console.error('fetchDrinkCategoriesFromApi: unexpected payload', payload);
    return [];
  } catch (err) {
    console.error('fetchDrinkCategoriesFromApi: error fetching categories', err);
    return [];
  }
}

export async function fetchDrinkCategoryItemsFromApi(categoryName: string, locale?: string): Promise<MenuItemFull[]> {
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/menu-items/full/drink-category/${encodeURIComponent(categoryName)}`;
    const res = await fetch(url, {
       next: { revalidate: 60 },
       headers: {
        'Accept-Language': locale || 'en',
      }, 
      });
    if (!res.ok) {
      console.error('fetchDrinkCategoryItemsFromApi: network response not ok', res.status, res.statusText);
      return [];
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: MenuItemFull[] }
    if (payload && payload.success && Array.isArray(payload.data)) {
      return payload.data as MenuItemFull[];
    }

    console.error('fetchDrinkCategoryItemsFromApi: unexpected payload', payload);
    return [];
  } catch (err) {
    console.error('fetchDrinkCategoryItemsFromApi: error fetching category items', err);
    return [];
  }
}

export async function fetchMenuItemFromApi(locale?: string): Promise<MenuItemFull | null> {
  const itemList = [5,10,11,12]
  const id = itemList[Math.floor(Math.random() * itemList.length)]; // Special item ID
  try {
    const url = `${BACKEND.replace(/\/$/, '')}/menu-items/full?id=${id}`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': locale || 'en',
      },
    });
    if (!res.ok) {
      console.error('fetchMenuItemFromApi: network response not ok', res.status, res.statusText);
      return null;
    }

    const payload = await res.json();
    // expected shape: { success: boolean, data: MenuItemFull }
    if (payload && payload.success && payload.data) {
      return payload.data as MenuItemFull;
    }

    console.error('fetchMenuItemFromApi: unexpected payload', payload);
    return null;
  } catch (err) {
    console.error('fetchMenuItemFromApi: error fetching item', err);
    return null;
  }
}



