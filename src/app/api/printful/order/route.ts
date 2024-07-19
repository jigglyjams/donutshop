import { NextResponse } from "next/server"
import { createOrder } from "@/lib/printful"
import { variants } from "@/lib/printful/variants"
import { waitForTransactionReceipt } from "wagmi/actions"
import { config } from "@/lib/wagmi"
import { redis } from "@/lib/redis"

const colors = ["navy", "gray", "stone"] as const

export async function POST(request: Request) {
  try {
    const { recipient, variant, txnHash, chainId, nonce } = await request.json()
    console.log("recipient", recipient)
    console.log("variant", variant)
    console.log("txnHash", txnHash)
    console.log("chainId", chainId)

    // confirm txn hash
    if (!txnHash) return NextResponse.json({ error: "Missing txn hash" }, { status: 400 })

    const confirmed = await waitForTransactionReceipt(config, { hash: txnHash, chainId, confirmations: 1 })

    console.log("nonce", nonce)
    console.log("confirmed", confirmed)

    if (confirmed.status === "reverted") return NextResponse.json({ error: "Transaction reverted" }, { status: 400 })

    // validate nonce
    const valid = await redis?.get(nonce)
    if (!valid) {
      return NextResponse.json({ error: "Invalid nonce" }, { status: 400 })
    }

    const variantIndex = colors.indexOf(variant)
    // try {
    const response = await createOrder(
      recipient,
      [variants[variantIndex]],
      `donut-${nonce}`
    )
    if (response.result) {
      redis?.set(nonce, txnHash)
    }
    console.dir(response, { depth: null })
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching shipping rates:", error)
    return NextResponse.json({ error: `Failed to place order: ${error}` }, { status: 500 })
  }
}
