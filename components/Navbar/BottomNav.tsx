"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import { HiOutlineHome } from "react-icons/hi2";
import { BsBoxSeam, BsBoxSeamFill } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import ReactCountUp from "../ui/ReactCountUp";
import Cart from "./CartSheet";
import Image from "next/image";

const BottomNav = () => {
  const pathname = usePathname(); // console.log("pathname :", pathname);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { favProducts } = useCart();

  useEffect(() => {
    if (pathname.includes("/admin")) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1 && pathname === "/") {
        setIsVisible(true);
      } else if (pathname !== "/") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (pathname.includes("/admin")) return;

  return (
    <>
      <div
        ref={bottomNavRef}
        className={`md:hidden fixed ${
          isVisible ? "bottom-0" : "-bottom-20"
        } left-0 right-0 z-50 w-full h-fit px-2 bg-white rounded-t-2xl drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ease-in-out duration-700 overflow-hidden`}
      >
        <div className="w-full h-full flex-between p-2">
          <Link href="/" className="rounded-lg">
            <HiOutlineHome
              size={25}
              className={pathname === "/" ? "fill-primary" : ""}
            />
          </Link>
          <Link href="/products" className="rounded-lg">
            <BsBoxSeam
              size={25}
              className={pathname === "/" ? "fill-primary" : ""}
            />
          </Link>
          {session?.user?.id && (
            <>
              <Link href="/profile/wishlist" className="relative mr-1">
                {pathname.includes("/profile/wishlist") ? (
                  <GoHeartFill
                    size={25}
                    color="#FF6464"
                    className="cursor-pointer"
                  />
                ) : (
                  <GoHeart
                    size={25}
                    color="black"
                    className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
                  />
                )}
                {favProducts.length > 0 && (
                  <ReactCountUp
                    className="absolute -top-2 -right-2 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
                    amt={favProducts.length}
                  />
                )}
              </Link>
              <Cart />
              <Link
                href={"/profile/my-profile"}
                className={`w-10 h-10 rounded-full ${
                  pathname.includes("/profile") && "border-2 border-primary"
                } overflow-hidden`}
              >
                <Image
                  src={session?.user?.image || "/profile.png"}
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full br overflow-hidden"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
