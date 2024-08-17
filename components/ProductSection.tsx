import React from "react";
import Link from "next/link";
import Carousel from "./Carousel";
import Card from "./Card";
import { GoArrowRight } from "react-icons/go";
import { ProductSectionProps } from "@/lib/types";

const ProductSection: React.FC<ProductSectionProps> = ({
  category,
  href,
  carousel,
}) => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="w-full pt-4 pb-2 px-2 md:px-6 lg:px-8 flex-between">
          <div className="text-xl lg:text-2xl font-bold">
            {category}
          </div>
          <Link
            href={href}
            className="group w-fit flex-center gap-2 p-1 px-3 md:p-2 md:px-4 rounded-3xl cursor-pointer bg-primary md:bg-transparent active:bg-primary lg:hover:bg-primary active:scale-95 ease-in-out duration-300"
          >
            <span className="text-md md:text-lg font-medium">View More</span>
            <GoArrowRight
              size={25}
              className="font-extralight group-active:translate-x-1.5 ease-in-out duration-300"
            />
          </Link>
        </div>
        <Carousel>
          {carousel &&
            carousel.map((card, index) => <Card key={index} card={card} />)}
        </Carousel>
      </div>
    </>
  );
};

export default ProductSection;
