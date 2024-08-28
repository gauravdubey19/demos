"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface VideoScrollProps {
  videoUrl: string;
  className?: string;
}

const VideoScroll: React.FC<VideoScrollProps> = ({ videoUrl, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;

    if (video) {
      const duration = video.duration || 1;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=100%`,
        scrub: 2,
        pin: containerRef.current,
        onUpdate: (self) => {
          const progress = self.progress;
          video.currentTime = progress * duration;
        },
        onEnter: () => {
          video.play();
        },
        onLeaveBack: () => {
          video.pause();
        },
      });

      return () => {
        trigger.kill();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex-center ${className}`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
        // playsInline
        autoPlay={false}
      />
    </div>
  );
};

export default VideoScroll;
