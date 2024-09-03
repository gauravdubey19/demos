import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { CursorProvider } from "@/context/CursorProvider";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

const inter = Montserrat({ subsets: ["latin"] });

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
        <CursorProvider>
          <Navbar appName="LOGO" />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
