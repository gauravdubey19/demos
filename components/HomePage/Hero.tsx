"use client";

import React, { useState, useEffect } from "react";
import { useCursor } from "@/context/CursorProvider";
import { Button } from "@/components/ui/button";
import ScrollVideo from "@/components/ui/ScrollVideo";
// import ParticlesImage from "../ui/ParticlesImageOld";

export default function Hero() {
  const {
    leftRef,
    rightRef,
    backRef,
    showLeft,
    setShowLeft,
    showRight,
    setShowRight,
  } = useCursor();

  const [isDraggable, setIsDraggable] = useState(false);
  const visible = showLeft || showRight;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2.9) {
        setIsDraggable(true);
      } else {
        setIsDraggable(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showLeft || showRight) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showLeft, showRight]);

  const handleDragEndTxt = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDraggable) setShowLeft(!showLeft);
  };

  const handleDragEndVid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDraggable) setShowRight(!showRight);
  };

  return (
    <>
      <section
        className={`${
          visible ? "h-screen" : "h-[400vh]"
        } bg-slate-500 overflow-hidden`}
      >
        <div className="w-full h-screen sticky top-0 flex-between overflow-hidden">
          <div
            ref={leftRef}
            className={`h-full ${
              showRight
                ? "w-0"
                : showLeft
                ? "w-full"
                : "w-0 md:w-[30vw] lg:w-[35vw]"
            }  transition-all ease-in-out duration-300 overflow-hidden`}
          >
            {!showLeft && <ScrollVideo videoUrl="/macpro.mp4" />}
            {!showLeft && (
              <div
                draggable={isDraggable}
                onDragEnd={handleDragEndTxt}
                className="absolute left-0 top-0 h-full w-[35%] z-50 bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
            )}
            {showLeft && (
              <div
                ref={backRef}
                onDragEnd={handleDragEndTxt}
                className="absolute right-0 top-0 h-full w-[35%] z-50 bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
            )}
          </div>

          <div
            className={`relative h-full bg-primary flex-center ${
              visible ? "w-0" : "w-full md:w-[40vw] lg:w-[30vw] px-6"
            } transition-all ease-in-out duration-300`}
          >
            {!visible && <MiddelContainor />}
          </div>

          <div
            ref={rightRef}
            className={`relative h-full bg-black ${
              showRight
                ? "w-full"
                : showLeft
                ? "w-0"
                : "w-0 md:w-[30vw] lg:w-[35vw]"
            } transition-all ease-in-out duration-300 overflow-hidden`}
          >
            {!showRight && <ScrollVideo videoUrl="/macpro.mp4" />}
            {!showRight && (
              <div
                draggable={isDraggable}
                onDragEnd={handleDragEndVid}
                className="absolute right-0 top-0 h-full w-full z-50 bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
            )}
            {showRight && (
              <div
                ref={backRef}
                onDragEnd={handleDragEndVid}
                className="absolute left-0 top-0 h-full w-[35%] z-50 bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
            )}
            {showRight && <RightContainor />}
          </div>
        </div>
      </section>
    </>
  );
}

const MiddelContainor = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: innerHeight * 3.91,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full flex-center flex-col gap-16 z-50">
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full h-[230px] flex items-end justify-center bg-white text-primary p-4">
          <div className="absolute md:-left-[6.8rem] top-7 gap-1 text-[90px] font-medium">
            <span className="md:text-white">Ex</span>
            <span className="">plore</span>
          </div>
          <span className="text-6xl lg:text-7xl font-light">Textiles</span>
        </div>
        <span className="w-full text-center text-balance text-[2rem] md:text-2xl lg:text-[2rem] font-light overflow-hidden">
          Textiles <span className="text-[#AA6C00] font-medium">&</span> Ready
          made
        </span>
      </div>
      <Button
        onClick={handleScrollDown}
        className="w-fit h-fit select-none bg-white text-primary text-xl font-semibold tracking-[6px] p-2 px-3 rounded-none hover:shadow-xl ease-in-out duration-300"
      >
        SHOP NOW
      </Button>
    </div>
  );
};

const RightContainor = () => {
  return (
    <div className="w-full h-full flex-between select-none -z-10">
      <div className="h-[calc(100vh-60px)] flex-center w-full bg-slate-900 mt-[60px] p-10">
        <div className="h-fit w-fit text-white space-y-4">
          <h2 className="text-8xl font-semibold">Welcom</h2>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
            odit.
          </p>
          <Button>Check Out Now</Button>
        </div>
      </div>
      <div className="h-[calc(100vh-60px)] w-full bg-black mt-[60px]">
        {/* <ParticlesImage img="/assets/rightImage.png" /> */}
      </div>
    </div>
  );
};
