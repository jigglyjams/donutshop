import { customAlphabet } from "nanoid"
import { redis } from "@/lib/redis"
import { NextResponse } from "next/server"

export async function GET() {
  const nanoid = customAlphabet('1234567890abcdefghijkABCDEFGHJK', 10)
  const nonce = nanoid()
  await redis?.set(nonce, "1")
  try {
    return NextResponse.json({ nonce })
  } catch (error) {
    console.error("Error fetching shipping rates:", error)
    return NextResponse.json({ error: "Failed to fetch shipping rates" }, { status: 500 })
  }
}
