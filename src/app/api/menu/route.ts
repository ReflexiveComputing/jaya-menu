import { NextRequest, NextResponse } from "next/server"
import menuData from "@/lib/static/menu.json"

export async function GET(request: NextRequest) {
  try {
    // Get unique categories from menu data
    const categories = Array.from(
      new Set(
        menuData.flatMap((item) => item.category)
      )
    )

    return NextResponse.json({
      categories,
      count: categories.length
    })
  } catch (error) {
    console.error("Error fetching menu categories:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
