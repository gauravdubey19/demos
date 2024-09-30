import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Wishlist from "@/components/Profile/Wishlist";

export default async function WishlistPage() {
  const session = await getServerSession();
  // console.log(session);

  if (session) redirect("/");
  return <Wishlist />;
}
