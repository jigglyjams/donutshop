import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import SiteNav from "@/components/Site/Top";

const { VERCEL_PROJECT_PRODUCTION_URL } = process.env;
const METADATA_BASE = VERCEL_PROJECT_PRODUCTION_URL ? `https://${VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";
const METADATA_BASE_URL = new URL(METADATA_BASE);

export const metadata: Metadata = {
  title: "donut shop",
  description: "juicebox powered e-commerce",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: METADATA_BASE_URL,
  openGraph: {
    images: [
      {
        url: '/open-graph.png',
        alt: 'nance hat',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteNav />
          <Toaster
            containerStyle={{
              top: 80,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
