"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/context/CursorProvider";

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  videoUrl: string;
  playbackConst?: number;
  className?: string;
}

const ScrollVideo: React.FC<VideoProps> = ({
  videoUrl,
  playbackConst = 0,
  className = "relative z-0 h-[450vh] w-full",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showVideo, setShowVideo } = useCursor();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!showVideo || !video || !container) return;

    video.playbackRate = playbackConst;

    const videoDuration = video.duration || 1;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 3,
      // onEnter: () => {
      //   setShowVideo(true);
      // },
      onLeave: () => {
        setShowVideo(false);
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
  }, [showVideo, videoUrl, playbackConst, setShowVideo]);

  return (
    <div
      ref={containerRef}
      className={`${className} ${
        showVideo && "flex justify-center scroll-none"
      }`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        muted
        className={`${
          showVideo ? "fixed" : "absolute"
        } h-screen w-auto object-cover`}
      />
    </div>
  );
};

export default ScrollVideo;
