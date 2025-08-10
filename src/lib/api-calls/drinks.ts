import { MenuItem } from "@/types/menu"

// Helper function to fetch drinks categories
export async function getDrinksCategories(): Promise<string[]> {
  try {
    const response = await fetch("/api/drinks")
    const data = await response.json()
    return data.categories || []
  } catch (error) {
    console.error("Error fetching drinks categories:", error)
    return []
  }
}

// Helper function to fetch drinks items by category
export async function getDrinksByCategory(category: string): Promise<MenuItem[]> {
  try {
    const response = await fetch(`/api/drinks/category?category=${encodeURIComponent(category)}`)
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching drinks by category:", error)
    return []
  }
}

// Helper function to fetch top drinks items this month
export async function getTopDrinksThisMonth(): Promise<MenuItem[]> {
  try {
    const response = await fetch("/api/drinks/top-this-month")
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching top drinks items:", error)
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
    href: `/drinks/${category}`
  }))
}
