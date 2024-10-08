"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

gsap.registerPlugin(Draggable);

const HeroWithDrag: React.FC = () => {
  const router = useRouter();
  // const { rightRef, leftRef, setShowLeft } = useCursor();
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBounds = () => {
      const leftContainerWidth = leftContainerRef.current?.offsetWidth ?? 0;
      const rightContainerWidth = rightContainerRef.current?.offsetWidth ?? 0;

      if (leftSectionRef.current) {
        Draggable.create(leftSectionRef.current, {
          type: "x",
          bounds: { minX: 0, maxX: leftContainerWidth },
          onDragEnd() {
            if (this.x >= leftContainerWidth * 0.1) {
              gsap.to(leftContainerRef.current, {
                x: 0,
                duration: 1,
                ease: "power2.inOut",
              });
              // setShowLeft(true);
              router.push("/three-d");
            }
          },
        });
      }

      if (rightSectionRef.current) {
        Draggable.create(rightSectionRef.current, {
          type: "x",
          bounds: { minX: -rightContainerWidth, maxX: 0 },
          onDragEnd() {
            if (this.x <= -rightContainerWidth * 0.1) {
              gsap.to(rightContainerRef.current, {
                x: 0,
                duration: 1,
                ease: "power2.inOut",
              });
              router.push("/products");
            }
          },
        });
      }
    };

    updateBounds();
  }, [router]);

  return (
    <section className="h-screen bg-transparent">
      <div className="w-full h-screen sticky top-0 overflow-hidden">
        {/* left hero section */}
        <div
          ref={leftContainerRef}
          className={`absolute left-0 top-0 z-50 w-60 h-full group animate-slide-right`}
        >
          <div
            ref={leftSectionRef}
            className="absolute left-0 top-0 z-50 w-32 h-full"
          >
            <div
              // ref={leftRef} // Ensure this ref is properly linked to the cursor context
              className="w-full h-full z-0 flex items-center justify-start"
            >
              <div className="w-fit h-fit ml-4 flex-center bg-white rounded-full p-1 group-hover:animate-motion-left">
                <IoArrowForwardSharp size={40} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* right hero section */}
        <div
          ref={rightContainerRef}
          className={`absolute right-0 top-0 z-50 w-60 h-full group animate-slide-left`}
        >
          <div
            ref={rightSectionRef}
            className="absolute right-0 top-0 z-50 w-32 h-full"
          >
            <div
              // ref={rightRef} // Ensure this ref is properly linked to the cursor context
              className="w-full h-full flex items-center justify-end"
            >
              <div className="w-fit h-fit mr-4 flex-center bg-white/70 backdrop-blur-sm rounded-full p-1 group-hover:animate-motion-right">
                <IoArrowBackSharp size={40} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-screen flex-center overflow-hidden">
          <div
            id="bg-section"
            className="absolute inset-0 -z-10 h-full w-full animate-slide-down"
          >
            <div className="absolute inset-0 bg-black/20 z-20"></div>
            <video
              src="/videos/heroMergedTrim.mp4"
              playsInline
              muted
              autoPlay
              loop
              className={`object-cover scale-105 z-0`}
            />
          </div>
          <div
            id="middle-section"
            className="relative lg:h-full bg-[#ffb43320] backdrop-blur-sm flex items-center justify-center w-full md:w-[40vw] lg:w-[30vw] p-6 transition-transform duration-300"
          >
            <MiddleContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithDrag;

const MiddleContainer: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 md:gap-16 animate-slide-down">
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full h-[230px] flex items-end justify-center bg-white/50 text-primary p-4">
          <div className="absolute md:-left-[6.8rem] top-7 z-10 gap-1 text-[90px] font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <span className="md:text-white">Ex</span>
            <span>plore</span>
          </div>
          <span className="text-6xl lg:text-7xl font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            Textiles
          </span>
        </div>
        <span className="w-full animate-slide-up text-center text-balance text-[2rem] md:text-2xl lg:text-[2rem] font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] overflow-hidden">
          Textiles <span className="text-[#AA6C0 font-medium">&</span> Ready
          made
        </span>
      </div>
    </div>
  );
};
