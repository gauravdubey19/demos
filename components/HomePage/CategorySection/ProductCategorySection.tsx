"use client";

import ProductSection from "@/components/Products/ProductSection";
import { cardList } from "@/lib/data";
import { CardValues, CategoryValues } from "@/lib/types";
import React, { useEffect, useState } from "react";

const ProductCategorySection: React.FC<{ limit?: number }> = ({
  limit = 3,
}) => {
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  const [products, setProducts] = useState<CardValues[]>([]);

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

        setCategories(data.categories as CategoryValues[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/read/get-all-products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        // console.log(data.products);
        setProducts(data.products as CardValues[]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      {categories.slice(0, limit).map((item, index) => (
        <ProductSection
          key={item._id}
          category={item.title}
          categorySlug={item.slug}
          carousel={products}
        />
      ))}
    </>
  );
};

export default ProductCategorySection;
