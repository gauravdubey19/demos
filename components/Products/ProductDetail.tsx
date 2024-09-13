"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { calculateDiscount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdStar, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  AdditionalInfoProps,
  DetailsProps,
  ImageGalleryProps,
  ProductDetailValues,
  ProductReviewsProps,
} from "@/lib/types";
import { ThumbsUp, ThumbsDown, Send, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { set } from "mongoose";
const ProductDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const [product, setProduct] = useState<ProductDetailValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {data:session} = useSession();
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

    fetchProductBySlug();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // console.log(product);

  return (
    <>
      <section className="max-w-6xl px-4 mx-auto py-4 mt-[60px]">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <ImageGallery
            images={product.images}
            initialMainImage={product.mainImage}
          />
          <Details product={product} />
        </div>
        {
          session?.user?.id ?
        <ProductReviews slug={slug} />:
          <div className=" text-center text-lg text-gray-500 mt-4">
           Please login to view reviews
          </div>
      }
      </section>
    </>
  );
};

export default ProductDetail;

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialMainImage,
}) => {
  const [currentImage, setCurrentImage] = useState<string>(initialMainImage);
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
        thumbnailRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="select-none lg:sticky top-20 w-full h-full md:h-[50vh] lg:h-[85vh] flex flex-col gap-3 md:flex-row-reverse justify-between overflow-hidden">
      <Image
        src={currentImage}
        alt="Product Image"
        width={800}
        height={800}
        className="h-[75%] w-full md:h-full md:w-[80%] overflow-hidden"
      />

      <div className="relative w-full md:w-[20%] h-[25%] md:h-full">
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
              className="cursor-pointer w-full h-full"
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

const Details: React.FC<DetailsProps> = ({ product }) => {
  const sizeLabels: { [key: string]: string } = {
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large",
  };

  const defaultSize =
    sizeLabels[product.availableSizes[1].toLowerCase()] ||
    product.availableSizes[1];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground mt-2">{product.description}</p>
      </div>

      {/* Pricing and Discount */}
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold">₹{product.price.toFixed(2)}</span>
        <span className="text-md text-green-500 font-medium">
          {calculateDiscount(product.price, product.oldPrice)}% off
        </span>
      </div>

      {/* Ratings and Reviews */}
      <div className="flex items-center gap-1 md:gap-4">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <IoMdStar
              key={index}
              size={15}
              className={
                // product.ratings
                index < 3 ? "fill-primary" : "fill-gray-500"
              }
            />
          ))}
        </div>
        |{" "}
        <div>
          <span className="text-primary">0</span> reviews
          {/* <span className="text-primary">{product.reviews.length}</span> reviews */}
        </div>
      </div>

      {/* Size Selection and Buttons */}
      <div className="grid gap-4">
        {/* Size Selection */}
        <div className="grid gap-2">
          <label htmlFor="size" className="text-base font-medium">
            Size
          </label>
          <Select defaultValue={defaultSize}>
            <SelectTrigger className="w-full bg-transparent border border-primary rounded-none">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {sizeLabels[size] || size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-2">
          <Button
            size="lg"
            className="w-full flex gap-1 bg-transparent text-lg text-primary border border-primary rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
          >
            Add to cart <span className="text-2xl">+</span>
          </Button>
          <Button
            size="lg"
            className="w-full text-lg rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
          >
            Buy now
          </Button>
        </div>
      </div>
      <AdditionalInfo product={product} />
    </div>
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
              <li>
                <strong>Fabric Type:</strong> {product.fabricType}
              </li>
              <li>
                <strong>Care Instructions:</strong> {product.careInstructions}
              </li>
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
              <li>
                <strong>Color Options:</strong>{" "}
                {product.colorOptions.join(", ")}
              </li>
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

interface Review {
  _id: number;
  username: string;
  userAvatar: string;
  review_descr: string;
  rating: number;
  productSlug: string;
}

const ProductReviews:React.FC<ProductReviewsProps>= ({slug}) => {
  const {data:session} = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([
    // {
    //   _id: 1,
    //   username: "Alice",
    //   userAvatar: "/assets/card.jpeg",
    //   review_descr: "Great product! Highly recommended.",
    //   rating: 2.4,
    //   productSlug: slug,
    // }
  ]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [postingReview, setPostingReview] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/reviews/get/getReviewsProduct?productId=${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await res.json();
        console.log("fetched reviews: ",data);
        
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [slug]);
  // const handleLike = (_id: number) => {
  //   setReviews(
  //     reviews.map((review) =>
  //       review._id === _id ? { ...review, likes: review.likes + 1 } : review
  //     )
  //   );
  // };

  // const handleDislike = (_id: number) => {
  //   setReviews(
  //     reviews.map((review) =>
  //       review._id === _id
  //         ? { ...review, dislikes: review.dislikes + 1 }
  //         : review
  //     )
  //   );
  // };

  const handleSubmitReview = async () => {
    if (newReview.trim()) {
      const newReviewObj = {
        username: session?.user?.name || "Guest",
        review_descr: newReview.trim(),
        userAvatar: session?.user?.image || "/assets/card.jpeg",
        rating: rating,
        productSlug: slug,
      };
  
      try {
        setPostingReview(true);
        const response = await fetch('/api/reviews/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReviewObj),
        });
  
        if (!response.ok) {
          throw new Error('Failed to post review');
        }
  
        const result: Review = await response.json();
        setReviews([...reviews, result]);
        setNewReview("");
        setRating(5);
      } catch (error) {
        console.error('Error posting review:', error);
      }finally{
        setPostingReview(false);
      }
    }
  };

  
  return (
    <div className="w-full mx-auto mt-5 p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      {loading ? <div className="text-center">Loading reviews...</div>:
      <>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow">
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
                <h3 className="font-semibold">{review.username}</h3>
                <div className=" flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <IoMdStar
                      key={index}
                      size={15}
                      className={
                        // product.ratings
                        index < Math.round(review.rating) ? "fill-primary" : "fill-gray-500"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.review_descr}</p>
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
        ))}
      </div>
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
              className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-primary' : 'fill-gray-500'}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <Button onClick={handleSubmitReview} className="mt-4" disabled={postingReview}>
          <Send className="w-4 h-4 mr-2" />{postingReview ? "Posting review..." : "Post Review"}
        </Button>
      </div>
      </>
      }
    </div>
  );
};