import { http, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains"; 
import { walletConnect, coinbaseWallet } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required");
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      projectId,
      showQrModal: false,
    }),
    coinbaseWallet(),
  ],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
  },
  ssr: true,
});
