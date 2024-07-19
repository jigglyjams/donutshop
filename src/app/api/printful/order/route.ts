import { NextResponse } from "next/server"
import { createOrder, getOrder } from "@/lib/printful"
import { variants } from "@/lib/printful/variants"
import { waitForTransactionReceipt } from "wagmi/actions"
import { config } from "@/lib/wagmi"

const colors = ["navy", "gray", "stone"] as const

export async function POST(request: Request) {
  const { recipient, variant, txnHash, chainId, nonce } = await request.json()
  console.log("recipient", recipient)
  console.log("variant", variant)
  console.log("txnHash", txnHash)
  console.log("chainId", chainId)

  // confirm txn hash
  if (!txnHash) {
    return NextResponse.json({ error: "Missing txn hash" }, { status: 400 })
  }
  const confirmed = await waitForTransactionReceipt(config, { hash: txnHash, chainId, confirmations: 1 })

  if (confirmed.status === "reverted") {
    return NextResponse.json({ error: "Transaction reverted" }, { status: 400 })
  }

  const variantIndex = colors.indexOf(variant)
  try {
    const response = await createOrder(recipient, [
      variants[variantIndex],
    ])
    console.dir(response, { depth: null })
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching shipping rates:", error)
    return NextResponse.json({ error: "Failed to fetch shipping rates" }, { status: 500 })
  }
}
