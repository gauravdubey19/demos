"use client";

import { useCursor } from "@/context/CursorProvider";
import { links } from "@/lib/data";
import Link from "next/link";
import React, { useState } from "react";
import MobileNav from "./MobileNav";

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
      <div className="sticky top-0 z-50 h-[70px] w-full flex-between bg-white text-black p-2 md:p-4 lg:p-6 overflow-hidden">
        <Link href="/" className="text-xl md:text-2xl lg:text-3xl font-black">
          {appName}
        </Link>
        <MobileNav />
        <nav className="hidden md:flex gap-2 md:gap-4 lg:gap-8 text-md md:text-lg lg:text-xl font-normal">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              onClick={() => setActive(link.head)}
              className={`capitalize cursor-pointer ${
                active === link.head
                  ? "text-primary font-semibold"
                  : " active:translate-y-0.5"
              } ease-in-out duration-200`}
            >
              <button onClick={() => handleHero(link.id)}>{link.head}</button>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
