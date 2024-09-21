import React from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";
import Dropdown from "./dropdownSelect";

interface CartDataI {
    data: {
        title: string;
        price: number;
        image: string;
        selectedSize: string;
        selectedColor: { title: string; color: string };
        quantity: number;
        selected: boolean;
        _id: any;
    };
    onRemoveCartItem: (id: any) => void;
    onSelectItem: (id: any, isSelected: boolean) => void;
}

const CartCard = ({ data, onRemoveCartItem, onSelectItem }: CartDataI) => {
    return (

        <div className="border-t border-[#8888]">
            <div className="p-3 sm:p-5 w-full">
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="checkbox"
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded-xl form-checkbox accent-[#2ed396] focus:accent-[#2ed396]"
                        checked={data.selected}
                        onChange={(e) => onSelectItem(data._id, e.target.checked)}
                        id={`item-${data._id}`}
                    />
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => onRemoveCartItem(data._id)}
                        aria-label="Remove item"
                    >
                        <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
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
                                <Dropdown title="Quantity" selected={data?.quantity.toString()} />
                            </div>
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

                        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                            <p className="font-semibold">Price:</p>
                            <p className="font-bold">{"₹ "}{data?.quantity * data?.price}</p>
                            <p className="text-xs sm:text-sm text-gray-500 line-through">{"₹ "}1,350</p>
                            <p className="text-xs sm:text-sm text-[#2ed396]">20% off</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;