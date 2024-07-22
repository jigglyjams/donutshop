import { cryptoDiscount, price, shipping } from "@/lib/price";

export default function PriceBreakdown({ ethToUsd }: { ethToUsd: number | null }) {
  
  const total = price - (cryptoDiscount * price) + shipping;

  return (
    <div className="px-6">
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
        <div className="text-[9px] font-normal">source:&nbsp;
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://api.coinbase.com/v2/prices/ETH-USD/spot">
              api.coinbase.com
          </a>
        </div>
      </div>
    </div>
  );
};
