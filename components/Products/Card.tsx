"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardDetails } from "@/lib/types";
import { IoMdStar } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useCart } from "@/context/CartProvider";
import { Button } from "../ui/button";
import discount from "@/public/images/discount.png";

const Card: React.FC<CardDetails> = ({ card, category, loading = false }) => {
  const [reviews, setReviews] = useState<number>(0);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const {
    handleAddProductToWhistlist,
    handleRemoveProductFromWishlist,
    productExistInWishlist,
  } = useCart();


  useEffect(() => {
    const getReviews = () => {
      if (!card._id) return;
      setReviews(card.reviewsNumber ?? 0);
      setAvgRating(Number(card.ratings?.toFixed(1)) ?? 0);
    };
    if (card._id) getReviews();
  }, [card]);

  useEffect(() => {
    let interval: any;
    // Check if card has at least 2 images
    if (!card.images || card.images.length < 2) return;

    if (hovering) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (!card.images) return 0;
          return (prevIndex + 1) % card.images.length;
        });
      }, 2000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [hovering, card.images]);

  return (
    <div
      className="h-fit w-full max-w-[198px] md:max-w-[260px] group bg-white border border-[#E9D7D7] scale-90 hover:scale-95 hover:shadow-lg ease-in-out duration-300 overflow-hidden cursor-pointer rounded"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/products/${category}/${card.slug}`}>
        <div className="relative h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] w-full flex-center select-none overflow-hidden">
          {!loading && (
            <div
              onClick={() => {
                if (card._id) {
                  return !productExistInWishlist(card._id)
                    ? handleAddProductToWhistlist(card._id)
                    : handleRemoveProductFromWishlist(card._id);
                }
              }}
              className="absolute group md:hidden top-1 right-1 z-10 cursor-pointer w-8 h-8 flex-center bg-white/50 backdrop-blur-md p-1 rounded-full shadow-[0_0_1.5px_black] ease-in-out duration-300"
            >
              {card._id && !productExistInWishlist(card._id) ? (
                <GoHeart
                  size={20}
                  color="#FF6464"
                  className="group-hover:scale-110"
                />
              ) : (
                <GoHeartFill
                  size={20}
                  color="#FF6464"
                  className="group-hover:scale-110"
                />
              )}
            </div>
          )}
          { !loading &&
          <div className={`hidden md:block absolute -bottom-12 group-hover:bottom-0 group-hover:animate-slide-up left-0 right-0 z-50 w-full p-1 ease-out duration-300`}>
            <Button
              onClick={() => {
                if (card._id) {
                  return !productExistInWishlist(card._id)
                    ? handleAddProductToWhistlist(card._id)
                    : handleRemoveProductFromWishlist(card._id);
                }
              }}
              size="sm"
              className={`w-full text-lg rounded hover:shadow-md ${
                card._id && !productExistInWishlist(card._id)
                  ? "bg-white backdrop-blur-md border border-[#FF6464] text-[#FF6464]"
                  : "bg-[#FF6464]"
              }`}
            >
              {card._id && !productExistInWishlist(card._id) ? (
                <span className="flex-center gap-1 py-1">
                  <GoHeart color="#FF6464" className="group-hover:scale-110 mr-1" />
                  Wishlist
                </span>
              ) : (
                <span className="flex-center gap-1 py-1">
                  <GoHeartFill
                    color="white"
                    className="group-hover:scale-110 mr-1"
                  />
                  Wishlisted
                </span>
              )}
            </Button>
          </div>
          }
          <div
            className={`w-full h-full relative ${
              loading
                ? "bg-gray-300 animate-pulse"
                : " ease-in-out duration-300"
            }`}
          >
            {!loading && card.images && card.images.length > 0 && (
              <div className="relative w-full h-full">
              <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out group-hover:scale-105"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)`, width: `100%` }}>
                {card.images.map((image, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0">
                    <Image
                      src={image}
                      alt={card.title}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
                {/* discount svg overlaying the image */}
               
              </div>
               
               { card.oldPrice &&
              <div className="absolute -top-20 left-1 z-10 duration-300 ease-in-out group-hover:top-2">
                <Image
                  src={discount}
                  alt="Discount"
                  width={50}
                  height={50}
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 bottom-0 right-0 z-10 text-white text-xs text-center w-full flex items-center justify-center">
                  <span>
                    - {Math.round(((card.oldPrice-card.price)/card.oldPrice)*100)}% <br /> off
                  </span>
                  </div>
              </div>
              }
              </div>
            )}
          </div>
        </div>
        <div className="h-auto w-full flex justify-between flex-col gap-1 p-1.5 md:px-2.5 mb-0.5 md:mb-1 overflow-hidden">
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
                <div className="flex flex-row gap-2">
                  {reviews ? (
                    <>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                          <IoMdStar
                            key={index}
                            size={15}
                            className={
                              index < Math.floor(avgRating)
                                ? "fill-primary"
                                : "fill-gray-500"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold">
                        {avgRating}{" "}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold">No reviews</span>
                  )}
                </div>
              )}
              {reviews > 0 && (
                <>
                  |{" "}
                  <span
                    className={`line-clamp-1 ${
                      loading &&
                      "mt-1 w-20 h-2 md:h-3 bg-gray-200 animate-pulse"
                    }`}
                  >
                    {!loading && reviews + " reviews"}
                  </span>
                </>
              )}
            </div>
            <div
              className={`w-full text-[11px] md:text-xs text-[#818181] line-clamp-1 ${
                loading ? "mt-2 h-7 bg-gray-200 animate-pulse" : "h-fit"
              }`}
            >
              {!loading && card.description}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-end">
            <span
              className={`${
                loading && "w-20 h-5 md:h-7 bg-gray-200 animate-pulse"
              } text-lg md:text-xl font-bold`}
            >
              {!loading && "₹" + card.price}
            </span>
            {card.oldPrice && (
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-xs md:text-md line-through text-gray-400 ${
                    loading &&
                    "mt-1 lg:mt-0 w-14 h-3 md:h-5 bg-gray-200 animate-pulse"
                  }`}
                >
                  {!loading && "₹" + card.oldPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;