"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/context/CursorProvider";

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  videoUrl: string;
  playbackConst: number;
  className?: string;
}

const ScrollVideo: React.FC<VideoProps> = ({
  videoUrl,
  playbackConst,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showVideo } = useCursor();

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!showVideo || !video || !container) return;

    video.playbackRate = playbackConst; // Playback rate between 0-5

    // Creating a GSAP timeline with ScrollTrigger
    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          // markers: true // Uncomment to see ScrollTrigger markers for debugging
        },
      })
      .fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });

    const onMetadataLoaded = () => {
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onMetadataLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, [videoUrl, playbackConst, showVideo]);

  return (
    <div ref={containerRef} className={className}>
      {showVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          muted
          className="fixed z-0 w-full h-auto object-cover"
        />
      )}
    </div>
  );
};

export default ScrollVideo;
