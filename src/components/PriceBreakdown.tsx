import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { cryptoDiscount, price, shipping } from "@/lib/price";
import { useState } from "react";

export default function PriceBreakdown({
  ethToUsd,
  refetchEthToUsd,
}: {
  ethToUsd: number | null;
  refetchEthToUsd: () => void;
}) {
  
  const total = price - (cryptoDiscount * price) + shipping;

  const [ loading, setLoading ] = useState(false);

  const refetch = async () => {
    setLoading(true);
    refetchEthToUsd();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  }

  return (
    <div className="px-6">
      {/* <div className="text-xs font-bold">
        Date:
      </div>
      <div className="text-xs mb-4">{new Date().toISOString()}</div> */}
      <div className="flex flex-row items-center space-x-2 border-b pb-1 mb-2">
        <h2 className="text-xl font-semibold">
          Total Cost
        </h2>
        <button
          className="hover:cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-full"
          onClick={() => refetch()}
        >
          <ArrowPathIcon className={`h-4 w-4 inline-block ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
      <div className="flex justify-between">
        <span>Base Price:</span>
        <span>${price.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount:</span>
        <span>- ${(cryptoDiscount * price).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold mt-2 pt-2 border-t">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="text-right font-bold">
        {ethToUsd ? (total / ethToUsd).toFixed(6) : "0.------"} ETH
      </div>
    </div>
  );
};
