import "server-only"
import { MenuItem } from "@/types/menu"
import menuData from "@/lib/static/menu.json"

const TEN_MINUTES = 600

// Get the base URL for server-side requests
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://192.168.178.35:3000/'
}

async function safeFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl()
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  
  const res = await fetch(fullUrl, {
    ...init,
    // Force cache within the revalidate window
    next: { revalidate: TEN_MINUTES, ...(init?.next || {}) },
  })
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${fullUrl}`)
  return res.json()
}

export async function fetchMenuCategories(): Promise<string[]> {
  try {
    const data = await safeFetch<{ categories: string[] }>("/api/menu", {
      next: { tags: ["menu:categories"] },
    })
    return data.categories || []
  } catch (error) {
    console.warn("API fetch failed, falling back to static data:", error)
    // Fallback to static data
    const categories = [...new Set(menuData.map(item => item.category).flat())]
    return categories
  }
}

export async function fetchMenuCategoryItems(category: string): Promise<MenuItem[]> {
  try {
    const data = await safeFetch<{ items: MenuItem[] }>(
      `/api/menu/category?category=${encodeURIComponent(category)}`,
      { next: { tags: [`menu:category:${category}`] } }
    )
    return data.items || []
  } catch (error) {
    console.warn("API fetch failed, falling back to static data:", error)
    // Fallback to static data
    return menuData.filter(item => item.category.includes(category)) as MenuItem[]
  }
}

export async function fetchMenuTopThisMonth(limit = 3): Promise<MenuItem[]> {
  try {
    const data = await safeFetch<{ items: MenuItem[] }>(
      "/api/menu/top-this-month",
      { next: { tags: ["menu:top"] } }
    )
    const items = data.items || []
    return items.slice(0, limit)
  } catch (error) {
    console.warn("API fetch failed, falling back to static data:", error)
    // Fallback to static data
    const topItems = menuData
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit)
    return topItems as MenuItem[]
  }
}