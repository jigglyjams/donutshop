import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import SiteNav from "@/components/Site/Top";

export const metadata: Metadata = {
  title: "donut shop",
  description: "juicebox powered e-commerce",
  icons: {
    icon: "/favicon.ico",
  },
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
