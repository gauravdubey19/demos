import { CursorProvider } from "@/context/CursorProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/context/GlobalProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <GlobalProvider>
        <CursorProvider>
          <Navbar appName="CSK" />
          {children}
          <ScrollToTop />
          <Footer appName="CSK Textile" />
        </CursorProvider>
      </GlobalProvider>
    </main>
  );
}
