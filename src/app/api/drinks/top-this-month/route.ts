import { NextRequest, NextResponse } from "next/server"
import drinksData from "@/lib/static/drinks.json"

export async function GET(request: NextRequest) {
  try {
    // Sort by likes in descending order and take top 3
    const topItems = drinksData
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3)
      // Shuffle the array for random order
      .sort(() => Math.random() - 0.5)

    return NextResponse.json({
      items: topItems,
      count: topItems.length
    })
  } catch (error) {
    console.error("Error fetching top drinks items:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
