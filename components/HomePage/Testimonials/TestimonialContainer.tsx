"use client";

import React, { useEffect, useState, useRef } from "react";
import TestimonialCards from "./TestimonialCards";
import { Skeleton } from "@/components/ui/skeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TestimonialContainer = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/Testimonials/getThings");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        // console.log(data.files.files);
        setFiles(data.files.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
            // markers: true, // Uncomment this line to see the trigger points during development
          }
        }
      );
    }
  }, [loading]);

  const renderSkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="panel w-screen">
          <Skeleton className="h-96 w-full mb-2 bg-slate-200" />
        </div>
      ))}
    </>
  );

  return (
    <div ref={containerRef} className="w-full h-full md:px-20 p-6 overflow-hidden opacity-0">
      <h1 className="text-4xl font-bold text-center mb-10">Our Testimonies</h1>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 md:bg-gradient-to-r from-white to-transparent w-8 z-10"></div>
        <div className="absolute inset-y-0 right-0 md:bg-gradient-to-l from-white to-transparent w-8 z-10"></div>

        <div className="w-full flex gap-4 px-4 overflow-x-scroll">
          {loading
            ? renderSkeletons()
            : files?.map((file, index) => (
              <div key={index} className="panel w-screen">
                <TestimonialCards file={file} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialContainer;