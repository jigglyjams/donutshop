import { customAlphabet } from "nanoid"
import { NextResponse } from "next/server"
import { secretHash } from "@/lib/hmac"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function GET() {
  const nanoid = customAlphabet("23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", 20)
  const id = nanoid()
  const idHash = secretHash(id)
  try {
    return NextResponse.json({ id, idHash })
  } catch (error) {
    console.error("Error fetching shipping rates:", error)
    return NextResponse.json({ error: "Failed to fetch shipping rates" }, { status: 500 })
  }
}
