"use client"
import { useCart } from "@/app/context/CartContext";
import ProductImages, { VariantName } from "./ProductImages";
import { useFetchEthToUsd } from "@/hooks/useFetchEthToUsd";

export const shipping = 3.99; // Flat shipping fee
export const price = 27
export const cryptoDiscount = 0.1
const getPriceInEth = (ethToUsd: number | null) => {
  if (!ethToUsd) return 0
  return ((price - price * cryptoDiscount) / ethToUsd)
}

export const getTotalPriceInEth = (ethToUsd: number | null) => {
  if (!ethToUsd) return 0
  return (((price - price * cryptoDiscount) + shipping) / ethToUsd)
}

export default function SingleProduct() {
  const { variant, setVariant } = useCart();
  const { ethToUsd } = useFetchEthToUsd();

  return (
    <div className="flex flex-col items-center pt-20 space-y-8">
      <h1 className="text-3xl font-mono font-bold">nance-wordart-5.png</h1>

      <ProductImages variant={variant} />
      <div className="font-mono">
        <h2 className="text-xl">${price.toFixed(2)}</h2>
        <p>or</p>
        <h2 className="text-lg">{ethToUsd ? getPriceInEth(ethToUsd).toFixed(6) : "0.------"} ETH</h2>
      </div>
      {/* Color select */}
      <div className="flex flex-col items-center font-mono">
        <label htmlFor="color-select" className="text-sm text-gray-700 mb-1">
          Select Color
        </label>
        <select
          id="color-select"
          value={variant}
          onChange={(e) => setVariant(e.target.value as VariantName)}
          className="appearance-none w-fit bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="navy">navy</option>
          <option value="gray">gray</option>
          <option value="stone">stone</option>
        </select>
      </div>
    </div>
  );
}
