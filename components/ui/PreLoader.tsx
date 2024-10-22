"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Ribbon from "@/public/yellowRibbon.png"; // Ensure correct path to Ribbon image
import Logo from "@/public/logo.png"; // Ensure correct path to Logo image
import { useGlobalContext } from "@/context/GlobalProvider";
import { set } from "mongoose";

export default function PreLoader({
  className = "h-[120vh] fixed bottom-0 left-0 w-screen z-[99999]",
  text,
}: {
  className?: string;
  text?: string;
}) {
  const [progress, setProgress] = useState(0);
  const {preloaded,setPreloaded,hasAnimationCompleted, setHasAnimationCompleted} = useGlobalContext();
  useEffect(() => {
    if (preloaded) {
      setProgress(100);
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          // Generate a random increment between 1 and 10
          const randomIncrement = Math.floor(Math.random() * 10) + 1;
          // Ensure progress doesn't exceed 100
          return Math.min(prev + randomIncrement, 100);
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [preloaded]);

  useEffect(() => {
    if(preloaded) return;

    if (progress === 100) {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        gsap.to(preloader, {
            delay: 1,
          duration: 2,
          y: "-100vh",
          ease: "back.inOut",
          onComplete: () => {
            preloader.style.display = "none";
            setHasAnimationCompleted(true);
          },
        });
      }
      setPreloaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloaded, progress]);

  return (
    <div
      id="preloader"
      className={`flex flex-col bg-black text-white items-center ${className} fixed z-[99999] justify-end 
      ${
        hasAnimationCompleted && preloaded ? "hidden" : "flex"
      }
      `}
    >
      {/* Logo at the top */}
      <div className="flex flex-col items-center mt-14">
        <Image
          src={Logo} // Replace with the actual path to your logo
          alt="Company Logo"
          width={180}
          height={180}
          className="lg:w-[180px] w-[120px]"
        />
        <p className="text-xl font-dmSansSemiBold mt-6 animate-pulse">
          Loading{text && " " + text}...
        </p>
      </div>

      {/* Yellow ribbon with progress */}
      <div className="relative w-full h-auto overflow-hidden mt-6">
        {/* Black rectangle covering the ribbon */}
        <div
          className="absolute top-0 right-0 z-10 h-full bg-black transition-all duration-300 ease-linear"
          style={{ width: `${100 - progress}%` }} // Moves the black cover as progress increases
        ></div>

        {/* Yellow ribbon image */}
        <Image
          src={Ribbon}
          alt="Loading Ribbon"
          className="object-center object-fill h-full w-full opacity-60"
        />
      </div>

      {/* Progress percentage */}
      <div className="text-[2.5rem] sm:text-[4rem] lg:text-[6rem] font-semibold font-cinzelBold mt-10 z-20 mx-auto animate-pulse">
        {progress}%
      </div>
    </div>
  );
}