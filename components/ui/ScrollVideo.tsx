"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  videoUrl: string;
  playbackConst?: number;
  className?: string;
}

const ScrollVideo: React.FC<VideoProps> = ({
  videoUrl,
  playbackConst = 0,
  className = "relative -z-10 h-[450vh] w-full flex justify-center scroll-none",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.playbackRate = playbackConst;

    const videoDuration = video.duration || 1;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 3,
      onLeave: () => {
        ScrollTrigger.create({
          trigger: container,
          start: "bottom bottom",
        });
      },
      onUpdate: (self) => {
        // based on scroll progress xalculating the current time
        const scrollProgress = self.progress;
        const newTime = scrollProgress * videoDuration;
        video.currentTime = newTime;
      },
    });

    const onMetadataLoaded = () => (video.currentTime = 0);

    video.addEventListener("loadedmetadata", onMetadataLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);

      // Cleaning up ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [videoUrl, playbackConst]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        muted
        className="h-screen w-auto object-cover scale-125"
      />
    </div>
  );
};

export default ScrollVideo;
