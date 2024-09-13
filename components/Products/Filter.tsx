"use client";

import React, { useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const Filter: React.FC = () => {
  const [isShort, setIsShort] = useState(false);

  const toggleShort = () => setIsShort((prev) => !prev);

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
      <DrawerContent className="bottom-0 z-50 w-full h-fit rounded-t-3xl text-white backdrop-blur-[5px] bg-white/20 border-none outline-none shadow-lg p-4 overflow-x-hidden overflow-y-scroll">
        <DrawerHeader>
          <DrawerTitle className="text-2xl md:text-3xl font-semibold">
            Filter
          </DrawerTitle>
        </DrawerHeader>
        <div className="md:hidden space-y-4">
          <FilterContent />
        </div>
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-transparent p-4 h-fit overflow-y-auto">
          <FilterContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Filter;

const FilterContent = () => (
  <>
    <CategoryFilter />
    <ColorFilter />
    <SizeFilter />
    <PriceFilter />
  </>
);

const CategoryFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Categories</h3>
    <ul className="space-y-2">
      {["Shirts", "Pants", "Dresses"].map((category) => (
        <li key={category}>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>{category}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const ColorFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Colors</h3>
    <div className="flex flex-wrap gap-2">
      {[
        { name: "Light Gray", colorClass: "bg-gray-200" },
        { name: "Gray", colorClass: "bg-gray-400" },
        { name: "Dark Gray", colorClass: "bg-gray-600" },
      ].map(({ name, colorClass }) => (
        <button
          key={name}
          className={`w-8 h-8 rounded-full ${colorClass}`}
          title={name}
        />
      ))}
    </div>
  </div>
);

const SizeFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Sizes</h3>
    <ul className="space-y-2">
      {["Small", "Medium", "Large"].map((size) => (
        <li key={size}>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>{size}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const PriceFilter = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium">Price Range</h3>
    <div className="flex flex-col gap-2">
      <label className="flex items-center space-x-2">
        <span>Min:</span>
        <input
          type="number"
          className="form-input w-24 bg-transparent"
          placeholder="0"
        />
      </label>
      <label className="flex items-center space-x-2">
        <span>Max:</span>
        <input
          type="number"
          className="form-input w-24 bg-transparent"
          placeholder="1000"
        />
      </label>
    </div>
  </div>
);
