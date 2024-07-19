"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { config } from "@/lib/wagmi";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
