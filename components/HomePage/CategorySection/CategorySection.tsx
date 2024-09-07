"use client";

import React, { useState } from "react";
import { carouselItems } from "@/lib/data";
import CategoryCard from "./CategoryCard";
import CategoryCarousel from "../../ui/category/CategoryCarousel";

const CategorySection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <section className=" h-[calc(100vh-60px)] flex-center flex-col p-4">
      <div className="w-full max-w-3xl mb-5">
        <div className="h-[2px] bg-black w-full mb-5" />
        <h1 className="md:text-4xl text-2xl  font-bold text-center">Choose Your Style</h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="slider-container max-w-6xl w-full">
          <CategoryCarousel setActiveSlide={setActiveSlide}>
            {carouselItems.map((item, index) => (
              <CategoryCard
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
