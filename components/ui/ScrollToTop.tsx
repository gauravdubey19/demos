"use client";

import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const listenToScroll = () => {
      const hidden = 500;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll > hidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (typeof globalThis !== "undefined") {
      globalThis.addEventListener("scroll", listenToScroll);
      return () => {
        globalThis.removeEventListener("scroll", listenToScroll);
      };
    }
  }, []);

  return (
    <>
      <div className="relative z-50">
        {isVisible && (
          <div
            title="Scroll to Top"
            onClick={goToBtn}
            className="animate-slide-up fixed bottom-4 right-4 w-10 h-10 cursor-pointer flex-center bg-[#ffaf2465] backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300"
          >
            <FaArrowUp size={20} className="cursor-pointer" />
          </div>
        )}
      </div>
    </>
  );
}
