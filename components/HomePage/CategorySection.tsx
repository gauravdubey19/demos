"use client";

import React, { useState } from "react";
import { carouselItems } from "@/lib/data";
import Card from "../ui/category/Card";
import CategoryCarousel from "../ui/category/CategoryCarousel";

const CategorySection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <section className="h-[calc(100vh-60px)] flex-center flex-col px-4">
      <div className="w-full max-w-3xl mb-5">
        <div className="h-[2px] bg-black w-full mb-5" />
        <h1 className="text-4xl font-bold text-center">Choose Your Style</h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="slider-container max-w-6xl w-full">
          <CategoryCarousel setActiveSlide={setActiveSlide}>
            {carouselItems.map((item, index) => (
              <Card
                key={item.id}
                item={item}
                activeSlide={activeSlide}
                index={index}
              />
            ))}
          </CategoryCarousel>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
