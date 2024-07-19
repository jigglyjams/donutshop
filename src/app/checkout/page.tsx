"use client"
import ShippingAddressForm from "@/components/Forms/ShippingAddress";
import { AddressInfo } from "@/lib/printful/types";
import { useCart } from "../context/CartContext";
import PriceBreakdown from "@/components/PriceBreakdown";
import { usePayJuiceboxProject } from "@/hooks/usePayJuiceboxProject";
import { useAccount, useChainId } from "wagmi";
import toast from "react-hot-toast";
import { useFetchEthToUsd } from "@/hooks/useFetchEthToUsd";
import { getTotalPriceInEth } from "@/components/SingleProduct";

const recipientFilled = (recipient: AddressInfo) => {
  return (
    recipient.name !== "" &&
    recipient.address1 !== "" &&
    recipient.city !== "" &&
    recipient.state_name !== "" &&
    recipient.state_code !== "" &&
    recipient.zip !== ""
  );
};

export default function Checkout() {
  const { variant, recipient, setRecipient } = useCart();
  const { ethToUsd, refetch: refetchEthToUsd } = useFetchEthToUsd();
  const { address } = useAccount();
  const chainId = useChainId();

  const { pay, isPending } = usePayJuiceboxProject({
    projectId: 38, // sepolia
    network: "sepolia",
    // projectId: 477, // mainnet
    value: getTotalPriceInEth(ethToUsd || 0),
    callerAddress: address || "0x0",
    memo: "hat game hat game i can play the hat game 🧢",
  });

  return (
    <div className="w-full max-w-4xl justify-center mx-auto pt-12 font-mono px-16">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-sm ml-1">that there <span className="underline font-bold">{variant}</span> hat {"gon'"} look nice on ya!</p>
      <div className="mt-10 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <ShippingAddressForm recipient={recipient} setRecipient={setRecipient} />
        </div>
        <div className="md:w-1/3 space-y-12 border rounded-md md:-mt-28 pt-12 pb-20">
          <PriceBreakdown ethToUsd={ethToUsd} refetchEthToUsd={refetchEthToUsd} />
          <div className="flex flex-col text-xs text-center items-center font-mono">
            <div>{"#".repeat(30)}</div>
            <div>{"#".repeat(30)}</div>
            <div className="font-bold mt-2">On Chain Copy</div>
            <div className="w-3/4 my-2">
              {/* Sign and Pay Button */}
              <button
                className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-md disabled:opacity-50 disabled:hover:bg-blue-800"
                disabled={!recipientFilled(recipient)}
                onClick={async () => {
                  const payLoading = toast.loading("Signing...");
                  try {
                    const order = await fetch("/api/printful/order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ txnHash:"", recipient, variant, chainId }),
                    });
                    const txnHash = await pay();
                    if (txnHash) {
                      console.log("hash", txnHash);
                      toast.dismiss(payLoading);
                      toast.success("Payment sent!");
                      const txnLoading = toast.loading("Waiting for confirmation...");
                    } else {
                      toast.dismiss(payLoading);
                      toast.error("Check network!");
                    }
                  } catch (e: any) {
                    toast.dismiss(payLoading);
                    toast.error(e.message.split("\n")[0]);
                  }
                }}
              >
                  Sign & Pay
              </button>
              {/* =================== */}
            </div>
            <div className="text-[10px] mt-1">Keep this receipt for your records</div>
            <div className="mt-6">Thanks for shopping with us!</div>
            <div className="text-3xl mt-2">{"☺".repeat(10)}</div>
            <div className="mt-6">{"#=%=".repeat(7)}</div>
            <div>{"=%=#".repeat(7)}</div>
            <div>{"#=%=".repeat(7)}</div>
            <div>{"#".repeat(30)}</div>
            <div>{"#".repeat(30)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}