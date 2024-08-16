"use client";

import React from "react";
import { useCursor } from "@/context/CursorProvider";
import ScrollVideo from "./ScrollVideo";
import Image from "next/image";

const HomeTask: React.FC = () => {
  const {
    txtRef,
    vidRef,
    backRef,
    showTxt,
    setShowTxt,
    showVideo,
    setShowVideo,
  } = useCursor();

  const visible = showTxt || showVideo;
  const handleDragEndTxt = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowTxt(!showTxt);
  };
  const handleDragEndVid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowVideo(!showVideo);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <section
      className={`relative w-full flex ${
        !showVideo
          ? "h-[calc(100vh-70px)] overflow-hidden"
          : "overflow-y-scroll overflow-x-hidden"
      }`}
    >
      <div
        ref={txtRef}
        className={`h-full ${
          showVideo ? "w-0" : showTxt ? "w-full" : "w-0 md:w-[30vw] lg:w-[35vw]"
        }  transition-all ease-in-out duration-300 overflow-hidden`}
      >
        <Image
          src="/assets/textlieThreeD.png"
          alt="3D Textile"
          width={400}
          height={600}
          className="w-full h-full object-center"
        />
        {!showTxt && (
          <div
            draggable
            onDragEnd={handleDragEndTxt}
            className="absolute left-0 top-0 h-full w-[35%] z-10 bg-transparent cursor-grab active:cursor-grabbing borde"
          ></div>
        )}
        {showTxt && (
          <div
            ref={backRef}
            draggable
            onDragEnd={handleDragEndTxt}
            className="absolute right-0 top-0 h-full w-[35%] z-10 bg-transparent cursor-grab active:cursor-grabbing borde"
          ></div>
        )}
        {/* {showTxt && (
          <div className="w-full h-full z-[1] select-none text-2xl bg-gray-400 flex-center">
            3D Text
          </div>
        )} */}
      </div>

      <div
        className={`h-full bg-primary flex-center ${
          visible ? "w-0" : "w-full md:w-[40vw] lg:w-[30vw] px-6"
        } transition-all ease-in-out duration-300`}
      >
        {!visible && (
          <div className="w-full flex-center flex-col gap-16 select-none">
            <div className="w-full flex flex-col gap-2">
              <div className="relative w-full h-[230px] flex items-end justify-center bg-white text-primary p-4">
                <div className="absolute md:-left-[6.51rem] top-7 gap-1 text-[90px] font-medium">
                  <span className="md:text-white">Ex</span>
                  <span className="">plore</span>
                </div>
                <span className="md:text-6xl lg:text-7xl font-light">
                  Textiles
                </span>
              </div>
              <span className="w-full text-center text-balance text-[2.18rem] font-extralight overflow-hidden">
                Textiles <span className="text-[#AA6C00]">&</span> Ready made
              </span>
            </div>
            <button
              onClick={handleScrollDown}
              className="w-fit h-fit bg-white text-primary text-xl font-semibold tracking-[6px] p-2 px-4"
            >
              SHOP NOW
            </button>
          </div>
        )}
      </div>
      <div
        ref={vidRef}
        className={`relative h-full ${
          showVideo ? "w-full" : showTxt ? "w-0" : "w-0 md:w-[30vw] lg:w-[35vw]"
        } transition-all ease-in-out duration-300`}
      >
        {!showVideo && (
          <div
            draggable
            onDragEnd={handleDragEndVid}
            // onClick={() => setShowVideo(!showVideo)}
            className="absolute right-0 top-0 h-full w-full z-10 bg-transparent cursor-grab active:cursor-grabbing borde"
          ></div>
        )}
        {showVideo && (
          <div
            ref={backRef}
            draggable
            onDragEnd={handleDragEndVid}
            className="absolute left-0 top-0 h-full w-[35%] z-10 bg-transparent cursor-grab active:cursor-grabbing borde"
          ></div>
        )}
        <ScrollVideo
          videoUrl="/macpro.mp4"
          // videoUrl="https://assets.codepen.io/39255/output_960.mp4"
        />
      </div>
    </section>
  );
};

export default HomeTask;
