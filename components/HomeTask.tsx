"use client";

import React from "react";
import { useCursor } from "@/context/CursorProvider";
import ScrollVideo from "./ScrollVideo";

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

  const handleDragEndTxt = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowTxt(!showTxt);
  };
  const handleDragEndVid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowVideo(!showVideo);
  };

  return (
    <section
      className={`relative w-full flex ${
        !showVideo
          ? "h-screen overflow-hidden"
          : "overflow-y-scroll overflow-x-hidden"
      }`}
    >
      <div
        ref={txtRef}
        className={`h-full ${
          showVideo ? "w-0" : showTxt ? "w-full" : "w-[35%]"
        } bg-gray-400 transition-all ease-in-out duration-300`}
      >
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
      </div>
      <div
        className={`h-full ${
          showVideo || showTxt ? "w-0" : "w-[30%]"
        } bg-gray-600 transition-all ease-in-out duration-300 overflow-hidden`}
      />
      <div
        ref={vidRef}
        className={`relative h-full ${
          showVideo ? "w-full" : showTxt ? "w-0" : "w-[35%]"
        } bg-black transition-all ease-in-out duration-300`}
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
          className={`h-[350vh] w-full relative overflow-hidden`}
          playbackConst={0}
          videoUrl="/macpro.mp4"
          // videoUrl="https://assets.codepen.io/39255/output_960.mp4"
        />
      </div>
    </section>
  );
};

export default HomeTask;
