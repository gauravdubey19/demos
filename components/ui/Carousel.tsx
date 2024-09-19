"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselProps } from "@/lib/types";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

const Carousel: React.FC<CarouselProps> = ({
  children,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 2000,
  pauseOnHover = true,
  slidesToShow = 5,
  arrows = false,
  className,
}) => {
  const settings = {
    dots: false,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    adaptiveHeight: true,
    // focusOnSelect: true,
    // className: "center",
    // centerMode: true,
    // centerPadding: "10px",

    infinite: infinite,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: pauseOnHover,
    slidesToShow: slidesToShow,
    arrows: arrows,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: arrows || true,
          slidesToShow: slidesToShow,
        },
      },
      {
        breakpoint: 970,
        settings: {
          arrows: arrows || true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 680,
        settings: {
          arrows: arrows || false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 560,
        settings: {
          arrows: arrows || false,
          slidesToShow: 2,
        },
      },
    ],
    // centerPadding: "60px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <Slider
        {...settings}
        className={`${className} cursor-grab active:cursor-grabbing bg-white ${
          arrows && "md:py-2"
        }`}
      >
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
      className="absolute -top-2.5 left-3 p-1 cursor-pointer hover:scale-105 active:-translate-x-1 ease-in-out duration-200"
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
      className="absolute -top-2.5 left-10 p-1 cursor-pointer hover:scale-105 active:translate-x-1 ease-in-out duration-200"
    >
      <IoArrowForwardSharp size={20} />
    </div>
  );
};
