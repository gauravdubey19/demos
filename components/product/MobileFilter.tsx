"use client";

import React, { useEffect, useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const MobileFilter = () => {
  // "inc" | "dec"
  const [short, setShort] = useState<boolean>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 770) {
      setOpen(false);
    }
  }, [windowWidth]);
  return (
    <>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-zinc-700 flex-between text-white py-2 divide-x-1">
            <div
              onClick={() => setShort(!short)}
              className="w-1/2 flex-center gap-1 active:translate-y-1 ease-in-out duration-300"
            >
              <span>Short</span>
              {short ? (
                <FaArrowUpShortWide size={18} />
              ) : (
                <FaArrowDownShortWide size={18} />
              )}
            </div>
            <SheetTrigger
              asChild
              className=" active:translate-y-1 ease-in-out duration-300"
            >
              <div className="w-1/2 flex-center gap-1">
                <span>Filter</span>
                <LiaFilterSolid size={18} />
              </div>
            </SheetTrigger>
          </div>
          <SheetContent
            side="bottom"
            className="md:hidden bottom-0 z-50 w-full h-[70vh] rounded-t-3xl backdrop-blur-lg bg-transparent border-none outline-none shadow-[0_0_20px_rgba(0,0,0,0.5)] p-4 overflow-x-hidden overflow-y-scroll"
            closeIcon={false}
          >
            <SheetTitle className="w-full flex-between text-xl text-white font-normal">
              Filter
              <SheetClose className="w-fit outline-none border-none pr-1 active:scale-90 ease-in-out duration-300">
                X
              </SheetClose>
            </SheetTitle>

            <div className="flex-col space-y-4 text-white">
              <div>
                <h3 className="text-lg">Categories</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Shirts</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Pants</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Dresses</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg">Colors</h3>
                <div className="mt-2 flex flex-wrap space-x-2">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-400"
                    aria-label="Red"
                  ></button>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-600"
                    aria-label="Blue"
                  ></button>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800"
                    aria-label="Green"
                  ></button>
                </div>
              </div>

              <div>
                <h3 className="text-lg">Sizes</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Small</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Medium</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Large</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg">Price Range</h3>
                <div className="mt-2 flex flex-col space-y-2">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileFilter;
