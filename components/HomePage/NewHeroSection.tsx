"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SlideComponent from "./SlideComponent";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

    tl.to(slides[0], { xPercent: -100, duration: 1, ease: "power2.inOut", delay: 3 })
      .to(slides[1], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[1], { xPercent: -100, duration: 1, ease: "power2.inOut", delay: 3 })
      .to(slides[2], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[2], { xPercent: -100, duration: 1, ease: "power2.inOut", delay: 3 })
      .to(slides[3], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1")
      .to(slides[3], { xPercent: -100, duration: 1, ease: "power2.inOut", delay: 3 })
      .to(slides[0], { xPercent: 0, duration: 1, ease: "power2.inOut" }, "-=1");

  }, []);
  const handleMouseEnter = (buttonId: string) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.classList.add('button-hover');
    }
  };

  const handleMouseLeave = (buttonId: string) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.classList.remove('button-hover');
    }
  };
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <div className="md:h-[97.5%] h-[99%] w-[98.5%] md:rounded-[30px] rounded-[20px] overflow-hidden relative">
        <div className="absolute top-2 md:top-6 left-0 right-0 z-50 w-full">
          <div className="flex justify-between items-center w-full h-full md:px-6 px-2">
            <Link href={"/three-d"} className="button-default" id="3dButton">
              <div className="flex flex-row gap-2 items-center justify-center relative w-full h-full right-2">
            <GoChevronLeft size={26} className=""  />
              3D Textiles
              </div>
            </Link>
            <Link href="/products" className="button-default" id="readyMade">
              <div className="flex flex-row gap-2 items-center justify-center relative w-full h-full left-2">
              Ready Made
            <GoChevronRight size={26} className=""  />
            </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-full absolute z-[40] hidden md:block">
          <div
            className="w-1/2 left-0 top-0 absolute h-full opacity-0 hover:opacity-40 cursorRight"
            id="leftHalf"
            onMouseEnter={() => handleMouseEnter('3dButton')}
            onMouseLeave={() => handleMouseLeave('3dButton')}
            onClick={()=> router.push("/three-d")}
            style={{
              background: 'linear-gradient(60deg, var(--primary) 0%, transparent 70%, transparent 100%)',
            }}
          ></div>
          <div
            className="w-1/2 right-0 top-0 absolute h-full opacity-0 hover:opacity-40 cursorLeft"
            id="rightHalf"
            onMouseEnter={() => handleMouseEnter('readyMade')}
            onMouseLeave={() => handleMouseLeave('readyMade')}
            onClick={()=> router.push("/products")}
            style={{
              background: 'linear-gradient(-60deg, var(--primary) 0%, transparent 70%, transparent 100%)',
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
      </div>
    </section>
  );
}

export default NewHeroSection;
