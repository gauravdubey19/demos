"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "../ui/Carousel";
import Card from "./Card";
import { CardValues, ProductSectionProps } from "@/lib/types";
import { IoIosArrowForward } from "react-icons/io";

const ProductSection: React.FC<ProductSectionProps> = ({
  category,
  categorySlug,
}) => {
  const [products, setProducts] = useState<CardValues[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/read/get-products-by-category/${categorySlug}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        // console.log(data);
        setProducts(data as CardValues[]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (products.length <= 0) fetchProducts();
  }, [categorySlug, products.length]);

  return (
    <>
      <section className="w-full lg:h-[calc(100vh-60px)] bg-white flex justify-center flex-col pt-3 px-2 md:px-6 lg:px-8 overflow-hidden">
        <div className="w-full flex-between">
          <div className="text-xl lg:text-2xl font-bold">{category}</div>
          <Link
            href={`/products/${categorySlug}`}
            className="group w-fit flex-center gap-2 p-1 px-3 md:p-1.5 md:px-4 rounded-3xl cursor-pointer lg:hover:bg-primary active:scale-95 ease-in-out duration-300"
          >
            {/* bg-primary md:bg-transparent active:bg-primary*/}
            <span className="text-md md:text-lg font-medium translate-x-0.5">
              View More
            </span>
            <IoIosArrowForward
              size={20}
              className="font-extralight group-active:translate-x-1.5 ease-in-out duration-300"
            />
          </Link>
        </div>
        <Carousel>
          {products.map((card, index) => (
            <Card key={index || card._id} card={card} category={categorySlug} />
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default ProductSection;
