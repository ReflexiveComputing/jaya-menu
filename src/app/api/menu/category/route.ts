import { NextRequest, NextResponse } from "next/server"
import menuData from "@/lib/static/menu.json"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      )
    }

    // Filter items by category
    let filteredItems = menuData.filter((item) =>
      item.category.includes(category.toLowerCase())
    )

    // If less than 2 items, add 3 random items from the entire menu
    if (filteredItems.length < 2) {
      const remainingItems = menuData.filter(
        (item) => !filteredItems.some((filtered) => filtered.id === item.id)
      )
      const randomItems = remainingItems
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      filteredItems = [...filteredItems, ...randomItems]
    }

    return NextResponse.json({
      items: filteredItems,
      category,
      count: filteredItems.length
    })
  } catch (error) {
    console.error("Error fetching menu by category:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
