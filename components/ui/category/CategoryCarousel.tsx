"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  children: React.ReactNode;
  setActiveSlide: (slideIndex: number) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
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
    centerPadding: "100px",
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
          centerPadding: "100px",
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="h-max cursor-grab active:cursor-grabbing">
      {children}
    </Slider>
  );
};

export default CategoryCarousel;
