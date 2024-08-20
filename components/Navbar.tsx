"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCursor } from "@/context/CursorProvider";
import { links } from "@/lib/data";
import MobileNav from "./MobileNav";
import { IoCart } from "react-icons/io5";
import Image from "next/image";

const Navbar: React.FC<{ appName: string }> = ({ appName }) => {
  const [active, setActive] = useState<string>(links[0].head);
  const { showTxt, setShowTxt, showVideo, setShowVideo } = useCursor();
  const handleHero = (id: number) => {
    if (id === 1) {
      setShowTxt(true);
      if (showVideo) setShowVideo(false);
    } else if (id === 2) {
      if (showTxt) setShowTxt(false);
      setShowVideo(true);
    } else {
      setShowTxt(false);
      setShowVideo(false);
    }
  };
  return (
    <>
      {/* shadow-[0_0_5px_black] */}
      <div className="sticky top-0 z-[9999] h-[60px] w-full flex-between bg-white text-black p-2 px-3 md:p-4 lg:p-6 overflow-hidden">
        <Link href="/" className="text-2xl lg:text-3xl font-black">
          {appName}
        </Link>
        <MobileNav />
        <nav className="hidden md:flex items-center gap-2 md:gap-4 lg:gap-8 text-md md:text-lg lg:text-xl font-normal">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              onClick={() => setActive(link.head)}
              className={`capitalize cursor-pointer ${
                active === link.head
                  ? "text-primary font-semibold"
                  : "hover:border-b hover:border-b-primary active:translate-y-0.5"
              } ease-in-out duration-200`}
            >
              <button onClick={() => handleHero(link.id)}>{link.head}</button>
            </Link>
          ))}
          <div className="ml-2 flex gap-3">
            <Link
              href={"/#cart"}
              className="relative w-10 h-10 rounded-full border border-[#D3D3D3] flex-center"
            >
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
              <IoCart size={25} className="fill-[#717171]" />
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/assets/card.jpeg"
                alt="profile"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
