import { CursorProvider } from "@/context/CursorProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/context/GlobalProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { CartProvider } from "@/context/CartProvider";

// upload things
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/testimonials/uploadthing/core";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <GlobalProvider>
        <CartProvider>
          <CursorProvider>
            <Navbar appName="CSK" />
            {children}
            <ScrollToTop />
            <Footer appName="CSK Textile" />
          </CursorProvider>
        </CartProvider>
      </GlobalProvider>
    </main>
  );
}
