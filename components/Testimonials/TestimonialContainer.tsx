"use client";

import React, { useEffect, useRef } from "react";
import TestimonialCards from "./TestimonialCards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".panel");

    if (panelsRef.current && containerRef.current) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "-80px top",
          scrub: 2,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + panelsRef.current!.offsetWidth,
          // markers: true,
        },
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={containerRef} className="md:px-20 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Our Testimonies</h1>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 md:bg-gradient-to-r from-white to-transparent w-8 z-10"></div>
        <div className="absolute inset-y-0 right-0 md:bg-gradient-to-l from-white to-transparent w-8 z-10"></div>

        <div ref={panelsRef} className="w-full flex gap-4 px-4 ">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="panel w-screen ">
              <TestimonialCards />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialContainer;
