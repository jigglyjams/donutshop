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
          <div className="-mt-6 text-xs mb-6 text-amber-700 bg-gray-200 p-3 rounded-lg">
            <h3 className="font-bold underline text-gray-700 mb-1">NOTE:</h3>
            <ol className="ml-2 list-decimal list-inside space-y-1">
              <li>
                We will never post your shipping address on chain
              </li>
              <li>
                Shipping information is sent directly to{" "}
                <a href="https://printful.com" className="underline text-blue-600 hover:text-blue-800" rel="noreferrer" target="_blank">
                  Printful
                </a>
              </li>
              <li>
                This site does not depend on any additional databases
              </li>
            </ol>
            <div className="mt-1">
              <a href="https://github.com/jigglyjams/donutshop" className="underline text-blue-600 hover:text-blue-800" rel="noreferrer" target="_blank">
                (github)
              </a>
            </div>
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