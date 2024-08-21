import React from "react";
import Card from "./Card";
import { ProductCategoryProps } from "@/lib/types";
import MobileFilter from "./MobileFilter";

const ProductCategory: React.FC<ProductCategoryProps> = ({
  category,
  products,
}) => {
  return (
    <>
      <section className="relative w-full py-4 overflow-hidden">
        <MobileFilter />
        <div className="hidden md:flex fixed bottom-0 top-[3.7rem] right-0 z-10 w-[20%] h-screen flex-col space-y-4 bg-transparent border-l border-gray-500 p-4">
          <h2 className="text-2xl font-semibold">Filter</h2>

          <div>
            <h3 className="text-xl font-medium">Categories</h3>
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
            <h3 className="text-xl font-medium">Colors</h3>
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
            <h3 className="text-xl font-medium">Sizes</h3>
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
            <h3 className="text-xl font-medium">Price Range</h3>
            <div className="mt-2 flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <span>Min:</span>
                <input
                  type="number"
                  className="form-input w-24 bg-inherit outline-none ring-0"
                  placeholder="0"
                />
              </label>
              <label className="flex items-center space-x-2">
                <span>Max:</span>
                <input
                  type="number"
                  className="form-input w-24 bg-transparent outline-none ring-0"
                  placeholder="1000"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:w-[80%] w-full px-2 md:px-6 lg:px-8">
          <div className="text-xl lg:text-2xl font-bold">{category}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-6">
            {products &&
              products.map((card, index) => <Card key={index} card={card} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
