"use client";

import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

interface TestimonialCardsI{
  file:any
}

const TestimonialCards = (
  { file }: TestimonialCardsI
) => {

  // console.log(file.key);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(true);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setIsHovering(false);
      }
    }
  };

  return (
    <div
      className="relative card md:w-[15rem] w-[13rem] h-[20rem] md:h-[25rem] rounded-xl overflow-hidden bg-white flex items-center justify-between flex-col transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 z-10 w-full h-full cursor-pointer flex items-center justify-center ${
          isHovering ? "shadow-none" : "shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
        }`}
        onClick={handleVideoClick}
      >
        {!isPlaying && <FaPlay className="text-primary text-4xl" />}
      </div>
      <video
        ref={videoRef}
        loop
        playsInline
        className="w-full h-full object-cover"
        onClick={handleVideoClick}
      >
        <source
          src={`https://utfs.io/f/${file?.key}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default TestimonialCards;
