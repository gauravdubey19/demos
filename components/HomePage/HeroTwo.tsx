"use client";

import React from "react";
import { Button } from "../ui/button";
import VideoScroll from "./VideoScroll";

const HeroTwo: React.FC = () => {
  return (
    <section className="relative w-full h-[150vh] overflow-hidden">
      <div className="sticky inset-0 flex-between h-[calc(100vh-60px)]">
        <div className="vid1 relative h-full md:w-[30vw] lg:w-[35vw] overflow-hidden">
          <VideoScroll videoUrl="/macpro.mp4" />
        </div>

        <div className="midContainer set-sticky top-0 h-screen w-full md:w-[40vw] lg:w-[30vw] bg-primary flex-center transition-all ease-in-out duration-300">
          <div className="w-full h-full flex-center px-6">
            <MiddelContainor />
          </div>
        </div>

        <div className="vid2 relative h-full md:w-[30vw] lg:w-[35vw] overflow-hidden">
          <VideoScroll videoUrl="/macpro.mp4" />
        </div>
      </div>
    </section>
  );
};

export default HeroTwo;

const MiddelContainor = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: innerHeight, //- 59
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
