import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionProviderC from "@/context/SessionProviderC";

// upload things
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { Toaster } from "@/components/ui/toaster";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSK Textile - High-Quality Sustainable Fabrics",
  description:
    "CSK Textile offers high-quality, sustainable fabrics and materials. Our innovative solutions combine durability, comfort, and style. Custom designs and bulk orders available.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="CSK Textile - High-Quality Sustainable Fabrics" />
        <meta property="og:description" content="CSK Textile offers high-quality, sustainable fabrics and materials. Our innovative solutions combine durability, comfort, and style. Custom designs and bulk orders available." />
        <meta property="og:image" content="/homePageImg.png" />
        <meta property="og:url" content="https://csk-demo.vercel.app" />
        
        <meta name="twitter:title" content="CSK Textile - High-Quality Sustainable Fabrics" />
        <meta name="twitter:description" content="CSK Textile offers high-quality, sustainable fabrics and materials. Our innovative solutions combine durability, comfort, and style. Custom designs and bulk orders available." />
        <meta name="twitter:image" content="/homePageImg.png" />
        <meta name="twitter:card" content="summary" />
      </head>
      <body className={inter.className}>
        <SessionProviderC>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster />
        </SessionProviderC>
      </body>
    </html>
  );
}