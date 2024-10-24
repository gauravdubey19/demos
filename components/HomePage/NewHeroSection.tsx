"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SlideComponent from "./SlideComponent";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

function NewHeroSection() {
  const slideRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!slideRef.current) return;
    const slides = slideRef.current.children;

    // Set initial states for slides (horizontal sliding)
    gsap.set(slides, { xPercent: 100 });
    gsap.set(slides[0], { xPercent: 0 });

    // // GSAP timeline for sliding effect only
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    tl.to(slides[0], {
      xPercent: -100,
      duration: 1,
      ease: "power2.inOut",
      delay: 3,
    })
      .to(slides[1], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[1], {
        xPercent: -100,
        duration: 1,
        ease: "power2.inOut",
        delay: 3,
      })
      .to(slides[2], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[2], {
        xPercent: -100,
        duration: 1,
        ease: "power2.inOut",
        delay: 3,
      })
      .to(slides[3], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[3], {
        xPercent: -100,
        duration: 1,
        ease: "power2.inOut",
        delay: 3,
      })
      .to(slides[0], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1");
  }, []);

  const handleMouseEnter = (buttonId: string) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.classList.add("button-hover");
    }
  };

  const handleMouseLeave = (buttonId: string) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.classList.remove("button-hover");
    }
  };
  const handleScrollDown = () => {
    window.scrollTo({
      top: innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <div className="md:h-[97.5%] h-[99%] w-[98.5%] md:rounded-[30px] rounded-[20px] overflow-hidden relative">
        <div className="absolute top-2 md:top-6 left-0 right-0 z-50 w-full">
          <div className="flex justify-between items-center w-full h-full md:px-6 px-2">
            <Link href={"/three-d"} className="button-default" id="3dButton">
              <div className="flex flex-row gap-2 items-center justify-center relative w-full h-full right-2">
                <GoChevronLeft size={26} className="" />
                3D Textiles
              </div>
            </Link>
            <div className="relative items-center justify-center px-6 py-2  overflow-hidden hidden md:flex">
              {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-0 border border-primary rounded-full"></div> */}
              <Image
                src={Logo}
                alt="CSK"
                width={100}
                height={100}
                className="w-[90px] h-auto relative z-10 "
              />
            </div>
            <Link href="/products" className="button-default" id="readyMade">
              <div className="flex flex-row gap-2 items-center justify-center relative w-full h-full left-2">
                Ready Made
                <GoChevronRight size={26} className="" />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-full absolute z-[40] hidden md:block">
          <div
            className="w-1/3 left-0 top-0 absolute transition duration-300 ease-out h-full opacity-0 hover:opacity-60 cursorRight"
            id="leftHalf"
            onMouseEnter={() => handleMouseEnter("3dButton")}
            onMouseLeave={() => handleMouseLeave("3dButton")}
            onClick={() => router.push("/three-d")}
            style={{
              background:
                "linear-gradient(60deg, var(--primary) 0%, transparent 60%, transparent 100%)",
            }}
          ></div>
          <div
            className="w-1/3 right-0 top-0 absolute transition duration-300 ease-out h-full opacity-0 hover:opacity-60 cursorLeft"
            id="rightHalf"
            onMouseEnter={() => handleMouseEnter("readyMade")}
            onMouseLeave={() => handleMouseLeave("readyMade")}
            onClick={() => router.push("/products")}
            style={{
              background:
                "linear-gradient(-60deg, var(--primary) 0%, transparent 60%, transparent 100%)",
            }}
          ></div>
        </div>
        <div className="carousel w-full h-full relative z-0" ref={slideRef}>
          {/* Slide 1 - Textiles */}
          <SlideComponent
            src="https://res.cloudinary.com/djnhadxeb/image/upload/v1729443444/CSK%20Uploads/Pic1.png"
            alt="CSK Textile"
            title1="CSK"
            title2="Textile"
            yellow={1}
            subtitle="For Men Fashion"
            yellowSubString="Men"
          />
          <SlideComponent
            src="https://res.cloudinary.com/djnhadxeb/image/upload/v1729443543/CSK%20Uploads/tdzociwrnmap3ldcpdyt.png"
            alt="Explore Sherwanis"
            title1="Explore"
            title2="Sherwanis"
            yellow={2}
            subtitle="At Unbelievable Discount"
            yellowSubString="Unbelievable"
          />
          <SlideComponent
            src="https://res.cloudinary.com/djnhadxeb/image/upload/v1729443694/CSK%20Uploads/Kurta3.png"
            alt="Explore Kurtas"
            title1="Explore"
            title2="Kurtas"
            yellow={2}
            subtitle="At Premium Quality"
            yellowSubString="Premium"
          />
          <SlideComponent
            src="https://res.cloudinary.com/djnhadxeb/image/upload/v1729443691/CSK%20Uploads/suit4.png"
            alt="Explore Suits"
            title1="Explore"
            title2="Men Suits"
            yellow={2}
            subtitle="At Affordable Rate"
            yellowSubString="Affordable"
          />
        </div>
        <div className="w-[220px] md:w-[300px] h-[100px] md:h-[120px] md:rounded-tl-[25px] rounded-tl-[20px] absolute bg-white bottom-0 right-0 z-50">
          <div className="w-full h-full flex items-center justify-center p-2 md:p-3 pr-0 md:pr-0 pb-0 md:pb-0">
            <Button
              className="w-full h-full md:rounded-tl-[20px] md:rounded-br-[20px] rounded-tl-[15px] rounded-br-[15px] bg-black text-primary flex-center flex-col gap-2 md:gap-4 px-6 hover:bg-primary hover:text-white rounded-tr-none rounded-bl-none overflow-hidden"
              id="shopNow"
              onClick={handleScrollDown} // () => router.push("/products")
            >
              {/* <span className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-montSemiBold">Explore CSK</span> */}
              <div className="flex-center flex-row gap-4">
                <span className="text-primary text-2xl underline underline-offset-8 font-mont">
                  Shop Now
                </span>
                <FaArrowRightLong className="" size={22} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewHeroSection;
