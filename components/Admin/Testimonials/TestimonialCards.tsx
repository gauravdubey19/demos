
"use client";

import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Modal from "./TestimonialsModal";

interface TestimonialCardsI {
  file?: any;
}

const TestimonialCards = ({ file }: TestimonialCardsI) => {
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
      className="relative card md:w-[15rem] w-[13rem] h-[17rem] md:h-[20rem] rounded-xl overflow-hidden bg-white flex items-center justify-between flex-col transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center ${isHovering ? "shadow-none" : "shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
          }`}
        onClick={handleVideoClick}
      >
        {!isPlaying && <FaPlay className="text-primary text-4xl" />}
      </div>

      {/* Video section */}
      <div>
        <video
          ref={videoRef}
          loop
          playsInline
          className="w-full h-full object-cover"
          onClick={handleVideoClick}
        >
          <source
            src="https://utfs.io/f/bb148a99-c84d-4724-b614-ad5f3dd1e9d1-2usdhy.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* View Details button with animation */}
      <div
        className={`absolute bottom-[-100px] left-1/2 w-full h-20 bg-white flex items-center justify-center transform -translate-x-1/2 transition-all duration-500 ease-in-out z-50 ${isHovering ? "translate-y-[-100%]" : "translate-y-0"
          }`}
      >
        {/* <button className="px-4 py-2 underline text-blue-500 rounded-md hover:bg-primary-dark">
          View Details
        </button> */}
        <Modal variant="edit"/>
      </div>
    </div>
  );
};

export default TestimonialCards;
