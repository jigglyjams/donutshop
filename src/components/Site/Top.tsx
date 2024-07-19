"use client"
import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center h-16 bg-white text-black border-b" role="navigation">
      <div className="pl-6">
        <Link href="/">
          <Image
            src="/doughnut.png"
            alt="Donut Shop"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className="flex items-center pr-8">
        <ConnectKitButton />
        {/* <div className="ml-5 flex items-center">
          <ShoppingCartIcon className="h-7 w-7 text-blue-800" />
          <div className="ml-1 bg-blue-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </div>
        </div> */}
      </div>
    </nav>
  );
}
