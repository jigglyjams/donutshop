"use client"
import ShippingAddressForm from "@/components/Forms/ShippingAddress";
import { useCart } from "../context/CartContext";
import { useFetchEthToUsd } from "@/hooks/useFetchEthToUsd";
import ReceiptMockView from "@/components/ReceiptMockView";

export default function Checkout() {
  const { variant } = useCart();
  const { ethToUsd, refetch: refetchEthToUsd } = useFetchEthToUsd();

  return (
    <div className="w-full max-w-4xl justify-center mx-auto pt-12 font-mono px-16">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-sm ml-1">that there <span className="underline font-bold">{variant}</span> hat {"gon'"} look nice on ya!</p>
      <div className="mt-10 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="text-xs mb-3 text-amber-700">
            NOTE: we do not store or post your address on chain or in any database!!
            it is sent directly to <a href="https://printful.com" className="underline" rel="noreferrer" target="_blank">
            Printful
            </a> for order fulfillment.
          </div>
          <ShippingAddressForm />
        </div>
        <div className="md:w-1/3 space-y-12 border rounded-md md:-mt-28 pt-12 pb-20">
          <ReceiptMockView
            ethToUsd={ethToUsd}
            refetchEthToUsd={refetchEthToUsd}
          />
        </div>
      </div>
    </div>
  )
}