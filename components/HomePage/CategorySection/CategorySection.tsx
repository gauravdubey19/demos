"use client";

import React, { useEffect, useState } from "react";
import CategoryCarousel from "@/components/ui/category/CategoryCarousel";
import CategoryCard from "./CategoryCard";
import { CategoryValues } from "@/lib/types";

const CategorySection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/read/get-categories", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        // console.log(data.categories as CategoryValues[]);
        if (data as CategoryValues[]) {
          setCategories(data.categories as CategoryValues[]);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <section className="h-[calc(100vh-60px)] w-full flex-center flex-col p-4 overflow-hidden">
      <div className="w-full max-w-3xl mb-5">
        <div className="h-[2px] bg-black w-full mb-5" />
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          Choose Your Style
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="slider-container max-w-6xl w-full">
          <CategoryCarousel setActiveSlide={setActiveSlide}>
            {categories.map((item, index) => (
              <CategoryCard
                key={item._id}
                item={item}
                activeSlide={activeSlide}
                index={index}
                loading={loading}
              />
            ))}
          </CategoryCarousel>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
