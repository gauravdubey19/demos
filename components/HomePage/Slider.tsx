"use client";
import { useEffect, useState } from "react";
import slide1 from '@/public/slide1.jpg';
import slide2 from '@/public/slide2.jpg';
import slide3 from '@/public/slide3.jpg';
import Image from "next/image";

const Slider =() =>{
    // Updated array to include heading, subheading, and button text for each slide
    const slides = [
        {
            src: 'https://sherwanirental.com/wp-content/uploads/2024/05/Website-Banner-3_compressed.jpg',
            heading: "Dazzle in Designer Sherwanis",
            subheading: "Make a statement at any celebration with our exclusive range of sherwanis, designed for unforgettable moments.",
            buttonText: "Discover Partywear"
        },
        {
            src: 'https://img.freepik.com/premium-photo/entrepreneur-manager-male-formal-fashion-professional-unshaven-ceo-confident-grizzled-boss-copy-space-mature-businessman-formalwear-business-success-successful-man-businesslike-suit_545934-6792.jpg',
            heading: "Sharp and Sophisticated Suits",
            subheading: "Step into style with our expertly tailored suits, perfect for any formal occasion.",
            buttonText: "Explore Formal Wear"
        },
        {
            src: 'https://cdn.shopify.com/s/files/1/1857/6931/files/nehru-jackets_600x600.jpg?v=1658230751',
            heading: "Elegance in Kurta & Nehru Jacket",
            subheading: "Embrace tradition with our refined collection of kurtas and Nehru jackets, crafted for timeless appeal.",
            buttonText: "Shop Traditional Styles"
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
        <div className="relative w-full h-[calc(100vh-60px)] overflow-hidden mb-20">
            {/* Carousel images */}
            <div className="absolute inset-0 flex">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute w-full h-full transition-all  ease-linear
              ${currentSlide === idx ? "opacity-100 scale-110" : "opacity-0 scale-100"}`}
                    >
                        <img
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