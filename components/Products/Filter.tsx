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
}) => {
  const [isShort, setIsShort] = useState(false);

  const toggleShort = () => setIsShort((prev) => !prev);

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
          const filteredCategory: CategoryValues[] = categories.filter(
            (cat) => cat.slug === categorySlug
          );
          // console.log(filteredCategory);

          setCategoryList(filteredCategory[0]);
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
          {isShort ? (
            <FaArrowUpShortWide size={18} />
          ) : (
            <FaArrowDownShortWide size={18} />
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
          variant="outline"
          title="Filter"
          className="hidden md:flex items-center justify-center fixed top-20 right-5 rounded-full p-2 hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          <LiaFilterSolid size={20} />
        </Button>
      </DrawerTrigger>

      {/* Drawer Content */}

      <DrawerContent className="bottom-0 z-50 w-full h-fit max-h-[80vh] md:max-h-[50vh] rounded-t-3xl text-white backdrop-blur-sm bg-white/20 border-none outline-none shadow-lg p-4 overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="text-2xl md:text-3xl font-semibold">
            Filter
          </DrawerTitle>
        </DrawerHeader>
        {categoryList && (
          <>
            <div className="md:hidden space-y-4">
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
              onChange={() => setSelectedType("")}
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
                onChange={() => setSelectedType(type.slug)}
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
            onClick={() => setSelectedColor(title)}
            className={`w-8 h-8 rounded-full ${
              selectedColor === title
                ? "border border-primary shadow-lg scale-110 opacity-100"
                : selectedColor.trim() !== "" && "opacity-40"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        {selectedColor.trim() !== "" && (
          <GrClear
            title="Select none"
            onClick={() => setSelectedColor("")}
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
              onClick={() => setSelectedSize(size)}
              className={`w-8 h-8 rounded-full flex-center ${
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
            onClick={() => setSelectedSize("")}
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
  setPriceRange: (priceRange: { min: number; max: number }) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  setPriceRange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setPriceRange({ ...priceRange, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setPriceRange({ ...priceRange, max: newMax });
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-xl font-medium">Price Range</h3>

      <div className="flex flex-col gap-2">
        <label className="flex items-center space-x-2">
          <span>Min:</span>
          <input
            type="range"
            min={0}
            max={priceRange.max}
            value={priceRange.min}
            onChange={handleMinChange}
            className="range-input-style accent-primary"
          />
          <span>{priceRange.min}</span>
        </label>

        <label className="flex items-center space-x-2">
          <span>Max:</span>
          <input
            type="range"
            min={priceRange.min}
            max={1000}
            value={priceRange.max}
            onChange={handleMaxChange}
            className="range-input-style"
          />
          <span>{priceRange.max}</span>
        </label>
      </div>
    </div>
  );
};
