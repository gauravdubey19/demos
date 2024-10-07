"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import gsap from "gsap";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

interface CursorContextType {
  cursorRef: React.RefObject<HTMLDivElement>;
  leftRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
  activeElement: string | null;
  setActiveElement: React.Dispatch<React.SetStateAction<string | null>>;
  showLeft: boolean;
  setShowLeft: React.Dispatch<React.SetStateAction<boolean>>;
  showRight: boolean;
  setShowRight: React.Dispatch<React.SetStateAction<boolean>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const back = backRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 1,
          ease: "back.out",
        });
      }
    };

    const handleMouseEnter = (target: HTMLDivElement) => {
      if (cursor) {
        switch (target) {
          case left:
            setActiveElement("left");
            break;
          case right:
            setActiveElement("right");
            break;
          case back:
            setActiveElement("back");
            break;
        }
        gsap.to(cursor, { scale: 5 });
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        setActiveElement(null);
        gsap.to(cursor, { scale: 1 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    left?.addEventListener("mouseenter", () => handleMouseEnter(left));
    right?.addEventListener("mouseenter", () => handleMouseEnter(right));
    back?.addEventListener("mouseenter", () => handleMouseEnter(back));

    left?.addEventListener("mouseleave", handleMouseLeave);
    right?.addEventListener("mouseleave", handleMouseLeave);
    back?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      left?.removeEventListener("mouseenter", () => handleMouseEnter(left));
      right?.removeEventListener("mouseenter", () => handleMouseEnter(right));
      back?.removeEventListener("mouseenter", () => handleMouseEnter(back));

      left?.removeEventListener("mouseleave", handleMouseLeave);
      right?.removeEventListener("mouseleave", handleMouseLeave);
      back?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showLeft, showRight]);

  return (
    <CursorContext.Provider
      value={{
        cursorRef,
        leftRef,
        rightRef,
        backRef,
        activeElement,
        setActiveElement,
        showLeft,
        setShowLeft,
        showRight,
        setShowRight,
      }}
    >
      {children}
      <div
        ref={cursorRef}
        className={`hidden lg:flex-center fixed left-0 top-0 w-0 h-0 rounded-full flex-center bg-gray-950/90 backdrop-blur-md select-none text-[3px] text-white text-balance font-medium pointer-events-none ${
          activeElement ? "p-2" : ""
        }`}
      >
        {activeElement === "left" && !showLeft && (
          <>
            <span>3D Text</span>
            <IoArrowBackSharp
              size={8}
              className="absolute -left-[7.2px] top-[3.5px]"
            />
          </>
        )}
        {activeElement === "right" && !showRight && (
          <>
            <span>Ready Made</span>
            <IoArrowForwardSharp
              size={8}
              className="absolute -right-[7.2px] top-[3.5px]"
            />
          </>
        )}
        {activeElement === "back" && (
          <>
            <span>Swipe Back</span>
            {!showLeft ? (
              <IoArrowForwardSharp
                size={8}
                className="absolute -right-[7.2px] top-[3.5px]"
              />
            ) : (
              <IoArrowBackSharp
                size={8}
                className="absolute -left-[7.2px] top-[3.5px]"
              />
            )}
          </>
        )}
      </div>
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
