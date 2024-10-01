"use client";

import React, { use, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { State, City } from "country-state-city";
import { InputFieldProps } from "@/lib/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Button } from "@/components/ui/button";
import { BiSolidEditAlt } from "react-icons/bi";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { ContactSection, PersonalSection } from "../Profile/Sections/MyProfile";

interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone_number?: string | null;
  };
}

interface User {
  firstName: string;
  lastName?: string;
  email: string;
  phone_number?: string;
  profile?: string;
  dateOfBirth?: Date;
  gender?: string;
  cart?: string[];
  orders?: string[];
  address?: string;
  city?: {
    name?: string;
    code?: string;
  };
  state?: {
    name?: string;
    code?: string;
  };
  zipCode?: string;
  country?: string;
}
interface DropdownProps {
  id: string;
  label: string;
  value: string | undefined;
  options: string[];
  isDisabled: boolean;
  setValue: (value: string) => void;
}
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
