"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import Lenis from "lenis";

interface ScrollContextProps {
  scrollToSection: (index: number) => void;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    // smoothTouch: true,
    // smooth: true,

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleScroll = () => {
    if (lenisRef.current && sectionRefs.current.length > 0) {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight - 60; // h-[calc(100vh-60px)]

      sectionRefs.current.forEach((section, index) => {
        const sectionTop = index * viewportHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + viewportHeight) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          ref: (el: HTMLDivElement) => (sectionRefs.current[index] = el),
        })
      )}
    </ScrollContext.Provider>
  );
};
