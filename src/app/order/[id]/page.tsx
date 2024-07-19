"use client"
import { useParams } from "next/navigation"

export default function OrderPage() {
  const { id } = useParams();
  return (
    <div className="w-full max-w-4xl justify-center mx-auto pt-12 font-mono px-16 space-y-6">
      <h1 className="text-3xl font-bold">Your order has been received 🥳</h1>
      <p>{"You'll"} get email updates if you provided one during checkout</p>
      <p>Order id: <span className="underline">{id}</span></p>
      <p>Thanks for shopping with us!</p>
      <p className="text-3xl mt-2">{"☺".repeat(1008)}</p>
    </div>
  );
}
