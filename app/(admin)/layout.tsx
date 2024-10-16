import type { Metadata } from "next";
import { GlobalProvider } from "@/context/GlobalProvider";

export const metadata: Metadata = {
  title: "CSK Textile - Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <GlobalProvider>{children}</GlobalProvider>
    </main>
  );
}
