import React from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";
import Dropdown from "./dropdownSelect";
import { useCart } from "@/context/CartProvider";

interface CartDataI {
    data: {
        title: string;
        price: number;
        image: string;
        selectedSize: string;
        selectedColor: { title: string; color: string };
        quantity: number;
        selected: boolean;
        productId: any;
        _id: any;
    };
    onRemoveCartItem?: (id: any) => void;
    onSelectItem: (id: any, isSelected: boolean) => void;
}

const CartCard = ({ data, onSelectItem }: CartDataI) => {

    const { handleRemoveFromCart } = useCart(); //console.log(isOpen);

    const handleRemove = async () => {
        if (data.productId) {
            await handleRemoveFromCart(data?.productId);
        }
    };

    return (

        <div className="border-t border-[#8888]">
            <div className="p-3 sm:p-5 w-full">
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="checkbox"
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded-xl form-checkbox accent-[#2ed396] focus:accent-[#2ed396]"
                        checked={data.selected}
                        onChange={(e) => onSelectItem(data.productId, e.target.checked)}
                        id={`item-${data.productId}`}
                    />
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        // onClick={() => onRemoveCartItem(data._id)}
                        onClick={handleRemove}
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
                                    className="flex items-center justify-center rounded-full border border-[#8888] h-6 w-6"
                                >
                                    {/* <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" /> */}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                            <p className="font-semibold">Price:</p>
                            <p className="font-bold">{"₹ "}{(data?.quantity * data?.price).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;