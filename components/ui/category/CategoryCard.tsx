import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CategoryCard {
  item: any;
  activeSlide: any;
  index: any;
}

const CategoryCard = ({ item, activeSlide, index }: CategoryCard) => {
  return (
    <div className="px-2">
      <div
        className={`relative transition-all flex items-center justify-center flex-col  duration-300 ${
          activeSlide === index
            ? "opacity-100 scale-140"
            : "opacity-50 scale-50"
        }`}
      >
        <Image
          src={item.imageUrl}
          alt={`Slide ${item.id}`}
          width={800}
          height={500}
          className={`w-fit h-[20rem] transition-all duration-300`}
        />
        <div className="flex items-center flex-col gap-3 w-[70%]">
          <div className="flex items-center flex-col  ">
            <h1 className="text-lg ">Vibrant checks Shirt</h1>
            <p className="text-[#a1a1a1]">
              classic full-sleeve men{"'"}s shirt red and blue check pattern.
            </p>
          </div>

          <Button
            className={`mt-4 w-full transition-all duration-300 bg-primary rounded-none`}
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
