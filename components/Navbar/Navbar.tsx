"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { links } from "@/lib/data";
import { IoCart } from "react-icons/io5";
import MobileNav from "./MobileNav";
import { useCursor } from "@/context/CursorProvider";

const Navbar: React.FC<{ appName: string }> = ({ appName }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { showLeft, showRight } = useCursor();
  const visible = showLeft || showRight;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2.9 && pathname === "/") {
        setIsVisible(true);
      } else if (pathname !== "/") {
        setIsVisible(true);
      } else if (visible) {
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
  }, [pathname, visible]);

  useEffect(() => {
    if (navbarRef.current) {
      if (isVisible) {
        gsap.to(navbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(navbarRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }
  }, [isVisible]);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 z-[9999] h-[60px] w-full flex-between bg-white text-black p-2 px-3 md:p-4 lg:px-12 overflow-hidden shadow-lg transition-all"
      style={{ transform: "translateY(-100px)", opacity: 0 }}
    >
      <Link href="/" className="text-2xl lg:text-3xl font-black">
        {appName}
      </Link>
      <MobileNav />
      <nav className="hidden md:flex items-center gap-2 md:gap-4 lg:gap-8 text-md md:text-lg lg:text-xl font-normal">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={index}
              className={`capitalize cursor-pointer ${
                isActive
                  ? "text-primary font-semibold"
                  : "hover:border-b hover:border-b-primary active:translate-y-0.5"
              } ease-in-out duration-200`}
            >
              {link.head}
            </Link>
          );
        })}
        <div className="ml-2 flex gap-3">
          <Link
            href={"/#cart"}
            className="relative w-10 h-10 rounded-full border border-[#D3D3D3] flex-center"
          >
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
            <IoCart size={25} className="fill-[#717171]" />
          </Link>
          <Link
            href={"/profile/personal-information"}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Image
              src="/assets/card.jpeg"
              alt="profile"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;