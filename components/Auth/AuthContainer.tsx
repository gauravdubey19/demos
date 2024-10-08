"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SocialsLogin from "./SocialsLogin";
// import { useSession } from "next-auth/react";
// import { useGlobalContext } from "@/context/GlobalProvider";

const AuthContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  // const {token} = useGlobalContext();
  // useEffect(() => {
  //   console.log("token:", token);
  //   if (token) {
  //     window.location.href = "/";
  //   }
  // }, [token]);
  return (
    <div className="h-screen w-full flex bg-[#F5F5F5] relative">
      <div className="w-[40%] bg-[#f0d464]" />
      <div className="absolute h-full w-full bg-red flex items-center justify-center sm:p-11 xl:p-10 xl:px-40">
        <div className="relative h-full w-full flex md:flex-row flex-col sm:rounded-3xl bg-white shadow-2xl shadow-neutral-900 animate-slide-up overflow-hidden">
          <div className="relative md:w-[50%] w-full h-full md:block hidden">
            <Image
              src="/textile.png"
              alt="Fall in Woods"
              fill
              objectFit="cover"
            />
            <Image
              src="/logo.png"
              alt="LoGo"
              width={200}
              height={200}
              objectFit="cover"
              className="absolute top-4 left-4 w-28 h-28 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] overflow-hidden"
            />
            {/* <div className="absolute inset-0 flex flex-col p-5 items-end gap-5 justify-center">
              <h1 className="text-5xl italic text-primary font-semibold z-10">
                CSK Textiles
              </h1>
              <div className="h-[1px] bg-white w-full" />
            </div> */}
          </div>
          <div className="md:w-[50%] w-full h-full flex-center flex-col md:p-20 md:py-20 py-10 px-5">
            {children}
            <SocialsLogin />
            {/* <div className="flex w-full flex-row justify-center text-black items-center mt-4">
              {pathname === "/sign-up" ? (
                <>
                  Already have an account?
                  <Link
                    href="/sign-in"
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  Don{"'"}t have an account?
                  <Link
                    href="/sign-up"
                    className="ml-2 text-blue-500 hover:text-blue-700 hover-underline-lr"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
