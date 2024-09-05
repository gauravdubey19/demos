"use client"
// import React, { Children, Component } from "react";
// import Slider from "react-slick";

// interface SlidersI{
//     children:React.ReactNode
// }

// function Sliders({ children }: SlidersI) {
//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "60px",
//         slidesToShow: 3,
//         speed: 500
//     };
//     return (
//         <div className="slider-container">
//             <Slider {...settings}>
//                 {children}
//             </Slider>
//         </div>
//     );
// }

// export default Sliders;

"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface CategoryCarouselProps {
    children: React.ReactNode;
    setActiveSlide: (slideIndex: number) => void;
}

const Sliders: React.FC<CategoryCarouselProps> = ({
    children,
    setActiveSlide,
}) => {
    const settings = {
        focusOnSelect: true,
        className: "center",
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 500,
        // nextArrow: <ChevronRight height={60} width={60} color="#ffb433" />,
        // prevArrow: <ChevronLeft height={60} width={60} color="#ffb433" />,
        beforeChange: (current: number, next: number) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "60px",
                },
            },
        ],
        arrows: false, 
    };

    return (
        <Slider {...settings} className="h-max cursor-grab active:cursor-grabbing">
            {children}
        </Slider>
    );
};

export default Sliders;
