"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselProps } from "@/lib/types";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

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
    draggable: true,
    infinite: infinite || true,
    autoplay: autoplay || false,
    autoplaySpeed: autoplaySpeed || 2000,
    pauseOnHover: pauseOnHover || true,
    slidesToScroll: slidesToScroll || 2,
    slidesToShow: slidesToShow || 4,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          arrows: arrows || true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: arrows || false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: arrows || false,
          slidesToShow: 2,
        },
      },
    ],
    centerPadding: "60px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -top-3 left-10 cursor-pointer hover:scale-105 active:-translate-x-1 ease-in-out duration-200"
    >
      <IoArrowBackSharp size={20} />
    </div>
  );
};
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -top-3 left-16 cursor-pointer hover:scale-105 active:-translate-x-1 ease-in-out duration-200"
    >
      <IoArrowForwardSharp size={20} />
    </div>
  );
};
