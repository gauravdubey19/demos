"use client";


import ProductSection from "@/components/Products/ProductSection";
import { CategoryValues } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const ProductCategorySection: React.FC<{ limit?: number }> = ({
  limit = 3,
}) => {
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setCategories(data.categories as CategoryValues[]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) fetchCategories();
  }, [categories.length]);

  // Create a skeleton loader component
  const SkeletonLoader = () => (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 pt-3 px-2 md:px-6 lg:px-8">
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="w-full">
          <div className="w-full flex-between">
            <div className="w-32 md:w-52 h-full bg-slate-300 text-slate-300 animate-pulse rounded-md p-1">
              .
            </div>
            <div className="group w-fit flex-center gap-2 p-1 px-3 md:p-1.5 md:px-4 rounded-3xl cursor-pointer lg:hover:bg-primary active:scale-95 ease-in-out duration-300">
              {/* bg-primary md:bg-transparent active:bg-primary*/}
              <span className="text-md md:text-lg font-medium translate-x-0.5">
                View More
              </span>
              <IoIosArrowForward
                size={20}
                className="font-extralight group-active:translate-x-1.5 ease-in-out duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <SkeletonLoader />
      ) : (
        categories
          .slice(0, limit)
          .map((category) => (
            <ProductSection
              key={category._id}
              category={category.title}
              categorySlug={category.slug}
            />
          ))
      )}
    </div>
  );
};

export default ProductCategorySection;
