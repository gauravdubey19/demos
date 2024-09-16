"use client";
import Sidebar from "@/components/Profile/Sidebar";
import { ProfileParams } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage({ params, children }: ProfileParams) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
  return (
    <>
      <div className="h-[calc(100vh-60px)] mt-[60px] w-full flex gap-6 p-6 overflow-hidden">
        <Sidebar section={decodeURIComponent(params.section)} />
        {children}
      </div>
    </>
  );
}
