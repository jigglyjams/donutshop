import { NextRequest, NextResponse } from "next/server"
import { createOrder, getOrder } from "@/lib/printful"
import { ORDER_PREFIX, variants } from "@/lib/printful/constants"
import { waitForTransactionReceipt, getTransaction } from "wagmi/actions"
import { config } from "@/lib/wagmi"
import { decodeFunctionData } from "viem"
import { abi } from "@/lib/juicebox"
import { secretHash } from "@/lib/hmac"

const colors = ["navy", "gray", "stone"] as const

export async function POST(request: NextRequest) {
  try {
    const { recipient, variant, txnHash, chainId, orderId } = await request.json()
    console.log("recipient", recipient)
    console.log("variant", variant)
    console.log("txnHash", txnHash)
    console.log("chainId", chainId)
    console.log("orderId", orderId)

    // confirm txn hash
    if (!txnHash) return NextResponse.json({ error: "Missing txn hash" }, { status: 400 })

    const confirmed = await waitForTransactionReceipt(config, { hash: txnHash, chainId, confirmations: 1 })
    if (confirmed.status === "reverted") return NextResponse.json({ error: "Transaction reverted" }, { status: 400 })

    const { input } = await getTransaction(config, { hash: txnHash, chainId })

    // get orderId from pay memo
    const _memo = decodeFunctionData({abi, data: input}).args[6]
    const orderIdHashFromMemo = _memo.split(ORDER_PREFIX)[1]
    console.log("hashMemo", secretHash(orderId))
    if (secretHash(orderId) !== orderIdHashFromMemo) return NextResponse.json({ error: "Invalid nonce" }, { status: 400 })

    // check orderId hasn't been used
    const { result } = await getOrder({ id: `${ORDER_PREFIX}${orderId}` })
    if (result) return NextResponse.json({ error: "Order already exists" }, { status: 400 })

    const variantIndex = colors.indexOf(variant)
    const response = await createOrder(
      recipient,
      [variants[variantIndex]],
      `${ORDER_PREFIX}${orderId}`
    )

    console.dir(response, { depth: null })
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error placing order:", error)
    return NextResponse.json({ error: `Failed to place order: ${error}` }, { status: 500 })
  }
}
