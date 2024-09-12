"use client";

import ProductSection from "@/components/Products/ProductSection";
import { CategoryValues } from "@/lib/types";
import React, { useEffect, useState } from "react";

const ProductCategorySection: React.FC<{ limit?: number }> = ({
  limit = 3,
}) => {
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  // console.log(categories);

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
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length <= 0) fetchCategories();
  }, [categories.length]);

  return (
    <>
      {categories.slice(0, limit).map((category) => (
        <ProductSection
          key={category._id}
          category={category.title}
          categorySlug={category.slug}
        />
      ))}
    </>
  );
};

export default ProductCategorySection;
