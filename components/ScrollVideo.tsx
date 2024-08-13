"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  playbackConst: number;
  videoUrl: string;
  className?: string;
}

const ScrollVideo: React.FC<VideoProps> = ({
  videoUrl,
  playbackConst,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    video.playbackRate = playbackConst; //playback rate between 0-5

    // Creating a GSAP timeline with ScrollTrigger
    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          // markers: true // Uncomment to see ScrollTrigger markers for debugging
        },
      })
      .fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });

    const onMetadataLoaded = () => {
      video.currentTime = 0; // Start from the beginning
    };

    video.addEventListener("loadedmetadata", onMetadataLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, [videoUrl, playbackConst]);

  return (
    <>
      <div ref={containerRef} className={`${className}`}>
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          muted
          className="fixed w-full h-auto object-cover"
        />
      </div>
    </>
  );
};

export default ScrollVideo;

//https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4
