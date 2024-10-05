"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import ScrollVideo from "../ui/ScrollVideo";
import { Button } from "../ui/button";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import ImagePracticles from "../ui/ImagePracticles";
import { useCursor } from "@/context/CursorProvider";

gsap.registerPlugin(Draggable);

const GsapHero: React.FC = () => {
  const { showLeft, setShowLeft, showRight, setShowRight } = useCursor();
  const [containerDraggable, setContainerDraggable] = useState<boolean>(false);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const leftSlideBackRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const rightSlideBackRef = useRef<HTMLDivElement>(null);

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
              gsap.to(this.target, {
                x: 100,
                duration: 0.5,
                ease: "power2.inOut",
              });
              setShowLeft(true);
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
              gsap.to(this.target, {
                x: -100,
                duration: 0.5,
                ease: "power2.inOut",
              });
              setInterval(() => setShowRight(true), 800);
            }
          },
        });
      }

      if (leftSlideBackRef.current) {
        Draggable.create(leftSlideBackRef.current, {
          type: "x",
          bounds: { minX: -leftContainerWidth, maxX: 0 },
          onDragEnd() {
            if (this.x <= -leftContainerWidth * 0.1) {
              gsap.to(leftContainerRef.current, {
                x: "-100%",
                duration: 1,
                ease: "power2.inOut",
              });
              gsap.to(this.target, {
                x: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
              setShowLeft(false);
            }
          },
        });
      }

      if (rightSlideBackRef.current) {
        Draggable.create(rightSlideBackRef.current, {
          type: "x",
          bounds: { minX: 0, maxX: rightContainerWidth },
          onDragEnd() {
            if (this.x >= rightContainerWidth * 0.1) {
              gsap.to(rightContainerRef.current, {
                x: "100%",
                duration: 1,
                ease: "power2.inOut",
              });
              gsap.to(this.target, {
                x: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
              setShowRight(false);
            }
          },
        });
      }
    };

    updateBounds();

    const handleScroll = () => {
      setContainerDraggable(window.scrollY > window.innerHeight * 2);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setShowLeft, setShowRight]);

  return (
    <>
      <section className="h-[400vh] bg-white">
        <div className="w-full h-screen sticky top-0 overflow-hidden">
          <>
            {/* left hero section */}
            <div
              ref={leftContainerRef}
              className={`absolute inset-0 z-50 transition-transform duration-300 ${
                containerDraggable
                  ? "-translate-x-full"
                  : "-translate-x-[115%] md:-translate-x-[110%]"
              }`}
            >
              <div
                ref={leftSlideBackRef}
                className="absolute right-0 z-50 w-[30vw] h-full bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
              <LeftContainer />
              <div
                ref={leftSectionRef}
                className="absolute right-0 top-0 w-20 h-full flex items-center justify-center translate-x-20"
              >
                <IoArrowBackSharp size={40} className="text-primary" />
              </div>
            </div>

            {/* right hero section */}
            <div
              ref={rightContainerRef}
              className={`absolute inset-0 z-50 transition-transform duration-300 ${
                containerDraggable
                  ? "translate-x-full"
                  : "translate-x-[115%] md:translate-x-[110%]"
              }`}
            >
              <div
                ref={rightSlideBackRef}
                className="absolute left-0 z-50 w-[30vw] h-full bg-transparent cursor-grab active:cursor-grabbing"
              ></div>
              <div
                ref={rightSectionRef}
                className="absolute left-0 w-20 h-full flex items-center justify-center -translate-x-20"
              >
                <IoArrowForwardSharp size={40} className="text-primary" />
              </div>
              <RightContainer showRight={showRight} />
            </div>
          </>
          <>
            <div className="relative w-full h-screen flex-center overflow-hidden">
              <div
                id="bg-section"
                className="absolute inset-0 -z-10 h-full w-full"
              >
                <ScrollVideo videoUrl="/videos/homePageHeroVideo.mp4" />
              </div>
              <div
                id="middle-section"
                className="relative lg:h-full bg-[#ffb43320] backdrop-blur-md flex items-center justify-center w-full md:w-[40vw] lg:w-[30vw] p-6 transition-transform duration-300"
              >
                <MiddleContainer />
              </div>
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default GsapHero;

const MiddleContainer: React.FC = () => {
  // const handleScrollDown = () => {
  //   window.scrollTo({
  //     top: window.innerHeight * 3.91,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="w-full flex flex-col items-center gap-10 md:gap-16">
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full h-[230px] flex items-end justify-center bg-white/60 text-primary p-4">
          <div className="absolute md:-left-[6.8rem] top-7 z-10 gap-1 text-[90px] font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            <span className="md:text-white">Ex</span>
            <span>plore</span>
          </div>
          <span className="text-6xl lg:text-7xl font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
            Textiles
          </span>
        </div>
        <span className="w-full text-center text-balance text-[2rem] md:text-2xl lg:text-[2rem] font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] overflow-hidden">
          Textiles <span className="text-[#AA6C00] font-medium">&</span> Ready
          made
        </span>
      </div>
      {/* <Button
        onClick={handleScrollDown}
        className="w-fit h-fit select-none bg-white text-primary text-xl font-semibold tracking-[6px] p-2 px-3 rounded-none hover:shadow-xl ease-in-out duration-300"
      >
        SHOP NOW
      </Button> */}
    </div>
  );
};

const LeftContainer = () => {
  return (
    <div className="w-full h-full flex-between select-none bg-zinc-400 overflow-hidden"></div>
  );
};

const RightContainer: React.FC<{ showRight: boolean }> = ({ showRight }) => {
  return (
    <div className="w-full h-full flex-between flex-col-reverse md:flex-row select-none bg-white overflow-hidden">
      <div className="h-[calc(100vh-60px)] md:flex-center w-full mt-[60px] p-4 md:p-8 lg:p-10 overflow-hidden">
        <div className="h-fit w-fit space-y-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold">
            Welcome
          </h2>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
            odit.
          </p>
          <Button>Check Out Now</Button>
        </div>
      </div>
      <div className="h-[calc(100vh-60px)] w-full mt-[60px] overflow-hidden">
        {showRight && <ImagePracticles img="/assets/rightImage.png" />}
      </div>
    </div>
  );
};
