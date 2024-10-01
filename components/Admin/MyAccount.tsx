"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContactSection, PersonalSection } from "../Profile/Sections/MyProfile";

const MyAccount = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="space-y-2 p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Hey! {session?.user?.name ? session?.user?.name : "Admin"}
          </h2>
          <p>Manage your account</p>
        </div>
        <div className="w-full h-[71vh] flex-1 p-2 md:p-4 bg-gray-50 space-y-4 md:space-y-6 overflow-y-scroll">
          <PersonalSection />
          <ContactSection />
        </div>
        <div className="flex justify-end p-2 md:p-4 gap-x-2 shadow-md">
          <Button
            className="font-bold text-sm md:text-base active:translate-y-0.5 border-red-500 text-red-500 bg-white border-1 border rounded-none hover:bg-red-600 hover:text-white"
            onClick={() => {
              localStorage.removeItem("jwt");
              signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
          {/* <Button
          variant="destructive"
          className="font-bold text-sm md:text-base rounded-none active:translate-y-0.5 hover:bg-red-600 "
          onClick={handleDeleteAccount}
        >
          Delete your Account
          </Button> */}
        </div>
      </section>
    </>
  );
};

export default MyAccount;
