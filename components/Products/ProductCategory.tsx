"use client";

import React, { useEffect, useState } from "react";
import { reverseSlug } from "@/lib/utils";
import { CardValues, ProductCategoryProps } from "@/lib/types";
import Card from "./Card";
import Filter from "./Filter";
import Goback from "../ui/Goback";
import Loader from "../ui/Loader";

const ProductCategory: React.FC<ProductCategoryProps> = ({ category }) => {
  const [products, setProducts] = useState<CardValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/read/get-products-by-category/${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        // console.log(data);
        setProducts(data as CardValues[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (products.length === 0) fetchProducts();
  }, [category, products]);

  if (loading) return <Loader />;
  return (
    <>
      <section className="relative w-full mt-[60px] py-4 overflow-hidden">
        <Goback />
        <Filter />
        <div className="mt-10 md:mt-0 w-full px-2 md:px-10 lg:px-14">
          <div className="md:ml-2 text-xl lg:text-2xl font-bold px-2 md:px-0">
            {reverseSlug(category)}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-6">
            {products.map((card, index) => (
              <Card key={index} card={card} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
