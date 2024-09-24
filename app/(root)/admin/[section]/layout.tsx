import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileAdminParams } from "@/lib/types";
import { adminSections } from "@/lib/section";
import Sidebar from "@/components/Profile/Sidebar";

export default async function ProfilePage({
  params,
  children,
}: ProfileAdminParams) {
  const session = await getServerSession();
  // if (!session) {
  //   redirect("/sign-in");
  // }
  return (
    <>
      <div className="h-screen w-full flex gap-2 overflow-hidden">
        <Sidebar
          section={decodeURIComponent(params.section)}
          sections={adminSections}
        />
        {children}
      </div>
    </>
  );
}
