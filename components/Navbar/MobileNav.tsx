"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/lib/data";
import { Turn as Hamburger } from "hamburger-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./CartSheet";
import { CategoriesListProps } from "./Navbar";
import ReactCountUp from "../ui/ReactCountUp";
import { GoHeart } from "react-icons/go";
import { DialogTitle } from "@radix-ui/react-dialog";

const MobileNav: React.FC<CategoriesListProps> = ({ categories }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleMenuClick = () => setOpen(!isOpen);

  const handleLinkClick = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 770) {
      setOpen(false);
    }
  }, [windowWidth]);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div onClick={handleMenuClick} className="">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              size={28}
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="top-[3.7rem] backdrop-blur-sm bg-white/20 z-50 border-none outline-none p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          closeIcon={false}
        >
          {session?.user && (
            <DialogTitle>
              <SheetTitle className="w-full h-fit flex justify-end gap-6">
                <SheetClose>
                  <Link href="/profile/wishlist" className="relative mr-1">
                    <GoHeart
                      size={25}
                      color="black"
                      className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
                    />
                    <ReactCountUp
                      className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
                      amt={10}
                      // amt={fav?.length}
                    />
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Cart />
                </SheetClose>
                <SheetClose>
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
                      className="w-full h-full rounded-full overflow-hidden"
                    />
                  </Link>
                </SheetClose>
              </SheetTitle>
            </DialogTitle>
          )}
          <div className="relative w-full h-[calc(100vh-80px)]">
            <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
              {links.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <div
                    key={index}
                    className="cursor-pointer z-50"
                    onClick={handleLinkClick}
                  >
                    <SheetClose>
                      <Link
                        href={link.href}
                        className={`w-full capitalize text-2xl font-semibold ${
                          isActive
                            ? "text-primary font-semibold"
                            : "text-white active:translate-y-0.5 w-fit hover-underline-lr"
                        }`}
                      >
                        {link.head}
                      </Link>
                    </SheetClose>
                  </div>
                );
              })}
            </div>
            <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
              {categories.slice(0, 5).map((link, index) => {
                const isActive = pathname === `/products/${link.slug}`;

                return (
                  <div
                    key={index}
                    className="cursor-pointer z-50"
                    onClick={handleLinkClick}
                  >
                    <SheetClose>
                      <Link
                        href={`/products/${link.slug}`}
                        className={`w-full capitalize text-2xl font-semibold ${
                          isActive
                            ? "text-primary font-semibold"
                            : "text-white active:translate-y-0.5 w-fit hover-underline-lr"
                        }`}
                      >
                        {link.title}
                      </Link>
                    </SheetClose>
                  </div>
                );
              })}
            </div>
            {!session?.user && (
              <div className="absolute bottom-3 left-0 right-0">
                <Link
                  href={"/sign-in"}
                  className="capitalize cursor-pointer flex-center text-xl font-semibold p-2 rounded ring-1 ring-primary shadow-md text-white bg-primary"
                >
                  login
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
