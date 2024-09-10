import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const inter = Montserrat({ subsets: ["latin"] });
// This is a testing comment if my code is pushed or not ~Ashri

export const metadata: Metadata = {
  title: "CSK Textile",
  description:
    "CSK Textile is a leading provider of high-quality textile products, known for our commitment to excellence and innovation in the industry. We specialize in producing a wide range of fabrics and materials that meet the diverse needs of our customers. With a focus on sustainability and advanced technology, CSK Textile delivers premium solutions that combine durability, comfort, and style. Whether you’re looking for custom designs or bulk orders, our experienced team is dedicated to delivering exceptional products that set the standard in the textile market.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
