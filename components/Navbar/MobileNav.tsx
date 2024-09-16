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
import { IoCart } from "react-icons/io5";
import Cart from "./CartSheet";

const MobileNav = () => {
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
            <SheetTitle className="w-full flex justify-end gap-6">
              <SheetClose>
                <Cart />
              </SheetClose>
              <SheetClose>
                <Link
                  href={"/profile/personal-information"}
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
          )}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
