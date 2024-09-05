"use client"
import React, { useRef, useState } from 'react';

const TestimonialCards = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null); // Specify the type
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (videoRef.current) {
            videoRef.current.play(); // No error now
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            className='md:w-[15rem] w-[13rem] h-[20rem] md:h-[25rem] rounded-xl overflow-hidden bg-white flex items-center justify-between flex-col'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                
                loop
                playsInline
                className='w-full h-full object-cover'
            >
                <source src='https://cdn.shopify.com/videos/c/o/v/c2c6651fcf274ea195057f49b0b2e7b4.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default TestimonialCards;