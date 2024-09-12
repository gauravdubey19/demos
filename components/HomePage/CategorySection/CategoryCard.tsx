import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// 

interface CategoryCardProps {
  item: {
    _id: string;
    title: string;
    description?: string;
    slug: string;
    image: string;
  };
  activeSlide: number;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  activeSlide,
  index,
}) => {
  return (
    <div className="px-2 sm:px-4 py-10">
      <div
        className={`relative transition-all flex items-center justify-center flex-col duration-300 ${
          activeSlide === index
            ? "opacity-100 scale-100 sm:scale-100"
            : "opacity-50 scale-90 sm:scale-50"
        }`}
      >
          <Image
            src={item.image}
            alt={`Slide ${index + 1}`}
            width={400}
            height={400}
            className="w-full h-auto max-h-[20rem] object-contain transition-all duration-300"
          /> 
        {/* <Image
          src={item.image }
          alt={`Slide ${index + 1}`}
          width={400}
          height={400}
          className="w-full h-auto max-h-[20rem] object-contain transition-all duration-300"
        />  */}
        <div className="flex items-center flex-col gap-3 w-full sm:w-[70%] mt-4">
          <div className="flex items-center flex-col text-center">
            <h1 className="text-lg font-semibold">{item?.title}</h1>
            <p className="text-sm text-gray-600">{item?.description}</p>
          </div>

          <Link href={`/products/${item?.slug}`}>
            <Button className="mt-2 w-full max-w-xs transition-all duration-300 bg-primary rounded-none">
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
