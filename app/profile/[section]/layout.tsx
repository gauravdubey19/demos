import Sidebar from "@/components/Profile/Sidebar";
import { ProfileParams } from "@/lib/types";

export default function ProfilePage({ params, children }: ProfileParams) {
  return (
    <>
      <div className="h-[calc(100vh-60px)] w-full flex gap-6 p-6 overflow-hidden">
        <Sidebar section={decodeURIComponent(params.section)} />
        {children}
      </div>
    </>
  );
}
