
import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Modal from "./TestimonialsModal";
import { Button } from "@/components/ui/button";

interface TestimonialCardsI {
  testimonial?: any;
  onRefresh?: () => void;

}

const TestimonialCards = ({ testimonial, onRefresh }: TestimonialCardsI) => {
  // console.log(testimonial);
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

  const handleDelete = async () => {
    console.log('delete');
  };

  return (
   
    <div
      className="relative card w-full sm:w-[15rem] h-[17rem] sm:h-[22rem] rounded-xl overflow-hidden bg-white flex items-center justify-between flex-col transition-shadow duration-300"
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
            src={`${testimonial?.videoLink}`}
            type="video/mp4"
          />
        </video>
      </div>

      {/* View Details button with animation */}
      <div
        className={`absolute bottom-[-100px] left-1/2 w-full h-20 bg-white flex items-center justify-center transform -translate-x-1/2 transition-all duration-500 ease-in-out z-50 ${isHovering ? "translate-y-[-100%]" : "translate-y-0"
          }`}
      >
        <Button onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCards;