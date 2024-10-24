"use client";
import { useEffect, useState } from "react";
import { slides } from "@/lib/sampleSliderData";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Button } from "../ui/button";

// Define the structure of a single slide
interface Slide {
  src: StaticImageData;
  heading: string;
  subheading: string;
  buttonText: string;
}

// Define the structure of the slides object
interface SlidesData {
  all: Slide[];
  traditional: Slide[];
  partywear: Slide[];
  formal: Slide[];
}

// Ensure that the imported slides match this structure
const typedSlides: SlidesData = slides;

// Define valid categories
type Category = keyof SlidesData;

interface SliderProps {
  category: Category;
}

const Slider = ({ category }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === typedSlides[category].length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, [category]);

  // Handle manual slide change when clicking on indicators
  const handleSlideChange = (idx: number) => {
    setCurrentSlide(idx);
  };

  return (
    <div className="relative w-full h-[calc(100vh-60px)] mt-[60px] overflow-hidden mb-12">
      {/* Carousel images */}
      <div className="absolute inset-0 flex">
        {typedSlides[category].map((slide, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-all ease-linear ${
              currentSlide === idx
                ? "opacity-100 scale-110"
                : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={slide.src}
              alt={`Slide ${idx + 1}`}
              className="object-cover object-top w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 right-0 w-full z-20 text-white space-y-4 p-2 md:p-4 lg:px-6 xl:px-8">
        <h2 className="text-5xl font-bold tracking-wide">
          {typedSlides[category][currentSlide].heading}
        </h2>
        <p className="text-xl">
          {typedSlides[category][currentSlide].subheading}
        </p>
        <Button variant="secondary" className="hover:bg-black hover:text-white">
          {typedSlides[category][currentSlide].buttonText}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {typedSlides[category].map((_, idx) => (
          <span
            key={idx}
            onClick={() => handleSlideChange(idx)}
            className={`cursor-pointer w-6 h-1 bg-white rounded-full transition-all duration-500 ease-in-out ${
              currentSlide === idx ? "opacity-100" : "opacity-50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
