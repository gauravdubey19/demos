"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import CircularButton from "./CircularButton";

interface Product {
  title: string;
  slug: string;
  image: string;
}

interface OutfitData {
  outfitTitle: string;
  outfitSlug: string;
  outfitImage: string;
  productCollection: Product[];
}

const GridCards = () => {
  const [currentOutfit, setCurrentOutfit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [outfitCollection, setOutfitCollection] = useState<OutfitData[]>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const icon = "/images/icon.png";

  useEffect(() => {
    const fetchOutfitCollection = async () => {
      try {
        const res = await fetch("/api/products/read/get-outfit-collection", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch outfit collection");
        }

        const data = await res.json();
        setOutfitCollection(data.outfits as OutfitData[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching outfit collection:", error);
        setLoading(false); // Ensure loading is stopped even if an error occurs
      }
    };

    // Fetch outfit collection only if it's empty
    if (outfitCollection.length === 0) {
      fetchOutfitCollection();
    }
  }, [outfitCollection.length]);

  useEffect(() => {
    if (outfitCollection.length === 0) return; // Ensure data is available

    // GSAP animation for image rendering
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, [currentOutfit, outfitCollection.length]);

  const handleButtonClick = (index: number) => {
    setCurrentOutfit(index);
  };

  // Safeguard: Ensure outfitCollection is not empty before destructuring
  const currentOutfitData = outfitCollection[currentOutfit] || {
    productCollection: [],
    outfitImage: "",
    outfitTitle: "",
  };

  const { productCollection, outfitImage, outfitTitle } = currentOutfitData;

  return (
    <div className="sm:h-screen w-full overflow-hidden">
      <div className="h-full w-full flex flex-col justify-evenly gap-5">
        <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-[60%] h-[85%]">
          {/* Column 1 */}
          <div className="flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[20%] md:h-full">
            {loading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl animate-pulse flex items-center justify-center"
                  >
                    <div className="w-full h-full bg-gray-200 rounded-3xl"></div>
                  </div>
                ))
              : productCollection.slice(0, 2).map((product, index) => (
                  <div
                    key={index}
                    title={product.title}
                    className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex-center p-4 md:p-6 overflow-hidden"
                  >
                    <Image
                      ref={(el) => {
                        if (el) imageRefs.current[index] = el;
                      }}
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full py-1 p-1 object-contain"
                    />
                  </div>
                ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col md:w-[40%] w-full h-[40vh] sm:h-[57%] md:h-[103%]">
            <div
              className={`relative h-full md:py-10 py-4 w-full ${
                loading ? "bg-gray-200 animate-pulse" : "bg-[#F4F4F4]"
              } rounded-3xl flex items-center justify-center flex-col md:gap-10 gap-5 p-4 md:p-6 overflow-hidden`}
            >
              {!loading && (
                <>
                  <Image
                    ref={(el) => {
                      if (el) imageRefs.current[2] = el;
                    }}
                    src={outfitImage}
                    alt={`Main image of ${outfitTitle}`}
                    height={400}
                    width={400}
                    className="w-full h-full md:p-0 sm:p-[2.8rem] xl:p-[.4rem] p-6 object-contain"
                  />
                  <h1 className="absolute bottom-3 w-full h-fit capitalize font-bold text-xl md:text-2xl text-wrap text-center text-[#767676] overflow-hidden">
                    {outfitTitle}
                  </h1>
                </>
              )}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[25%] sm:mt-16 md:mt-0 md:h-full">
            {loading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index + 2}
                    className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl animate-pulse flex items-center justify-center"
                  >
                    <div className="w-full h-full bg-gray-200 rounded-3xl"></div>
                  </div>
                ))
              : productCollection.slice(2, 4).map((product, index) => (
                  <div
                    key={index + 2}
                    title={product.title}
                    className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex-center p-4 md:p-6 overflow-hidden"
                  >
                    <Image
                      ref={(el) => {
                        if (el) imageRefs.current[index + 3] = el;
                      }}
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full py-1 p-1 object-contain"
                    />
                  </div>
                ))}
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-5 md:gap-10 items-end justify-center pb-10">
          {outfitCollection.slice(0, 4).map((_, index) => (
            <CircularButton
              pic={icon}
              index={index}
              key={index}
              isActive={currentOutfit === index}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridCards;
