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
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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
      className="relative card w-full sm:w-[15rem] h-[17rem] sm:h-[22rem] rounded-xl overflow-hidden bg-white flex items-center justify-between flex-col transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center ${
          isHovering ? "shadow-none" : "shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
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
          <source src={`${testimonial?.videoLink}`} type="video/mp4" />
        </video>
      </div>

      {/* View Details button with animation */}
      <div
        className={`absolute bottom-[-100px] left-1/2 w-full h-20 bg-white flex items-center justify-center transform -translate-x-1/2 transition-all duration-500 ease-in-out z-50 ${
          isHovering ? "translate-y-[-100%]" : "translate-y-0"
        }`}
      >
        <Button disabled={loading} onClick={handleDelete}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCards;
