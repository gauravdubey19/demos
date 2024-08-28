"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollGifProps {
  gifs: string[];
}

const ScrollGif: React.FC<ScrollGifProps> = ({ gifs }) => {
  const gifRef = useRef<HTMLImageElement>(null);
  const [currentGif, setCurrentGif] = useState(gifs[0]);

  useEffect(() => {
    const totalGifs = gifs.length;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: gifRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const scrollRatio = self.progress;
        const gifIndex = Math.floor(scrollRatio * (totalGifs - 1));
        setCurrentGif(gifs[gifIndex]);
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, [gifs]);

  return (
    <div className="sticky top-0 w-full h-[calc(100vh-60px)]">
      <Image
        ref={gifRef}
        src={currentGif}
        alt="Changing GIF"
        width={400}
        height={600}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ScrollGif;
