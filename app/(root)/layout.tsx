import { CursorProvider } from "@/context/CursorProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <CursorProvider>
        <Navbar appName="CSK" />
        {children}
        <Footer appName="CSK Textile" />
      </CursorProvider>
    </main>
  );
}
