"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SocialsLogin from "./SocialsLogin";

const AuthContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  return (
    <div className="h-screen w-full flex bg-[#F5F5F5] relative">
      <div className="w-[40%] bg-[#f0d464]" />
      <div className="absolute h-full w-full bg-red flex items-center justify-center sm:p-11 xl:p-20 xl:px-40">
        <div className="relative h-full w-full flex md:flex-row flex-col sm:rounded-3xl bg-white shadow-2xl shadow-neutral-900 overflow-hidden">
          <div className="relative md:w-[50%] w-full h-full md:block hidden">
            <Image
              src="/textile.png"
              alt="Fall in Woods"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex flex-col p-5 items-end gap-5 justify-center">
              <h1 className="text-5xl italic text-primary font-semibold z-10">
                CSK Textiles
              </h1>
              <div className="h-[1px] bg-white w-full" />
            </div>
          </div>
          <div className="md:w-[50%] w-full h-full  flex flex-col items-start justify-center md:p-20 md:py-20 px-5">
            {/* <h2 className='text-3xl mb-8 font-semibold'>Login</h2>
                        <button className='w-full mb-4 py-3 px-6 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300'>
                            Login with Email
                        </button>
                        <button className='w-full py-3 px-6 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300'>
                            Login with Google
                        </button> */}
            {children}
            <SocialsLogin />
            <div className="flex w-full flex-row justify-center text-black items-center mt-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
