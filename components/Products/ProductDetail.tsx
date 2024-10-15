"use client";
//

//
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { calculateDiscount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ImageMagnify from "../ui/ImageMagnify";
import Loader from "../ui/Loader";
import { IoMdStar, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  AdditionalInfoProps,
  DetailsProps,
  ImageGalleryProps,
  ProductDetailValues,
  ProductReviewsProps,
} from "@/lib/types";
import { Send } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { useCart } from "@/context/CartProvider";
import ReactCountUp from "../ui/ReactCountUp";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Review, useGlobalContext } from "@/context/GlobalProvider";
import Breadcrumbs from "../ui/Breadcrumbs";
import ImageCarousel from "../ui/ImagesCarousel";

const ProductDetail: React.FC<{ slug: string; categorySlug: string }> = ({
  slug,
  categorySlug,
}) => {
  const [product, setProduct] = useState<ProductDetailValues | null>(null);
  const { fetchReviews } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!product) return;
    const getReviews = async () => {
      setReviewLoading(true);
      try {
        const reviews = await fetchReviews(product?._id);

        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewLoading(false);
      }
    };

    if (product?._id) getReviews();
  }, [fetchReviews, product]);
  useEffect(() => {
    let avgRating = 0;
    if (reviews.length > 0) {
      reviews.forEach((review) => {
        avgRating += review.rating;
      });
      avgRating = avgRating / reviews.length;
      avgRating = Number(avgRating.toFixed(1));
      console.log("avgRating: ", avgRating);
    } else {
      avgRating = 0; // or any default value you prefer
    }
    setAvgRating(avgRating);
  }, [reviews]);

  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/products/read/get-product-by-slug/${slug}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    // if (!product)
    fetchProductBySlug();
  }, [slug]);

  if (loading) return <Loader />;

  if (!product) {
    return <div>Product not found</div>;
  }

  // console.log(product);

  return (
    <>
      <section className="w-full h-full max-w-6xl px-4 py-10 mx-auto">
        <div className="w-full h-full mt-8 lg:mt-[80px] xl:mt-10">
          <Breadcrumbs />
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-12 items-start lg:mt-2">
            <ImageGalleryMobile images={product.images} />
            <ImageGallery
              images={product.images}
              initialImageLink={product.image_link}
            />
            <Details
              product={product}
              categorySlug={categorySlug}
              avgRating={avgRating}
              reviewsLength={reviews.length}
            />
          </div>
          <ProductReviews
            productId={product._id}
            reviews={reviews}
            setReviews={setReviews}
            loading={reviewLoading}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;

const ImageGalleryMobile: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <>
      <div className="md:hidden w-fit overflow-hidden">
        <ImageCarousel slidesToShow={1} autoplay={false} dots>
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`image ${index}`}
              width={400}
              height={400}
              objectFit="contain"
              className="w-fit h-[60vh] object-contain cursor-default scale-[0.99] animate-slide-down"
            />
          ))}
        </ImageCarousel>
      </div>
    </>
  );
};
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialImageLink,
}) => {
  const [currentImage, setCurrentImage] = useState<string>(initialImageLink);
  const [showArrowLeft, setShowArrowLeft] = useState<boolean>(false);
  const [showArrowRight, setShowArrowRight] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 768
  );
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const scrollThumbnails = (direction: "left" | "right" | "up" | "down") => {
    if (thumbnailRef.current) {
      const scrollAmount = isMobileView
        ? direction === "left"
          ? -100
          : 100
        : direction === "up"
        ? -100
        : 100;
      if (isMobileView) {
        thumbnailRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        thumbnailRef.current.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (thumbnailRef.current) {
      const scrollLeft = thumbnailRef.current.scrollLeft;
      const scrollTop = thumbnailRef.current.scrollTop;
      const scrollWidth = thumbnailRef.current.scrollWidth;
      const clientWidth = thumbnailRef.current.clientWidth;
      const scrollHeight = thumbnailRef.current.scrollHeight;
      const clientHeight = thumbnailRef.current.clientHeight;

      setShowArrowLeft(isMobileView ? scrollLeft > 0 : scrollTop > 0);
      setShowArrowRight(
        isMobileView
          ? scrollLeft < scrollWidth - clientWidth
          : scrollTop < scrollHeight - clientHeight
      );
    }
  }, [isMobileView]);

  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  useEffect(() => {
    if (thumbnailRef.current) {
      thumbnailRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (thumbnailRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        thumbnailRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="hidden md:flex relative z-50 select-none lg:sticky lg:top-20 w-full h-full md:h-[50vh] lg:h-[85vh] flex-col gap-3 md:flex-row-reverse justify-between overflow-hidden lg:overflow-visible">
      <Image
        src={currentImage}
        alt="Product Image"
        width={800}
        height={800}
        objectFit="contain"
        className="lg:hidden h-[75%] w-full md:h-full md:w-[80%] object-contain overflow-hidden"
      />

      <ImageMagnify
        src={currentImage}
        alt="Product Image"
        zoomFactor={3}
        imageFit="cover"
        width="100%"
        height="100%"
        className="hidden lg:block lg:w-[80%] h-full relative"
      />

      <div className="relative w-full md:w-[20%] h-[20%] md:h-full">
        <div
          ref={thumbnailRef}
          className={`absolute h-full flex ${
            isMobileView ? "flex-row" : "flex-col"
          } gap-2 items-center overflow-scroll scroll-none`}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Preview thumbnail ${index + 1}`}
              onClick={() => setCurrentImage(image)}
              aria-label={`View Image ${index + 1}`}
              width={200}
              height={200}
              className={`cursor-pointer w-full h-fit ${
                currentImage === image &&
                "border border-primary shadow-md shadow-primary"
              }`}
            />
          ))}
        </div>

        {showArrowLeft && (
          <div
            onClick={() => scrollThumbnails(isMobileView ? "left" : "up")}
            className={`absolute top-0 z-10 flex-center group cursor-pointer ${
              isMobileView
                ? "-left-1 h-full w-10 bg-gradient-to-r from-white to-transparent"
                : "w-full h-16 bg-gradient-to-b from-white to-transparent"
            } ease-in-out duration-200`}
          >
            <IoIosArrowBack
              size={30}
              className={`${
                isMobileView
                  ? "group-active:scale-90 group-active:-translate-x-1"
                  : "rotate-90 group-hover:scale-110 group-active:-translate-y-1 group-active:-translate-x-1"
              } ease-in-out duration-300`}
            />
          </div>
        )}

        {showArrowRight && (
          <div
            onClick={() => scrollThumbnails(isMobileView ? "right" : "down")}
            className={`absolute bottom-0 z-10 flex-center group cursor-pointer ${
              isMobileView
                ? "-right-1 h-full w-10 bg-gradient-to-l from-white to-transparent"
                : "w-full h-16 bg-gradient-to-b from-transparent to-white"
            } ease-in-out duration-200`}
          >
            <IoIosArrowForward
              size={30}
              className={`${
                isMobileView
                  ? "group-active:scale-90 group-active:translate-x-1"
                  : "rotate-90 group-hover:scale-110 group-active:translate-y-1"
              } ease-in-out duration-300`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Details: React.FC<DetailsProps> = ({
  product,
  categorySlug,
  avgRating,
  reviewsLength,
}) => {
  const {
    handleAddToCart,
    itemExistInCart,
    isOpen,
    setOpen,
    handleAddProductToWhistlist,
    handleRemoveProductFromWishlist,
    productExistInWishlist,
  } = useCart();

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

    if (size.trim() !== "" && color.trim() !== "") {
      const quantity = 1;
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
        product.quantityInStock,
        quantity
      );
    }
  };

  const handleBuyNowBtn = () => {
    if (!itemExistInCart(product._id)) {
      if (
        colorTitle.trim() !== "" &&
        color.trim() !== "" &&
        size.trim() !== ""
      ) {
        setOpen(!isOpen);
      }
      handleAddToCartBtn();
    } else {
      setOpen(!isOpen);
    }
  };
  return (
    <>
      <div className="relative w-full h-full grid gap-3">
        <div
          onClick={() =>
            !productExistInWishlist(product._id)
              ? handleAddProductToWhistlist(product._id)
              : handleRemoveProductFromWishlist(product._id)
          }
          className="absolute group top-1 right-1 z-10 cursor-pointer w-8 h-8 flex-center bg-white/50 backdrop-blur-md p-1 rounded-full shadow-[0_0_1.5px_black] ease-in-out duration-300"
        >
          {!productExistInWishlist(product._id) ? (
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
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">
            {product.title}
          </h1>
          <p className="text-muted-foreground lg:text-lg md:text-md text-sm mt-2">
            {product.description}
          </p>
        </div>

        {/* Pricing and Discount */}
        <div className="flex items-end gap-2">
          <ReactCountUp
            prefix="₹"
            amt={product.price}
            decimals={true}
            className="text-4xl font-bold"
          />
          {product.oldPrice && (
            <ReactCountUp
              amt={calculateDiscount(product.price, product.oldPrice)}
              className="text-md text-[#2CD396] font-medium"
            >
              % off
            </ReactCountUp>
          )}
        </div>

        {/* Ratings and Reviews */}
        {reviewsLength > 0 ? (
          <div className="flex items-center gap-1 md:gap-4">
            <div className="flex items-center gap-0.5">
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
              <span className="text-sm font-semibold ml-2">{avgRating} </span>
            </div>
            |{" "}
            <div>
              <span className="text-primary">{reviewsLength ?? 0}</span> reviews
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground">No reviews yet</div>
        )}
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
                    setIsValuesSelected((prev) => ({ ...prev, color: false }));
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
                      setIsValuesSelected((prev) => ({ ...prev, size: false }));
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
          {/* Action Buttons */}
          <div className="grid gap-2">
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
            <Button
              disabled={product.quantityInStock === 0}
              onClick={handleBuyNowBtn}
              size="lg"
              className="w-full text-lg rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
            >
              Buy now
            </Button>
          </div>
        </div>
        {product && <AdditionalInfo product={product} />}
      </div>
    </>
  );
};

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ product }) => {
  return (
    <>
      {/* Additional Information */}
      <div className="bg-[#FFB4332E] text-sm text-primary text-justify p-4">
        Easy 10 days return and exchange. Return policies may vary based on
        products and promotions. For full details on our Returns Policies,
        please check our website.
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Product Details */}
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent className="bg-gray-100/50 text-sm p-4 rounded-md">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Material:</strong> {product.material}
              </li>
              {product.fabricType && (
                <li>
                  <strong>Fabric Type:</strong> {product.fabricType}
                </li>
              )}
              {product.careInstructions && (
                <li>
                  <strong>Care Instructions:</strong> {product.careInstructions}
                </li>
              )}
              <li>
                <strong>Origin:</strong> {product.origin}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Other Information */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Other Information</AccordionTrigger>
          <AccordionContent className="bg-gray-100/50 text-sm p-4 rounded-md">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Available Sizes:</strong>{" "}
                {product.availableSizes.join(", ")}
              </li>
              {/* <li>
                <strong>Color Options:</strong>{" "}
                {product.colorOptions.join(", ")}
              </li> */}
              <li>
                <strong>Country of Manufacture:</strong>{" "}
                {product.countryOfManufacture}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Service FAQs */}
        <AccordionItem value="item-3">
          <AccordionTrigger>Service FAQs</AccordionTrigger>
          <AccordionContent className="bg-gray-100/50 text-sm p-4 rounded-md">
            <ul className="list-disc pl-5 space-y-2">
              {product.faqs.map((faq, index) => (
                <li key={index}>
                  <strong>{faq.question}</strong> {faq.answer}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews,
  setReviews,
  loading,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [postingReview, setPostingReview] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>("");
  const [editingReview, setEditingReview] = useState(false);
  const [handleEditId, setHandleEditId] = useState<string | null>(null);
  const { fetchedOrders } = useGlobalContext();
  const [productInOrders, setProductInOrders] = useState<boolean>(false);
  useEffect(() => {
    if (fetchedOrders) {
      const productInOrders = fetchedOrders.some((order: any) =>
        order.orderedProducts.some(
          (product: any) => product.productId === productId
        )
      );
      setProductInOrders(productInOrders);
    }
  }, [fetchedOrders, productId]);
  const [editRating, setEditRating] = useState<number>(5);

  const handleSubmitReview = async () => {
    if (!session) {
      alert("Please login to post a review");
      return;
    }
    if (newReview.trim()) {
      const newReviewObj = {
        username: session?.user?.name || "Guest",
        review_descr: newReview.trim(),
        userAvatar: session?.user?.image || "/assets/card.jpeg",
        rating: rating,
        productId: productId,
        userId: session?.user?.id,
      };
      try {
        setPostingReview(true);
        const response = await fetch("/api/reviews/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReviewObj),
        });

        if (!response.ok) {
          throw new Error("Failed to post review");
        }

        const result: Review = await response.json();
        setReviews([...reviews, result]);
        setNewReview("");
        setRating(5);
      } catch (error) {
        console.error("Error posting review:", error);
      } finally {
        setPostingReview(false);
      }
    }
  };
  const handledelete = async (_id: string) => {
    try {
      setDeletingReviewId(_id);
      const response = await fetch(
        `/api/reviews/delete/deleteReview?reviewId=${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      await response.json();
      console.log("deleting review: ", _id);
      setReviews(reviews.filter((review) => review._id !== _id));
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setDeletingReviewId(null);
    }
  };
  const handleEdit = async (
    _id: string,
    review_descr: string,
    rating: number
  ) => {
    console.log("editing review: ", _id);
    console.log("editing review_descr: ", review_descr);
    console.log("editing rating: ", rating);

    try {
      setEditingReview(true);
      const response = await fetch("/api/reviews/put", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId: _id, rating, review_descr }),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      const updatedReview = await response.json();
      console.log("Updated review:", updatedReview);
      const updatedReviews = reviews.map((review) =>
        review._id === _id ? updatedReview : review
      );
      setReviews(updatedReviews);
      setHandleEditId(null);
      setRating(5);
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setEditingReview(false);
    }
  };
  const [editReview, setEditReview] = useState("");
  return (
    <div className="w-full mx-auto mt-5 p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      {loading ? (
        <div className="text-center">Loading reviews...</div>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={review.userAvatar}
                        alt={review.username + " avatar"}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row justify-between items-center">
                        <h3 className="font-semibold ">{review.username}</h3>
                        <div className="flex flex-row gap-x-1">
                          {review._id === handleEditId ? (
                            <button
                              disabled={editingReview}
                              onClick={() => {
                                review.review_descr = editReview;
                                review.rating = editRating;
                                handleEdit(review._id, editReview, editRating);
                              }}
                              className={`flex items-center text-sm px-4 py-2 hover:bg-blue-500 transition-all duration-300 hover:text-white text-blue-500 rounded-lg ${
                                review.userId !== session?.user?.id && "hidden"
                              } `}
                            >
                              {editingReview ? "Updating..." : "Update"}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditRating(review.rating);
                                setEditReview(review.review_descr);
                                setHandleEditId(review._id);
                              }}
                              className={`flex items-center text-sm px-4 py-2 hover:bg-blue-500 transition-all duration-300 hover:text-white text-blue-500 rounded-lg ${
                                review.userId !== session?.user?.id && "hidden"
                              } `}
                            >
                              <BiEditAlt size={20} />
                            </button>
                          )}
                          <button
                            disabled={deletingReviewId === review._id}
                            onClick={() => handledelete(review._id)}
                            className={`flex items-center text-sm px-4 py-2 hover:bg-red-500 transition-all duration-300 hover:text-white text-red-500 rounded-lg ${
                              review.userId !== session?.user?.id && "hidden"
                            } `}
                          >
                            {deletingReviewId === review._id ? (
                              "Deleting..."
                            ) : (
                              <RiDeleteBin6Line size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                      {handleEditId === review._id.toString() ? (
                        <div className=" flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IoMdStar
                              key={star}
                              className={`w-6 h-6 cursor-pointer ${
                                star <= editRating
                                  ? "fill-primary"
                                  : "fill-gray-500"
                              }`}
                              onClick={() => setEditRating(star)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className=" flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IoMdStar
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-primary"
                                  : "fill-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {handleEditId === review._id.toString() ? (
                        <textarea
                          value={editReview}
                          onChange={(e) => setEditReview(e.target.value)}
                          className="min-h-[100px] w-full shadow-lg p-2 outline-none"
                        />
                      ) : (
                        <p className="text-sm text-gray-600 mt-2">
                          {review.review_descr}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        {/* <button
                    onClick={() => handleLike(review._id)}
                    className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {review.likes}
                  </button> */}
                        {/* <button
                    onClick={() => handleDislike(review._id)}
                    className="flex items-center text-sm text-gray-500 hover:text-red-600"
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    {review.dislikes}
                  </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No reviews yet</div>
            )}
          </div>
          {productInOrders && session && (
            <div className="mt-6 space-y-4">
              <textarea
                placeholder="Write your review here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-[100px] w-full shadow-lg p-2 outline-none"
              />
              <div className="flex space-x-1">
                <span className="">Your rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IoMdStar
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating ? "fill-primary" : "fill-gray-500"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <Button
                onClick={handleSubmitReview}
                className="mt-4"
                disabled={postingReview}
              >
                <Send className="w-4 h-4 mr-2" />
                {postingReview ? "Posting review..." : "Post Review"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
