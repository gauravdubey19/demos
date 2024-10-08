"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    // 1890
    const targetPosition = pathname === "/" ? 0 : 0;
    globalThis.scrollTo({ top: targetPosition, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const listenToScroll = () => {
      // 2500
      const hidden = pathname === "/" ? 500 : 500;
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
  }, [pathname]);

  return (
    <>
      <div className="relative z-50">
        {isVisible && (
          <div
            title="Scroll to Top"
            onClick={goToBtn}
            className="animate-slide-up fixed bottom-4 right-4 z-[999999] w-10 h-10 cursor-pointer flex-center bg-[#ffaf2465] backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300"
          >
            <FaArrowUp size={20} className="cursor-pointer" />
          </div>
        )}
      </div>
    </>
  );
}
