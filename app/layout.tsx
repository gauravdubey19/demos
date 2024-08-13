import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorProvider } from "@/context/CursorProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test App",
  description: "Testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}
