import { GlobalProvider } from "@/context/GlobalProvider";

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
