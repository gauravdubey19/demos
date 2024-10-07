"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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

  const [categoryList, setCategoryList] = useState<CategoryValues | null >(null);

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
          
          if(categorySlug === "all") {
            //seet all categories without filters
            const AllTypes = categories.map((cat) => cat.types).flat();
            setCategoryList({
              _id: "all",
              title: "All",
              slug: "all",
              description: "All categories",
              types: AllTypes,
              image: "",
            });
          }else {
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
    <Drawer>
      <div className="md:hidden z-10 fixed bottom-0 left-0 right-0 w-full bg-zinc-700 flex justify-between items-center text-white py-2 divide-x-1">
        <div
          onClick={toggleShort}
          className="w-1/2 flex items-center justify-center gap-1 active:translate-y-1 transition-transform duration-300"
        >
          <span>Short</span>
          {isAscending ? (
            <FaArrowDownShortWide size={18} />
          ) : (
            <FaArrowUpShortWide size={18} />
          )}
        </div>
        <DrawerTrigger
          asChild
          className="w-1/2 flex items-center justify-center gap-1 active:translate-y-1 transition-transform duration-300"
        >
          <div>
            <span>Filter</span>
            <LiaFilterSolid size={18} />
          </div>
        </DrawerTrigger>
      </div>

      <DrawerTrigger asChild>
        <Button
          title="Filter"
          className="hidden md:flex items-center justify-center fixed top-20 right-5 z-[10] transition rounded-lg gap-x-2 px-4 py-2 border border-primary bg-primary text-white hover:bg-white hover:text-primary"
        >
          <span className=" hidden md:block text-base
          ">Filter</span>
          <LiaFilterSolid size={20} />
        </Button>
      </DrawerTrigger>

      {/* Drawer Content */}

      <DrawerContent className="bottom-0 z-50 w-full h-fit max-h-[70vh] md:max-h-[70vh] rounded-t-3xl text-black bg-white border-none outline-none shadow-lg p-4">
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
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-transparent p-4 h-fit overflow-y-auto">
              <FilterContent
                categorySlug={categorySlug}
                categoryList={categoryList}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                colorOptions={colorOptions}
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
}) => (
  <>
    <CategoryFilter
      categoryList={categoryList}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
    />
    <ColorFilter
      colorOptions={colorOptions}
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
    />
    <SizeFilter
      availableSizes={availableSizes}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
    />
    <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
  </>
);

interface CategoryFilterProps {
  categoryList: CategoryValues;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categoryList,
  selectedType,
  setSelectedType,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-xl font-medium">Category types</h3>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedType.trim() === ""}
              onChange={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setSelectedType("")
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
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setSelectedType(type.slug)}}
              />
              <span>{type.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ColorFilterProps {
  colorOptions: { _id: string; title: string; color: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
}) => {
  // console.log(colorOptions);

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-xl font-medium">Colors</h3>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map(({ _id, title, color }) => (
          <button
            key={_id}
            title={title}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
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
              window.scrollTo({ top: 0, behavior: "smooth" });
              setSelectedColor("");
            }}
            size={30}
            className="w-8 h-8 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

interface SizeFilterProps {
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-xl font-medium">Sizes</h3>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size, index) => (
          <div key={index} className="">
            <button
              title={size}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
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
              window.scrollTo({ top: 0, behavior: "smooth" });
              setSelectedSize("");
            }}
            size={30}
            className="w-8 h-8 cursor-pointer"
          />
        )}
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPriceRange({ min: value[0], max: value[1] });
    }
  };

   return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-xl font-medium">Price Range</h3>
  
      <div className="flex flex-col gap-2 max-w-[300px]">
        <Slider
          range
          min={0}
          max={1000}
          value={[priceRange.min, priceRange.max]}
          onChange={handleSliderChange}
          className="range-input-style"
          styles={{
            track: { backgroundColor: '#FFB433' },
            handle: { borderColor: '#FFB433' },
            rail: { backgroundColor: '#ddd' },
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