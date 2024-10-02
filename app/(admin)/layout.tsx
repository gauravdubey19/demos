import { GlobalProvider } from "@/context/GlobalProvider";

// upload things
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/testimonials/uploadthing/core";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <GlobalProvider>{children}</GlobalProvider>
    </main>
  );
}
