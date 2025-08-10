import { MenuItem } from "@/types/menu"

// Helper function to fetch menu categories
export async function getMenuCategories(): Promise<string[]> {
  try {
    const response = await fetch("/api/menu")
    const data = await response.json()
    return data.categories || []
  } catch (error) {
    console.error("Error fetching menu categories:", error)
    return []
  }
}

// Helper function to fetch menu items by category
export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  try {
    const response = await fetch(`/api/menu/category?category=${encodeURIComponent(category)}`)
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching menu by category:", error)
    return []
  }
}

// Helper function to fetch top menu items this month
export async function getTopMenuThisMonth(): Promise<MenuItem[]> {
  try {
    const response = await fetch("/api/menu/top-this-month")
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching top menu items:", error)
    return []
  }
}

// Helper function to capitalize first letter
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Helper function to generate category sections
export function generateCategorySections(categories: string[]) {
  return categories.map((category) => ({
    category,
    title: capitalizeFirstLetter(category),
    href: `/menu/${category}`
  }))
}
