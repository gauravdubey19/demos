import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  loading: boolean;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  activeSlide,
  index,
  className,
  loading = true,
}) => {
  return (
    <div className={`px-2 sm:px-4 py-10 ${className}`}>
      <div
        className={`relative transition-all flex items-center justify-center flex-col duration-300 ${
          activeSlide === index
            ? "opacity-100 scale-100 sm:scale-100"
            : "opacity-50 scale-90 sm:scale-50"
        }`}
      >
        {loading ? (
          <div className="w-full h-[10rem] md:h-[15rem] lg:h-[20rem] bg-gray-300 animate-pulse overflow-hidden" />
        ) : (
          <Image
            src={item.image}
            alt={`Slide ${index + 1}`}
            width={400}
            height={400}
            className="w-full h-[10rem] md:h-[15rem] lg:h-[20rem] object-contain ease-in-out transition-all duration-300"
          />
        )}

        <div className="flex items-center flex-col gap-3 w-full sm:w-[70%] mt-4">
          <div className="flex items-center flex-col text-center w-full">
            {loading ? (
              <div className="h-6 w-3/4 bg-gray-300 animate-pulse mb-2" />
            ) : (
              activeSlide === index && (
                <h1 className="text-lg md:text-xl font-semibold line-clamp-1 w-full animate-slide-up">
                  {item?.title}
                </h1>
              )
            )}
            {loading ? (
              <div className="h-4 w-full bg-gray-300 animate-pulse" />
            ) : (
              activeSlide === index && (
                <p className="text-sm text-gray-600 animate-slide-up">
                  {/* {item?.description} */}
                </p>
              )
            )}
          </div>

          {loading ? (
            <div className="h-10 w-full max-w-xs bg-gray-300 animate-pulse mt-2" />
          ) : (
            activeSlide === index && (
              <Link
                href={`/products/${item?.slug}`}
                className="animate-slide-up"
              >
                <Button className="mt-2 w-full max-w-xs transition-all duration-300 bg-primary rounded-none">
                  View More
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
