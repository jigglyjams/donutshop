import { toast } from "react-hot-toast";
import { AddressInfo } from "@/lib/printful/types";
import { usePayJuiceboxProject } from "@/hooks/usePayJuiceboxProject";
import { getTotalPriceInEth } from "@/lib/price";
import { useAccount } from "wagmi";
import { useState } from "react";
import Link from "next/link";

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

export default function SignAndPayButton(
  { recipient, ethToUsd, variant, loading }: {
    recipient: AddressInfo;
    ethToUsd: number | null;
    variant: string;
    loading: boolean;
  }
) {
  const { address, chainId } = useAccount();
  const { pay, isPending } = usePayJuiceboxProject({
    // sepolia
    // projectId: 38,
    // network: "sepolia",
    projectId: 477, // mainnet
    network: "mainnet",
    value: getTotalPriceInEth(ethToUsd || 0),
    callerAddress: address || "0x0",
    memo: "hat game hat game i can play the hat game 🧢",
  });

  const [txnHash, setTxnHash] = useState<string | null>(null);

  return (
    <div className="mt-4 flex flex-col space-y-4">
      <button
        className="w-full text-sm bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-md disabled:opacity-50 disabled:hover:bg-blue-800"
        disabled={!recipientFilled(recipient) || isPending || !ethToUsd || !address || loading}
        onClick={async () => {
          const payLoading = toast.loading("Signing...");

          // get nonce to validate request
          const nonceRequest = await fetch("/api/nonce");
          const { nonce } = await nonceRequest.json();
          console.log("nonce", nonce);

          try {
            const txnHash = await pay();
            if (txnHash) {
              setTxnHash(txnHash);
              console.log("hash", txnHash);
              toast.dismiss(payLoading);
              toast.success("Payment sent!");
              const txnLoading = toast.loading("Confirming transaction...");
              const order = await fetch("/api/printful/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ txnHash, recipient, variant, chainId, nonce }),
              });
              if (order.ok) {
                const data = await order.json();
                console.log("order", data);
                toast.dismiss(txnLoading);
                toast.success("Order placed!", { icon: "🍩" });
                // redirect to order page
                window.location.href = (`/order/${data.result.external_id}`);
              } else {
                toast.dismiss(txnLoading);
                const { error } = await order.json();
                toast.error("Failed to place order!");
                toast.error(`${error.substring(0, 100)}...`);
                console.error(error);
              }
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
      <div className={`${txnHash ? "visible" : "invisible"} font-bold text-left`}>
        transaction:
        <p>
          <Link
            className="underline text-purple-600"
            href={`https://etherscan.io/tx/${txnHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${txnHash?.substring(0, 10)}...${txnHash?.substring(60)}`}
          </Link>
        </p>
      </div>
    </div>
  )
}
