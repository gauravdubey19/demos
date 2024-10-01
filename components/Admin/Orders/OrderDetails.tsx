"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import ProductCard from "./ProductCard";
import productImg from "@/public/productImg.png";
import PriceDetails from "./PriceDetails";
import UserDetails from "./UserDetails";

const sampleData = {
  data: {
    title: "Product Name",
    price: 100,
    image: productImg,
    selectedSize: "M",
    selectedColor: { title: "Red", color: "#FF0000" },
    quantity: 2,
    selected: false,
    productId: "1234567890",
    _id: "1234567890",
  },
};

const sampleCartData = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    discount: 10,
    quantity: 2,
    selected: true,
  },
];

const OrderDetails = ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}) => {
  console.log(userId);

  return (
    <div className="p-5 pb-10 h-screen overflow-y-auto">
      <section className="w-full h-full">
        <div className="w-full h-fit flex justify-between items-center md:py-6">
          <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
            {userId}/ Order Number{" "}
            <span className=" text-[#FFB433]">#{orderId}</span>
          </h2>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              className="group text-white bg-primary capitalize rounded-md flex items-center"
            >
              Change Status{" "}
              <FiEdit className="ml-1 group-hover:scale-110 ease-in-out duration-300" />
            </Button>
          </div>
        </div>
        {/* toggle */}
        <div className="flex items-center flex-row gap-2">
          <div className="px-3 py-1 text-white bg-[#2ed396] rounded-lg">
            Paid
          </div>
          <div className="px-3 py-1 text-white bg-[#FFB433] rounded-lg">
            Pending
          </div>
        </div>
        {/* left */}
        <div className="w-full flex flex-col lg:flex-row gap-3 pt-10">
          <div className="bg-white p-6 rounded-lg border border-[#d8d8d8] w-full lg:w-[60%]">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Order Date</span>
                <span>01-03-2024</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Date</span>
                <span>05-03-2024</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Date</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹ 10,000</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-7">Product Details</h2>

            {/* cards */}
            <div className="">
              <ProductCard data={sampleData.data} />
              <ProductCard data={sampleData.data} />
              <ProductCard data={sampleData.data} />
            </div>
          </div>
          {/* right */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4 sticky top-20">
            <PriceDetails cartData={sampleCartData} />
            <UserDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
