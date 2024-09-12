"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardDetails } from "@/lib/types";
import { Button } from "../ui/button";
import { IoMdStar } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { calculateDiscount } from "@/lib/utils";
import CardSkeleton from "./CardSkeleton";

const Card: React.FC<CardDetails> = ({ card, category, loading = false }) => {
  // console.log(card);

  const [fav, setFav] = useState<boolean>(false);
  return (
    <>
      {/* Link href={"#"} */}
      <div className="h-[405px] md:h-[390px] lg:h-[508px] w-full max-w-[198px] md:max-w-[260px] group bg-white border border-[#E9D7D7] scale-90 hover:scale-95 hover:shadow-lg ease-in-out duration-300 overflow-hidden">
        <div className="relative h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] w-full flex-center select-none overflow-hidden">
          {!loading && (
            <div
              onClick={() => setFav(!fav)}
              className="absolute top-1 right-1 z-10 cursor-pointer w-8 h-8 flex-center bg-white/50 backdrop-blur-md p-1 rounded-full shadow-[0_0_1.5px_black] hover:scale-105 ease-in-out duration-300"
            >
              {!fav ? (
                <GoHeart size={20} color="#FF6464" />
              ) : (
                <GoHeartFill size={20} color="#FF6464" />
              )}
            </div>
          )}
          <Link
            href={`/products/${category}/${card.slug}`}
            className={`w-full h-full ${
              loading
                ? "bg-gray-300 animate-pulse"
                : "group-hover:scale-105 ease-in-out duration-300"
            }`}
          >
            {!loading && (
              <Image
                src={card.mainImage}
                alt={card.title}
                width={600}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover scale-105 group-hover:scale-95 ease-in-out duration-300"
              />
            )}
          </Link>
        </div>
        <div className="h-auto w-full flex justify-between flex-col gap-1 p-1.5 md:px-2.5 overflow-hidden">
          <div className="">
            <div
              className={`${
                loading ? "h-4 md:h-7 bg-slate-200 animate-pulse" : "h-fit"
              } w-full text-lg md:text-xl font-semibold line-clamp-1`}
            >
              {!loading && card.title}
            </div>
            <div className="h-fit w-full text-[11px] text-xs font-light text-[#818181] flex gap-1">
              {loading ? (
                <span className="mt-1 w-24 h-2 md:h-3 bg-gray-200 animate-pulse"></span>
              ) : (
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <IoMdStar
                      key={index}
                      size={15}
                      className={
                        //
                        index < 3 ? "fill-primary" : "fill-gray-500"
                      }
                    />
                  ))}
                </span>
              )}
              |{" "}
              <span
                className={`line-clamp-1 ${
                  loading && "mt-1 w-20 h-2 md:h-3 bg-gray-200 animate-pulse"
                }`}
              >
                {!loading && "0 reviews"}
                {/* | {card.reviews.length} reviews */}
              </span>
            </div>
            <div
              className={`w-full text-[11px] md:text-xs text-[#818181] line-clamp-2 ${
                loading ? "mt-2 h-7 bg-gray-200 animate-pulse" : "h-fit"
              }`}
            >
              {!loading && card.description}
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <span
              className={`${
                loading && "w-20 h-5 md:h-7 bg-gray-200 animate-pulse"
              } text-lg md:text-xl font-bold`}
            >
              {!loading && "₹" + card.price}
            </span>
            <div
              className={`relative text-sm md:text-md text-gray-400 ${
                loading && "w-14 h-3 md:h-5 bg-gray-200 animate-pulse"
              }`}
            >
              {!loading && (
                <>
                  <span className="absolute top-[50%] w-full h-[1px] bg-gray-500"></span>
                  {"₹" + card.oldPrice}
                </>
              )}
            </div>
            <span
              className={`text-sm md:text-md text-[#2CD396] ${
                loading && "w-14 h-3 md:h-5 bg-gray-200 animate-pulse"
              }`}
            >
              {!loading &&
                "(" + calculateDiscount(card.price, card.oldPrice) + "% off)"}
            </span>
          </div>
          {/* <div className="w-full flex gap-2"> */}
          {/* <Link href={`/products/category/${card.head}`} className="w-full">
              <Button
                size="sm"
                className="w-full bg-transparent border border-primary text-primary font-light rounded-none hover:shadow-md transition-transform duration-300"
              >
                View More
              </Button>
            </Link> */}
          <Button
            size="sm"
            className={`w-full font-light rounded-none hover:shadow-md active:translate-y-0.5 ${
              loading
                ? "bg-gray-200 animate-pulse text-gray-200"
                : "text-white bg-primary duration-300"
            } ease-in-out`}
          >
            Add to cart
          </Button>
          {/* <div className="lg:hidden flex items-center">
              <MdOutlineAddShoppingCart size={25} className="text-primary" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Card;
