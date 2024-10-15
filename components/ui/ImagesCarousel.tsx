"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselProps } from "@/lib/types";

const ImageCarousel: React.FC<CarouselProps> = ({
  children,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 2000,
  pauseOnHover = true,
  slidesToShow = 1,
  arrows = false,
  dots = false,
  className,
}) => {
  const settings = {
    dots: dots,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    adaptiveHeight: true,
    infinite: infinite,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: pauseOnHover,
    slidesToShow: slidesToShow,
  };
  return (
    <>
      <Slider {...settings} className={`${className}`}>
        {children}
      </Slider>
    </>
  );
};

export default ImageCarousel;
