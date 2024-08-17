import React from "react";
import Carousel from "./Carousel";
import Card from "./Card";
import { ProductCategoryProps } from "@/lib/types";

const ProductCategory: React.FC<ProductCategoryProps> = ({
  category,
  products,
}) => {
  return (
    <>
      <section className="relative w-full py-4 overflow-hidden">
        <div className="fixed top-[3.7rem] right-0 z-10 w-full md:w-[20%] md:h-screen bg-primary flex-center text-3xl">
          Filter
        </div>
        <div className="mt-6 md:mt-0 md:w-[80%] w-full px-2 md:px-6 lg:px-8">
          <div className="text-xl lg:text-2xl font-bold">{category}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
            {products &&
              products.map((card, index) => <Card key={index} card={card} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
