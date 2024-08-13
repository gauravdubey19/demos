import React from "react";
import Link from "next/link";
import Carousel from "./Carousel";
import Card from "./Card";
import { IoArrowForwardSharp } from "react-icons/io5";
import { ProductProps } from "@/lib/types";

const Product: React.FC<ProductProps> = ({ productName, href, carousel }) => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="w-full pt-4 pb-2 px-2 md:px-6 lg:px-8 flex-between">
          <div className="text-2xl font-bold">{productName}</div>
          <Link
            href={href}
            className="group w-fit flex-center gap-2 p-2 px-4 rounded-3xl cursor-pointer active:bg-slate-800 lg:hover:bg-slate-800 active:scale-95 ease-in-out duration-300"
          >
            <span className="text-md font-medium">View More</span>
            <div className="">
              <IoArrowForwardSharp
                size={25}
                className="group-active:translate-x-1.5 ease-in-out duration-300"
              />
            </div>
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

export default Product;
