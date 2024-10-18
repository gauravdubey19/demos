"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { CategoryValues } from "@/lib/types";
import { LiaFilterSolid } from "react-icons/lia";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { GrClear } from "react-icons/gr";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaChevronDown } from "react-icons/fa";

interface FilterProps {
  categorySlug: string;
  selectedType: string;
  setSelectedType: (type: string) => void;
  colorOptions: { _id: string; title: string; color: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (priceRange: { min: number; max: number }) => void;
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({
  categorySlug,
  selectedType,
  setSelectedType,
  colorOptions,
  selectedColor,
  setSelectedColor,
  availableSizes,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  isAscending,
  setIsAscending,
}) => {
  const toggleShort = () => setIsAscending(!isAscending);

  const [categoryList, setCategoryList] = useState<CategoryValues | null>(null);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await fetch("/api/products/read/get-categories", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        if (data as CategoryValues[]) {
          const categories: CategoryValues[] = data.categories;

          if (categorySlug === "all") {
            // Set all categories without filters
            const AllTypes = categories.map((cat) => cat.types).flat();
            setCategoryList({
              _id: "all",
              title: "All",
              slug: "all",
              description: "All categories",
              types: AllTypes,
              image: "",
              subCategories: [],
            });
          } else {
            const filteredCategory: CategoryValues[] = categories.filter(
              (cat) => cat.slug === categorySlug
            );
            setCategoryList(filteredCategory[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (!categoryList) fetchCategoryList();
  }, [categoryList, categorySlug]);

  return (
    <div className="z-40 md:w-80 text-black bg-white md:p-4 md:ml-6 md:pr-8 md:border-r border-r-gray-300 h-[calc(100vh-60px)] overflow-y-auto">
      <div className="md:hidden">
        <Drawer>
          <div className="md:hidden z-10 fixed bottom-0 left-0 right-0 w-full bg-zinc-700 flex justify-between items-center text-white py-2 divide-x-1">
            <div
              onClick={toggleShort}
              className="w-1/2 flex-center gap-1 active:translate-y-1 transition-transform duration-300"
            >
              <span>Short</span>
              {isAscending ? (
                <FaArrowDownShortWide size={18} />
              ) : (
                <FaArrowUpShortWide size={18} />
              )}
            </div>
            <DrawerTrigger asChild>
              <div className="w-1/2 flex-center gap-1 active:translate-y-1 transition-transform duration-300">
                <span>Filter</span>
                <LiaFilterSolid size={18} />
              </div>
            </DrawerTrigger>
          </div>

          <DrawerContent className="md:hidden bottom-0 z-50 w-full h-fit max-h-[70vh] md:max-h-[70vh] rounded-t-3xl text-white bg-white/40 backdrop-blur-sm border-none outline-none shadow-lg p-4">
            <DrawerHeader>
              <DrawerTitle className="text-2xl md:text-3xl font-semibold">
                Filter
              </DrawerTitle>
            </DrawerHeader>
            {categoryList && (
              <>
                <div className="md:hidden space-y-4 overflow-y-auto">
                  <FilterContent
                    categorySlug={categorySlug}
                    categoryList={categoryList}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    colorOptions={colorOptions}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    availableSizes={availableSizes}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </div>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:block">
        <div className="text-2xl md:text-3xl font-semibold mb-4">Filter</div>
        {categoryList && (
          <div className="space-y-4 overflow-y-auto">
            <FilterContent
              categorySlug={categorySlug}
              categoryList={categoryList}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              colorOptions={colorOptions}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              availableSizes={availableSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;

interface FilterContentProps {
  categorySlug?: string;
  selectedType: string;
  setSelectedType: (type: string) => void;
  colorOptions: { _id: string; title: string; color: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  categoryList: CategoryValues;
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (priceRange: { min: number; max: number }) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  selectedType,
  setSelectedType,
  colorOptions,
  selectedColor,
  setSelectedColor,
  categoryList,
  availableSizes,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | null>(
    "category"
  );
  return (
    <>
      <CategoryFilter
        categoryList={categoryList}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      <ColorFilter
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      <SizeFilter
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
    </>
  );
};

interface CategoryFilterProps {
  categoryList: CategoryValues;
  selectedType: string;
  setSelectedType: (type: string) => void;
  isAccordionOpen: string | null;
  setIsAccordionOpen: (isOpen: string | null) => void;
}
interface ColorFilterProps {
  colorOptions: { _id: string; title: string; color: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  isAccordionOpen: string | null;
  setIsAccordionOpen: (isOpen: string | null) => void;
}
interface SizeFilterProps {
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  isAccordionOpen: string | null;
  setIsAccordionOpen: (isOpen: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categoryList,
  selectedType,
  setSelectedType,
  isAccordionOpen,
  setIsAccordionOpen,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3
        className="text-base font-medium cursor-pointer flex items-center justify-between"
        onClick={() =>
          setIsAccordionOpen(isAccordionOpen === "category" ? null : "category")
        }
      >
        Category types
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isAccordionOpen === "category" ? "transform -rotate-180" : ""
          }`}
        />
      </h3>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isAccordionOpen === "category" ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="space-y-2">
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedType.trim() === ""}
                onChange={() => {
                  // window.scrollTo({ top: 0, behavior: "smooth" });
                  setSelectedType("");
                }}
              />
              <span>All</span>
            </label>
          </li>
          {categoryList?.types.map((type) => (
            <li key={type._id}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedType === type.slug}
                  onChange={() => {
                    // window.scrollTo({ top: 0, behavior: "smooth" });
                    setSelectedType(type.slug);
                  }}
                />
                <span>{type.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ColorFilter: React.FC<ColorFilterProps> = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
  isAccordionOpen,
  setIsAccordionOpen,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3
        className="text-base font-medium cursor-pointer flex items-center justify-between"
        onClick={() =>
          setIsAccordionOpen(isAccordionOpen === "color" ? null : "color")
        }
      >
        Colors
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isAccordionOpen === "color" ? "transform -rotate-180" : ""
          }`}
        />
      </h3>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isAccordionOpen === "color" ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-wrap gap-2 p-0.5">
          {colorOptions.map(({ _id, title, color }) => (
            <button
              key={_id}
              title={title}
              onClick={() => {
                // window.scrollTo({ top: 0, behavior: "smooth" });
                setSelectedColor(title);
              }}
              className={`w-8 h-8 rounded-full border border-gray-200 ${
                selectedColor === title
                  ? "border border-primary shadow-lg scale-110 opacity-100"
                  : selectedColor.trim() !== "" && "opacity-40 "
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          {selectedColor.trim() !== "" && (
            <GrClear
              title="Select none"
              onClick={() => {
                // window.scrollTo({ top: 0, behavior: "smooth" });
                setSelectedColor("");
              }}
              size={30}
              className="w-8 h-8 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SizeFilter: React.FC<SizeFilterProps> = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
  isAccordionOpen,
  setIsAccordionOpen,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3
        className="text-base font-medium cursor-pointer flex items-center justify-between"
        onClick={() =>
          setIsAccordionOpen(isAccordionOpen === "size" ? null : "size")
        }
      >
        Sizes
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isAccordionOpen === "size" ? "transform -rotate-180" : ""
          }`}
        />
      </h3>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isAccordionOpen === "size" ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-wrap gap-2 p-0.5">
          {availableSizes.map((size, index) => (
            <div key={index} className="">
              <button
                title={size}
                onClick={() => {
                  // window.scrollTo({ top: 0, behavior: "smooth" });
                  setSelectedSize(size);
                }}
                className={`w-10 h-10 rounded-full flex-center border border-gray-200 text-sm ${
                  selectedSize === size
                    ? "border border-primary shadow-lg scale-110 opacity-100"
                    : selectedSize.trim() !== "" && "opacity-40 bg-black/30"
                }`}
              >
                {size}
              </button>
            </div>
          ))}
          {selectedSize.trim() !== "" && (
            <GrClear
              title="Select none"
              onClick={() => {
                // window.scrollTo({ top: 0, behavior: "smooth" });
                setSelectedSize("");
              }}
              size={30}
              className="w-10 h-10 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface PriceFilterProps {
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  setPriceRange,
}) => {
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange({ min: value[0], max: value[1] });
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-base font-medium">Price Range</h3>

      <div className="flex flex-col gap-2 max-w-[300px] w-[90%] mx-auto">
        <Slider
          range
          min={0}
          max={20000}
          value={[priceRange.min, priceRange.max]}
          onChange={handleSliderChange}
          className="range-input-style"
          styles={{
            track: { backgroundColor: "#FFB433" },
            handle: { borderColor: "#FFB433" },
            rail: { backgroundColor: "#ddd" },
          }}
        />
        <div className="flex justify-between">
          <span>Min: {priceRange.min}</span>
          <span>Max: {priceRange.max}</span>
        </div>
      </div>
    </div>
  );
};
