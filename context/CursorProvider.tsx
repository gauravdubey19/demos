"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import gsap from "gsap";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

interface CursorContextType {
  cursorRef: React.RefObject<HTMLDivElement>;
  txtRef: React.RefObject<HTMLDivElement>;
  vidRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
  activeElement: string | null;
  setActiveElement: React.Dispatch<React.SetStateAction<string | null>>;
  showTxt: boolean;
  setShowTxt: React.Dispatch<React.SetStateAction<boolean>>;
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [showTxt, setShowTxt] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const txt = txtRef.current;
    const vid = vidRef.current;
    const back = backRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      // console.log("Mouse moved:", e.clientX, e.clientY);
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 1,
          ease: "back.out",
        });
      }
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLDivElement;
      if (cursor) {
        if (target === txt) {
          setActiveElement("txt");
        } else if (target === vid) {
          setActiveElement("vid");
        } else if (target === back) {
          setActiveElement("back");
        }
        // if (
        //   activeElement === "txt" ||
        //   activeElement === "vid" ||
        //   activeElement === "back"
        // ) {
        if (!showTxt || !showVideo || target === back) {
          gsap.to(cursor, { scale: 5 });
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        setActiveElement(null);
        gsap.to(cursor, { scale: 1 });
      }
    };

    // Adding event listeners if video is not shown
    document.addEventListener("mousemove", handleMouseMove);
    txt?.addEventListener("mouseenter", handleMouseEnter);
    txt?.addEventListener("mouseleave", handleMouseLeave);
    vid?.addEventListener("mouseenter", handleMouseEnter);
    vid?.addEventListener("mouseleave", handleMouseLeave);
    back?.addEventListener("mouseenter", handleMouseEnter);
    back?.addEventListener("mouseleave", handleMouseLeave);

    // Cleaning up event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      txt?.removeEventListener("mouseenter", handleMouseEnter);
      txt?.removeEventListener("mouseleave", handleMouseLeave);
      vid?.removeEventListener("mouseenter", handleMouseEnter);
      vid?.removeEventListener("mouseleave", handleMouseLeave);
      back?.removeEventListener("mouseenter", handleMouseEnter);
      back?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showTxt, showVideo]);

  return (
    <CursorContext.Provider
      value={{
        cursorRef,
        txtRef,
        vidRef,
        backRef,
        activeElement,
        setActiveElement,
        showTxt,
        setShowTxt,
        showVideo,
        setShowVideo,
      }}
    >
      {children}
      <div
        ref={cursorRef}
        className={`hidden lg:flex-center fixed left-0 top-0 w-0 h-0 rounded-full bg-gray-950/90 backdrop-blur-md select-none text-[3px] text-white text-balance font-medium ${
          activeElement ? "p-2" : ""
        }`}
      >
        {activeElement === "txt" && !showTxt && (
          <>
            <span>3D Text</span>
            <IoArrowBackSharp
              size={8}
              className="absolute -left-[7.2px] top-[3.5px]"
            />
          </>
        )}
        {activeElement === "vid" && !showVideo && (
          <>
            <span>Scroll Video</span>
            <IoArrowForwardSharp
              size={8}
              className="absolute -right-[7.2px] top-[3.5px]"
            />
          </>
        )}
        {activeElement === "back" && (
          <>
            <span>Swipe Back</span>
            {showTxt ? (
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
