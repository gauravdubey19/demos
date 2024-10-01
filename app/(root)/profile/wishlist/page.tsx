"use client";
import Wishlist from "@/components/Profile/Wishlist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();
  const { status } = useSession();
  // console.log("server session", status);

  if (status === "unauthenticated") router.push("/");
  return <Wishlist />;
}
