"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardDetails, CardValues } from "@/lib/types";
import { IoMdStar } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useCart } from "@/context/CartProvider";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ReactCountUp from "../ui/ReactCountUp";

const Card: React.FC<CardDetails> = ({ card, category, loading = false }) => {
  const [reviews, setReviews] = useState<number>(0);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [hovering, setHovering] = useState<boolean>(false);
  const [addToBag, setAddToBag] = useState<boolean>(false);
  const {
    handleAddProductToWhistlist,
    handleRemoveProductFromWishlist,
    productExistInWishlist,
    itemExistInCart,
  } = useCart();
  // wishlisting,
  // useEffect(() => {
  //   console.log("Card: ", card);
  // }, [card]);
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
    if (!card.images_collection || !card.images_collection[0].images || card.images_collection[0].images.length < 2) return;

    if (hovering) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (!card.images_collection[0].images) return 0;
          return (prevIndex + 1) % card.images_collection[0].images.length;
        });
      }, 1300); // Change image every 1.3 seconds
    }
    return () => clearInterval(interval);
  }, [hovering, card.images_collection]);
if(card.sell_on_google_quantity < 1){
  console.log("Out of stock");
  return null;
}
  return (
    <>
      <div
        className="h-fit w-full max-w-[198px] md:max-w-[260px] group bg-white border border-[#E9D7D7] scale-90 hover:scale-95 hover:shadow-lg ease-in-out duration-300 overflow-hidden cursor-pointer rounded"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {!loading && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (card._id) {
                return !productExistInWishlist(card._id)
                  ? handleAddProductToWhistlist(card._id)
                  : handleRemoveProductFromWishlist(card._id);
              }
            }}
            className="absolute group top-1.5 right-1.5 lg:-right-20 lg:group-hover:right-1.5 z-10 cursor-pointer w-8 h-8 flex-center bg-white/50 backdrop-blur-md p-1 rounded-full shadow-[0_0_1.5px_black] ease-in-out duration-300"
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
        <div className="relative h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] w-full flex-center select-none overflow-hidden">
          <Link
            // className="w-full h-full relative"
            href={`/products/${category}/${card.slug}`}
            className={`w-full h-full relative ${
              loading
                ? "bg-gray-300 animate-pulse"
                : " ease-in-out duration-300"
            }`}
          >
            {!loading && card.images_collection[0].images && card.images_collection[0].images.length > 0 && (
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 flex transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    width: `100%`,
                  }}
                >
                  {card.images_collection[0].images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <Image
                        src={image}
                        alt={card.title}
                        width={600}
                        height={600}
                        loading="lazy"
                        className="w-full h-full object-cover object-center animate-slide-down"
                      />
                    </div>
                  ))}
                </div>

                {/* discount svg overlaying the image */}
                {card.salePrice && (
                  <div className="absolute z-10 left-1.5 top-1.5 lg:-top-20 lg:group-hover:top-1.5 ease-in-out duration-300">
                    <Image
                      src="/images/discount.png"
                      alt="Discount"
                      width={50}
                      height={50}
                      loading="lazy"
                    />
                    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 text-white text-xs text-center w-full flex items-center justify-center">
                      <span>
                        -
                        {Math.round(
                          ((card.salePrice - card.price) / card.salePrice) * 100
                        )}
                        %
                        <br /> off
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* </div> */}
          </Link>

          {!loading && card?._id && (
            <div className="absolute z-50 left-0 right-0 bottom-1.5 lg:-bottom-40 group-hover:bottom-1.5 px-1.5 w-full h-fit ease-in-out duration-300">
              <Button
                type="button"
                onClick={() => setAddToBag(!addToBag)}
                disabled={
                  itemExistInCart(card?._id) || card.sell_on_google_quantity < 1
                }
                size="sm"
                className={`w-full rounded-none hover:shadow-md disabled:opacity-80 disabled:animate-none text-lg ${
                  loading
                    ? "bg-gray-200 animate-pulse text-gray-200"
                    : card.sell_on_google_quantity < 1
                    ? "bg-red-500"
                    : !itemExistInCart(card?._id)
                    ? "bg-white backdrop-blur-md border border-[#FF6464] text-[#FF6464] duration-300"
                    : "bg-[#FF6464]"
                } ease-in-out`}
              >
                {card.sell_on_google_quantity < 1 ? (
                  "Out of Stock"
                ) : itemExistInCart(card?._id) ? (
                  "Added to Cart"
                ) : (
                  <>
                    Add to Cart <span className="text-2xl">+</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        <Link
          className="relative z-20"
          href={`/products/${category}/${card.slug}`}
        >
          <div className="h-auto w-full flex justify-between flex-col gap-1 p-1.5 md:px-2.5 mb-0.5 md:mb-1 overflow-hidden bg-white">
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
                          {avgRating}
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
              {card.salePrice && (
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-xs md:text-md line-through text-gray-400 ${
                      loading &&
                      "mt-1 lg:mt-0 w-14 h-3 md:h-5 bg-gray-200 animate-pulse"
                    }`}
                  >
                    {!loading && "₹" + card.salePrice}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full h-fit flex gap-2 overflow-auto">
              {card.images_collection?.map((c, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: c.color }}
                  title={c.color_name}
                  className="w-6 h-6 rounded-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] mb-0.5"
                />
              ))}
            </div>
          </div>
        </Link>
      </div>
      {addToBag && (
        <AddToBagPopUp
          product={card}
          categorySlug={category}
          isOpen={addToBag}
          handleClose={() => setAddToBag(!addToBag)}
        />
      )}
    </>
  );
};

export default Card;

interface QuantityInfo {
  size: string;
  quantity: number;
}

interface AddToBagPopUpProps {
  product: any;
  categorySlug: string;
  isOpen: boolean;
  handleClose: () => void;
}

const AddToBagPopUp: React.FC<AddToBagPopUpProps> = ({
  product,
  categorySlug,
  isOpen,
  handleClose,
}) => {
  const { handleAddToCart, itemExistInCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isValuesSelected, setIsValuesSelected] = useState<{
    size: boolean;
    color: boolean;
  }>({
    size: true,
    color: false,
  });
useEffect(() => {
  console.log("Product: ",product);
}, [product]);
  // Handle adding to cart
  const handleAddToCartBtn = () => {
    setIsValuesSelected({
      size: selectedSize.trim() === "",
      color: selectedColorIndex === null,
    });

    if (selectedSize.trim() !== "" && selectedColorIndex !== null && product._id) {
      const selectedColor = product.images_collection[selectedColorIndex];
      const discount = product.sale_price
        ? Math.round(((product.sale_price - product.price) / product.sale_price) * 100)
        : 0;

      handleAddToCart(
        product.images_collection,
        discount,
        product._id,
        product.title,
        product.slug,
        product.description,
        product.price,
        selectedColor.image_link,
        // selectedColor.quantity.map((q: QuantityInfo) => q.size),
        selectedSize,
        // product.colorOptions,
        selectedColor.color_name,
        selectedColor.color,
        categorySlug,
        selectedColor.quantity.find((q: QuantityInfo) => q.size === selectedSize)?.quantity || 0,
        quantity
      );
      handleClose();
    }
  };

  // Get available sizes for the selected color
  const availableSizes = selectedColorIndex !== null
    ? product.images_collection[selectedColorIndex].quantity
      .filter((q: { quantity: number }) => q.quantity > 0)
      .map((q: { size: string }) => q.size)
    : [];

  // Get available quantity for selected size
  const availableQuantity = selectedColorIndex !== null && selectedSize
    ? product.images_collection[selectedColorIndex].quantity.find(
        (q: { size: string }) => q.size === selectedSize
      )?.quantity || 0
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-fit flex flex-col gap-8">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          {product.title}
        </DialogTitle>
        <div className="grid gap-4">
          {/* Color Selection */}
          <div className="grid gap-2">
            <label
              htmlFor="color"
              className={`text-base font-medium`}
            >
              Select color
            </label>
            <div id="color-option" className={`w-full h-fit flex gap-2 `}>
              {product.images_collection.map((colorOption: any, index: number) => {
                const totalQuantity = colorOption.quantity.reduce((sum: any, size: any) => sum + size.quantity, 0);
                return (
                  <div
                    key={index}
                    title={`${colorOption.color_name}${totalQuantity === 0 ? " (Out of Stock)" : ""}`}
                    onClick={() => {
                      if (totalQuantity > 0 && !itemExistInCart(product._id)) {
                        setSelectedColorIndex(index);
                        setSelectedSize(""); // Reset size when color changes
                        setQuantity(1); 
                        setIsValuesSelected((prev) => {
                          return ({ size:true, color: false });
                        })
                      }
                    }}
                    style={{ backgroundColor: colorOption.color }}
                    className={`w-10 h-10 rounded-full flex-center border-2 select-none ${
                      totalQuantity === 0
                        ? "cursor-not-allowed opacity-40"
                        : "hover:border-primary cursor-pointer"
                    } ${isValuesSelected.color && "border-[red]"} ease-in-out duration-300 ${selectedColorIndex === index ? "border-primary" : "border-gray-300"}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          {selectedColorIndex !== null && (
            <div className="grid gap-2">
              <label
                htmlFor="size"
                className={`text-base font-medium`}
              >
                Select Size
              </label>
              <div id="size-option" className={`w-full h-fit flex gap-2`}>
                {availableSizes.map((size: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsValuesSelected((prev) => ({ ...prev, size: false }));
                    }}
                    className={`px-4 py-2 border rounded cursor-pointer ${selectedSize === size ? "border-primary" : "border-gray-300"} ${isValuesSelected.size && "border-[red]"} ease-in-out duration-300`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Display */}
         {
          !isValuesSelected.size && !isValuesSelected.color &&
          <div className="flex flex-col gap-y-2">
            <span
              className={`text-sm py-2 px-2 ${
                availableQuantity > 5
                  ? "text-green bg-emerald-50"
                  : "text-red-500 bg-red-50"
              }`}
            >
              {availableQuantity > 0
                ? availableQuantity < 5
                  ? `Hurry Up! Only ${availableQuantity} left`
                  : `${availableQuantity} products available in stock`
                : "No products available in stock"}
            </span>
          </div>
        }

        <div className="flex flex-row gap-6  ">
          {/* Image Preview */}
            <Image
              src={product.images_collection[selectedColorIndex].image_link}
              alt={product.title}
              width={600}
              height={600}
              loading="lazy"
              className="w-[150px] h-[150px] object-cover object-top"
            />
          {/* Quantity Adjuster */}
          <div className="flex-center gap-2 select-none ">
            <span className="text-lg">Quantity: </span>
            <Button
              onClick={() => setQuantity((prev) => prev - 1)}
              disabled={quantity === 1 || selectedSize === ""}
              size="icon"
              className="bg-transparent"
            >
              <AiOutlineMinus color="#000" size={22} />
            </Button>
            <span className="text-lg text-primary select-none">{quantity}</span>
            <Button
              size="icon"
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={quantity === availableQuantity || selectedSize === ""}
              className="bg-transparent"
            >
              <AiOutlinePlus color="#000" size={22} />
            </Button>
          </div>
        </div>

          {/* Add to Cart Button */}
          <Button
            disabled={
              itemExistInCart(product._id) || availableQuantity === 0
            }
            onClick={handleAddToCartBtn}
            size="lg"
            className="w-full select-none z-10 flex gap-1 bg-transparent text-lg text-primary border border-primary rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
          >
            {itemExistInCart(product._id) ? "Added to cart" : "Add to cart +"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


