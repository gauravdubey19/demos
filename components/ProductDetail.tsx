"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

interface ProductDetailProps {
  product: {
    title: string;
    images: string[];
    mainImage: string;
    description: string;
    price: number;
    oldPrice: number;
    discount: number;
    ratings: number;
    reviews: number;
    sizes: string[];
    colors: string[];
    material: string;
    fabricType: string;
    careInstructions: string;
    origin: string;
    availableSizes: string[];
    colorOptions: string[];
    countryOfManufacture: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

interface DetailsProps {
  product: {
    title: string;
    description: string;
    price: number;
    oldPrice: number;
    discount: number;
    ratings: number;
    reviews: number;
    sizes: string[];
    colors: string[];
    material: string;
    fabricType: string;
    careInstructions: string;
    origin: string;
    availableSizes: string[];
    colorOptions: string[];
    countryOfManufacture: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

interface ImageGalleryProps {
  images: string[];
  initialMainImage: string;
}

interface AdditionalInfoProps {
  product: {
    material: string;
    fabricType: string;
    careInstructions: string;
    origin: string;
    availableSizes: string[];
    colorOptions: string[];
    countryOfManufacture: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-4">
      <ImageGallery
        images={product.images}
        initialMainImage={product.mainImage}
      />
      <Details product={product} />
    </div>
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
    <div className="select-none lg:sticky top-20 w-full h-fit md:h-[85vh] flex flex-col gap-3 md:flex-row-reverse justify-between overflow-hidden">
      <Image
        src={currentImage}
        alt="Product Image"
        layout="responsive"
        width={800}
        height={800}
        className="h-[75%] w-full md:h-full md:w-[80%] rounded-lg overflow-hidden"
      />

      <div
        ref={thumbnailRef}
        className={`relative w-full h-full ${
          isMobileView ? "md:w-full flex-row" : "md:w-[20%] flex-col"
        } flex gap-2 items-center overflow-scroll scroll-none`}
      >
        {isMobileView && showArrowLeft && (
          <div
            onClick={() => scrollThumbnails("left")}
            className="sticky top-8 left-1 z-10 flex-center group cursor-pointer rounded-full bg-black/40 backdrop-blur-md p-1 active:-translate-x-1 ease-in-out duration-200"
          >
            <IoIosArrowBack
              size={30}
              className="fill-primary group-active:scale-90 transition-transform duration-300"
            />
          </div>
        )}

        {!isMobileView && showArrowLeft && (
          <div
            onClick={() => scrollThumbnails("up")}
            className="sticky top-0 left-0 z-10 w-full flex justify-center group cursor-pointer bg-gradient-to-b from-white to-transparent"
          >
            <IoIosArrowBack
              size={30}
              className="rotate-90 group-hover:scale-110 group-active:-translate-y-1/2 ease-in-out duration-300"
            />
          </div>
        )}

        {images.map((image, index) => (
          <button
            key={index}
            className={`${
              image === currentImage ? "shadow-lg" : ""
            } hover:drop-shadow-lg rounded-lg overflow-hidden flex-shrink-0`}
            onClick={() => setCurrentImage(image)}
            aria-label={`View Image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Preview thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
          </button>
        ))}

        {isMobileView && showArrowRight && (
          <div
            onClick={() => scrollThumbnails("right")}
            className="sticky top-8 right-1 z-10 flex-center group cursor-pointer rounded-full bg-black/40 backdrop-blur-md p-1 active:translate-x-1 ease-in-out duration-200"
          >
            <IoIosArrowForward
              size={30}
              className="fill-primary group-active:scale-90 transition-transform duration-300"
            />
          </div>
        )}

        {!isMobileView && showArrowRight && (
          <div
            onClick={() => scrollThumbnails("down")}
            className="sticky bottom-0 right-0 w-full flex justify-center group cursor-pointer bg-gradient-to-b from-transparent to-white"
          >
            <IoIosArrowForward
              size={30}
              className="rotate-90 group-hover:scale-110 transition-transform ease-in-out duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Details: React.FC<DetailsProps> = ({ product }) => {
  const sizeLabels: { [key: string]: string } = {
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "Extra Large",
  };

  const defaultSize =
    sizeLabels[product.sizes[1].toLowerCase()] || product.sizes[1];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground mt-2">{product.description}</p>
      </div>

      <div className="flex justify-between items-center">
        {/* Pricing and Discount */}
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-green-500 font-medium">
              {product.discount}% off
            </span>
          )}
        </div>

        {/* Ratings and Reviews */}
        <div className="flex items-center gap-1 md:gap-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: product.ratings }, (_, index) => (
              <IoMdStar key={index} color="yellow" size={15} />
            ))}
          </div>
          <Link href="#" className="text-primary">
            {product.reviews} reviews
          </Link>
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
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size.toLowerCase()}>
                  {sizeLabels[size.toLowerCase()] || size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-2">
          <Button
            size="lg"
            className="w-full flex gap-1 bg-transparent text-lg text-primary border border-primary rounded-none"
          >
            Add to cart <span className="text-2xl">+</span>
          </Button>
          <Button size="lg" className="w-full text-lg rounded-none">
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
      <div className="bg-[#FFB4332E] text-sm text-primary text-justify p-4 rounded-md">
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
