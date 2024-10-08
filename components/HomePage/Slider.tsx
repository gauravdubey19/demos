"use client";
import { useEffect, useState } from "react";
import slide1 from '@/public/slide1.jpg';
import slide2 from '@/public/slide2.jpg';
import slide3 from '@/public/slide3.jpg';
import slide4 from '@/public/slide4.jpeg';
import slide5 from '@/public/slide5.jpeg';
import slide6 from '@/public/slide6.jpeg';
import slide7 from '@/public/slide7.jpeg';
import Image from "next/image";

const Slider =() =>{
    // Updated array to include heading, subheading, and button text for each slide
    const slides = [
        {
            src: slide4,
            heading: "Summer Collection",
            subheading: "Bright and breezy styles to enjoy the sun.",
            buttonText: "Explore Summer"
        },
        {
            src: slide6,
            heading: "Limited Edition",
            subheading: "Exclusive pieces crafted with precision and care.",
            buttonText: "Shop Limited Edition"
        },
        {
            src: slide7,
            heading: "Explore New Arrivals",
            subheading: "Discover the latest trends in our exclusive collection.",
            buttonText: "Shop New Arrivals"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval);
    }, [slides.length]);

    // Handle manual slide change when clicking on indicators
    const handleSlideChange = (idx: number) => {
        setCurrentSlide(idx);
    };

    return (
        <div className="relative w-full h-[calc(100vh-60px)] overflow-hidden mt-2  mb-20">
            {/* Carousel images */}
            <div className="absolute inset-0 flex">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute w-full h-full transition-all  ease-linear
              ${currentSlide === idx ? "opacity-100 scale-110" : "opacity-0 scale-100"}`}
                    >
                        <Image
                            src={slide.src}
                            alt={`Slide ${idx + 1}`}
                            className="object-cover object-top w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Text content based on the current slide */}
            <div className="absolute bottom-10 left-10 z-20 text-white space-y-4">
                <h2 className="text-5xl font-bold tracking-wide">
                    {slides[currentSlide].heading}
                </h2>
                <p className="text-xl">
                    {slides[currentSlide].subheading}
                </p>
                <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-1000">
                    {slides[currentSlide].buttonText}
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleSlideChange(idx)}
                        className={`cursor-pointer w-6 h-1 bg-white rounded-full transition-all duration-500 ease-in-out 
              ${currentSlide === idx ? "opacity-100" : "opacity-50"}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}


export default Slider;