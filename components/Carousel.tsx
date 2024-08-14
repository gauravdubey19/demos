"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselProps } from "@/lib/types";

const Carousel: React.FC<CarouselProps> = ({
  children,
  infinite,
  autoplay,
  autoplaySpeed,
  pauseOnHover,
  slidesToShow,
  slidesToScroll,
  arrows,
}) => {
  const settings = {
    dots: false,
    adaptiveHeight: true,
    focusOnSelect: true,
    draggable: true,
    infinite: infinite || true,
    autoplay: autoplay || false,
    autoplaySpeed: autoplaySpeed || 2000,
    pauseOnHover: pauseOnHover || true,
    arrows: arrows || false,
    slidesToScroll: slidesToScroll || 2,
    slidesToShow: slidesToShow || 4,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings} className="px-2 md:px-6 lg:px-8 py-2">
        {children}
      </Slider>
    </>
  );
};

export default Carousel;
