import { CursorProvider } from "@/context/CursorProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/context/GlobalProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { CartProvider } from "@/context/CartProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
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
