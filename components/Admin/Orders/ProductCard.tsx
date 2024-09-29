"use client"
import React from "react";
import { X, Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Dropdown from "@/components/Checkout/dropdownSelect";
import { useCart } from "@/context/CartProvider";

interface CartDataI {
    data: {
        title: string;
        price: number;
        image: any;
        selectedSize: string;
        selectedColor: { title: string; color: string };
        quantity: number;
        selected: boolean;
        productId: any;
        _id: any;
    };
    onRemoveCartItem?: (id: any) => void;
}

const ProductCard = ({ data }: CartDataI) => {
    console.log(data);

    return (

        <div className="border-t border-[#8888]">
            <div className="p-3 sm:p-5 w-full">
                <div className="flex items-center justify-end mb-4">
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />3
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                    <div className="w-full sm:w-auto flex justify-center">
                        <Image
                            height={130}
                            width={130}
                            src={data?.image}
                            alt={data?.title || "Product Image"}
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold">{data?.title}</h2>

                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Dropdown title="Size" selected={data?.selectedSize} />
                            
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Color:</span>
                                <span
                                    style={{ backgroundColor: data?.selectedColor.color }}
                                    className="flex items-center justify-center p-1 rounded-full border border-[#8888]"
                                >
                                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </span>
                            </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                            <p className="font-semibold">Price:</p>
                            <p className="font-bold">{"₹ "}{data?.quantity * data?.price}</p>
                        </div>
                        <div className="text-blue-500 underline flex items-center mt-3 cursor-pointer">
                            View Product <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;