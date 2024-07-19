import { AddressInfo } from "@/lib/printful/types";
import PriceBreakdown from "./PriceBreakdown"
import SignAndPayButton from "./SignAndPayButton"
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function ReceiptMockView({
  ethToUsd,
  refetchEthToUsd,
  recipient,
  variant,
} : {
  ethToUsd: number | null;
  refetchEthToUsd: () => void;
  recipient: AddressInfo;
  variant: string;
}) {

  const [ loading, setLoading ] = useState(false);

  const refetch = async () => {
    setLoading(true);
    refetchEthToUsd();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  }

  return (
    <div className={`${loading ? "animate-pulse" : ""}`}>
      <div className="flex flex-row pb-1 mb-4 px-6">
        <div className="flex flex-grow items-center border-b space-x-1">
          <h2 className="text-xl font-semibold mb-1">
            Total Cost
          </h2>
          <button
            className="hover:cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-full"
            onClick={() => refetch()}
          >
            <ArrowPathIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      <PriceBreakdown ethToUsd={ethToUsd} />
      <div className="flex flex-col text-xs text-center items-center mt-12">
        <div>{"#".repeat(30)}</div>
        <div>{"#".repeat(30)}</div>
        <div className="w-3/4 my-2">
          <SignAndPayButton recipient={recipient} ethToUsd={ethToUsd} variant={variant} loading={loading} />
        </div>
        <div className="text-[10px] mt-1">Keep this receipt for your records</div>
        <div className="mt-6">Thanks for shopping with us!</div>
        <div className="text-3xl mt-2">{"☺".repeat(10)}</div>
        <div className="mt-10">{"#=%=".repeat(7)}</div>
        <div>{"#".repeat(30)}</div>
        <div>{"#".repeat(30)}</div>
      </div>
    </div>
  )
}
