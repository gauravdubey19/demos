import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileAdminParams } from "@/lib/types";
import { profileSections } from "@/lib/section";
import Sidebar from "@/components/Profile/Sidebar";

export default async function ProfilePage({
  params,
  children,
}: ProfileAdminParams) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="h-[calc(100vh-60px)] mt-[60px] w-full flex gap-6 p-6 overflow-hidden">
        <Sidebar
          section={decodeURIComponent(params.section)}
          sections={profileSections}
        />
        {children}
      </div>
    </>
  );
}
