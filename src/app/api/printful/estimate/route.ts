import { NextResponse } from "next/server"
import { getOrderCost } from "@/lib/printful"
import { variants } from "@/lib/printful/variants"

export async function POST (request: Request) {
  const { recipient } = await request.json()
  
  try {
    const response = await getOrderCost(recipient, [{...variants[0], quantity: 5}] )

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching shipping rates:", error)
    return NextResponse.json({ error: "Failed to fetch shipping rates" }, { status: 500 })
  }
}
