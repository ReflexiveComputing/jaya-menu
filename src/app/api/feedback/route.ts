import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rating, category, details } = body

    // Validate required fields
    if (!rating || !category || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Log the feedback (in a real app, you'd save to database)
    console.log("Feedback submitted:", {
      rating,
      category,
      details,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
