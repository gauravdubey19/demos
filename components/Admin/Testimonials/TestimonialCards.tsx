"use client";

import React, { useRef, useState } from "react";
import { extractFileKey } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Testimonial } from "./TestimonialsAdmin";
import { FaPlay } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface TestimonialCardsI {
  testimonial: Testimonial;
  onRefresh?: () => void;
}

const TestimonialCards = ({ testimonial }: TestimonialCardsI) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await fetch("/api/testimonials/get-delete", {
        method: "DELETE",
        body: JSON.stringify({
          _id: testimonial._id,
          key: extractFileKey(testimonial?.videoLink),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const result = await response.json();
      toast({
        title: result.message || result.error,
        description: result.message
          ? "Now you can view the Testimonials."
          : "Please try again later...",
        variant: result.error ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  // console.log(extractFileKey(testimonial?.videoLink));

  return (
    <div
      className="group card w-full sm:w-[15rem] h-[19rem] sm:h-[24rem] space-y-2 rounded-xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 h-[17rem] sm:h-[22rem] rounded-xl bg-white flex-between flex-col overflow-hidden">
        <div
          className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center cursor-pointer ${
            isHovering
              ? "shadow-none"
              : "shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
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
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
          >
            <source src={`${testimonial?.videoLink}`} type="video/mp4" />
          </video>
        </div>

        {/* View Details button with animation */}
        <div className="absolute left-0 -bottom-[60px] group-hover:bottom-0 z-50 w-full h-[60px] bg-white/25 backdrop-blur-md flex-center transform transition-all ease-in-out duration-500 overflow-hidden">
          <Button size="sm" disabled={loading} onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
      <div className="w-full h-fit z-0 text-center -translate-y-10 group-hover:translate-y-0 line-clamp-1 ease-in-out duration-300 overflow-hidden">
        {testimonial.testimony}
      </div>
    </div>
  );
};

export default TestimonialCards;
