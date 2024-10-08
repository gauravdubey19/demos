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
      }, 1300); // Change image every 1.3 seconds
    }
    return () => clearInterval(interval);
  }, [hovering, card.images]);

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
            {!loading && card.images && card.images.length > 0 && (
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 flex transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    width: `100%`,
                  }}
                >
                  {card.images.map((image, index) => (
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
                {card.oldPrice && (
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
                          ((card.oldPrice - card.price) / card.oldPrice) * 100
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
                  itemExistInCart(card?._id) || card.quantityInStock < 1
                }
                size="sm"
                className={`w-full rounded-none hover:shadow-md disabled:opacity-80 disabled:animate-none text-lg ${
                  loading
                    ? "bg-gray-200 animate-pulse text-gray-200"
                    : card.quantityInStock < 1
                    ? "bg-red-500"
                    : !itemExistInCart(card?._id)
                    ? "bg-white backdrop-blur-md border border-[#FF6464] text-[#FF6464] duration-300"
                    : "bg-[#FF6464]"
                } ease-in-out`}
              >
                {card.quantityInStock < 1 ? (
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
            <div className="w-full h-fit flex gap-2 overflow-auto">
              {card.colorOptions.map((c, index) => (
                <div
                  key={index || c._id}
                  style={{ backgroundColor: c.color }}
                  title={c.title}
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

interface AddToBagPopUpProps {
  product: CardValues;
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
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [colorTitle, setColorTitle] = useState<string>("");
  const [isValuesSelected, setIsValuesSelected] = useState<{
    size: boolean;
    color: boolean;
    colorTitle: boolean;
  }>({
    size: false,
    color: false,
    colorTitle: false,
  });

  const handleAddToCartBtn = () => {
    setIsValuesSelected({
      size: size.trim() === "",
      color: color.trim() === "",
      colorTitle: colorTitle.trim() === "",
    });

    if (size.trim() !== "" && color.trim() !== "" && product._id) {
      handleAddToCart(
        product._id,
        product.title,
        product.slug,
        product.description,
        product.price,
        product.image_link,
        product.availableSizes,
        size,
        product.colorOptions,
        colorTitle,
        color,
        categorySlug,
        product?.quantityInStock,
        quantity
      );
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-full h-fit flex flex-col gap-8">
          <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
            {product.title}
          </DialogTitle>
          {/* Color & Size Selection and Buttons */}
          <div className="grid gap-4">
            {/* Color Selection */}
            <div className="grid gap-2">
              <label
                htmlFor="color"
                className={`text-base font-medium ${
                  isValuesSelected.color && "text-[red]"
                } ease-in-out duration-200`}
              >
                {!isValuesSelected.color
                  ? "Select color"
                  : "Please select color!"}
              </label>
              <div
                id="color-option"
                className={`w-full h-fit flex gap-2 ${
                  isValuesSelected.color && "animate-shake"
                }`}
              >
                {product.colorOptions.map((c) => (
                  <div
                    key={c._id}
                    title={c.title}
                    onClick={() => {
                      setColorTitle(c.title);
                      setColor(c.color);
                      setIsValuesSelected((prev) => ({
                        ...prev,
                        color: false,
                      }));
                    }}
                    style={{ backgroundColor: c.color }}
                    className={`w-10 h-10 rounded-full flex-center border-2 select-none ${
                      itemExistInCart(product._id)
                        ? "cursor-not-allowed opacity-40"
                        : colorTitle === c.title
                        ? "border-primary shadow-lg scale-105 cursor-not-allowed"
                        : "hover:border-primary cursor-pointer"
                    } ${
                      isValuesSelected.color && "border-[red]"
                    } ease-in-out duration-300`}
                  ></div>
                ))}
              </div>
            </div>
            {/* Size Selection */}
            <div className="grid gap-2">
              <label
                htmlFor="size"
                className={`text-base font-medium ${
                  isValuesSelected.size && "text-[red]"
                } ease-in-out duration-200`}
              >
                {!isValuesSelected.size ? "Select size" : "Please select size!"}
              </label>

              <div
                id="size-option"
                className={`w-full h-fit flex gap-2 ${
                  isValuesSelected.size && "animate-shake"
                }`}
              >
                {product.availableSizes.map((s) => (
                  <div
                    key={s}
                    onClick={() => {
                      if (!itemExistInCart(product._id)) {
                        setSize(s);
                        setIsValuesSelected((prev) => ({
                          ...prev,
                          size: false,
                        }));
                      }
                    }}
                    className={`w-10 h-10 rounded-full flex-center border select-none ${
                      itemExistInCart(product._id)
                        ? "cursor-not-allowed opacity-40"
                        : size === s
                        ? "border-primary shadow-lg scale-105 cursor-not-allowed"
                        : "hover:border-primary cursor-pointer"
                    } ${
                      isValuesSelected.size && "border-[red]"
                    } ease-in-out duration-300`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span
                className={`text-sm py-2 px-2 ${
                  product.quantityInStock > 5
                    ? "text-green bg-emerald-50"
                    : "text-red-500 bg-red-50"
                }`}
              >
                {product.quantityInStock > 0
                  ? product.quantityInStock < 5
                    ? "Hurry Up! Only " + product.quantityInStock
                    : product.quantityInStock
                  : "No "}{" "}
                products available in stock
              </span>
              <span>
                {itemExistInCart(product._id) && (
                  <span className="text-red-500 text-sm">Already in cart</span>
                )}
              </span>
            </div>
            <div className="w-fit flex-between gap-2">
              <ReactCountUp
                className="text-md"
                prefix="₹"
                amt={product.price}
                decimals={true}
              />
              <span className="text-sm select-none text-primary">x</span>
              <span className="text-md select-none">{quantity}</span>
            </div>
            <ReactCountUp
              className="text-primary text-xl"
              prefix="₹"
              amt={product.price * quantity}
              decimals={true}
            />
            {/* Action Buttons */}
            <div className="flex gap-2">
              <div className="flex-center gap-2 select-none">
                <Button
                  onClick={() => setQuantity((prev) => prev - 1)}
                  disabled={quantity === 1}
                  size="icon"
                  className="bg-transparent"
                >
                  <AiOutlineMinus color="#000" />
                </Button>
                <span className="text-sm text-primary select-none">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={quantity === product.quantityInStock}
                  className="bg-transparent"
                >
                  <AiOutlinePlus color="#000" />
                </Button>
              </div>
              <Button
                disabled={
                  itemExistInCart(product._id) || product.quantityInStock === 0
                }
                onClick={handleAddToCartBtn}
                size="lg"
                className="w-full select-none z-10 flex gap-1 bg-transparent text-lg text-primary border border-primary rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
              >
                {itemExistInCart(product._id) ? (
                  "Added to cart"
                ) : (
                  <>
                    Add to cart <span className="text-2xl">+</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
