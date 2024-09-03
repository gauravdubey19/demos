import React from 'react'
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardsI{
    item:any,
    activeSlide:any,
    index:any
}

const Cards = ({ item, activeSlide, index }: CardsI) => {
  return (
      <div key={item.id} className="px-2">
          <div className={`relative transition-all flex items-center justify-center flex-col  duration-300 ${activeSlide === index ? 'opacity-100 scale-140' : 'opacity-50 scale-50'
              }`}>
              <Image
                  src={item.imageUrl}
                  alt={`Slide ${item.id}`}
                  className={`transition-all duration-300  `}
                  width={800} // Replace with the actual width of your image
                  height={500}
              />
              <div className="flex items-center flex-col gap-3 w-[70%]">
                  <div className="flex items-center flex-col  ">
                      <h1 className="text-lg ">Vibrant checks Shirt</h1>
                      <p className="text-[#a1a1a1]">classic full-sleeve men's shirt red and blue check pattern.</p>
                  </div>

                  <Button
                      className={`mt-4 w-full transition-all duration-300 bg-[#ffb433] rounded-none`}
                  >
                      View More
                  </Button>
              </div>

          </div>
      </div>
  )
}

export default Cards