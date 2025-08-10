import { NextRequest, NextResponse } from "next/server"
import drinksData from "@/lib/static/drinks.json"

export async function GET(request: NextRequest) {
  try {
    // Get unique categories from drinks data
    const categories = Array.from(
      new Set(
        drinksData.flatMap((item) => item.category)
      )
    )

    return NextResponse.json({
      categories,
      count: categories.length
    })
  } catch (error) {
    console.error("Error fetching drinks categories:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
