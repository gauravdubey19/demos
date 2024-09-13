"use client";

import React, { useEffect, useState } from "react";
import { CardValues, ProductCategoryProps } from "@/lib/types";
import MobileFilter from "./MobileFilter";
import Card from "./Card";
import { reverseSlug } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { LiaFilterSolid } from "react-icons/lia";

const ProductCategory: React.FC<ProductCategoryProps> = ({ category }) => {
  const [products, setProducts] = useState<CardValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

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
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };

    fetchProducts();
  }, [category]);
  return (
    <>
      <section className="relative w-full mt-[60px] py-4 overflow-hidden">
        <Filter />
        <div className="mt-6 md:mt-0 w-full px-2 md:px-6 lg:px-8">
          <div className="text-xl lg:text-2xl font-bold">
            {reverseSlug(category)}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 md:gap-6">
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

const Filter = () => {
  return (
    <>
      <MobileFilter />
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            title="Filter"
            className="absolute top-2 right-5 flex-center rounded-full p-2 hover:scale-105 hover:shadow-lg ease-in-out duration-300"
          >
            <LiaFilterSolid size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="backdrop-blur-lg bg-transparent border-none outline-none shadow-[0_0_20px_rgba(0,0,0,0.5)] text-white">
          <DrawerHeader className="text-3xl font-semibold">Filter</DrawerHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-transparent p-4 h-[calc(100vh-200px)] overflow-y-auto">
            <CategoryFilter />
            <ColorFilter />
            <SizeFilter />
            <PriceFilter />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const CategoryFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Categories</h3>
    <ul className="space-y-2">
      {["Shirts", "Pants", "Dresses"].map((category) => (
        <li key={category}>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>{category}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const ColorFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Colors</h3>
    <div className="flex flex-wrap gap-2">
      {[
        { name: "Light Gray", colorClass: "bg-gray-200" },
        { name: "Gray", colorClass: "bg-gray-400" },
        { name: "Dark Gray", colorClass: "bg-gray-600" },
      ].map(({ name, colorClass }) => (
        <button
          key={name}
          className={`w-8 h-8 rounded-full ${colorClass}`}
          title={name}
        />
      ))}
    </div>
  </div>
);

const SizeFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Sizes</h3>
    <ul className="space-y-2">
      {["Small", "Medium", "Large"].map((size) => (
        <li key={size}>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>{size}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const PriceFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Price Range</h3>
    <div className="flex flex-col gap-2">
      <label className="flex items-center space-x-2">
        <span>Min:</span>
        <input
          type="number"
          className="form-input w-24 bg-inherit outline-none ring-0"
          placeholder="0"
        />
      </label>
      <label className="flex items-center space-x-2">
        <span>Max:</span>
        <input
          type="number"
          className="form-input w-24 bg-inherit outline-none ring-0"
          placeholder="1000"
        />
      </label>
    </div>
  </div>
);
