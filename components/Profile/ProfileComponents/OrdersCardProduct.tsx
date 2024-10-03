import React from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";
import Dropdown from "../../Checkout/dropdownSelect";
import { useCart } from "@/context/CartProvider";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CartDataI {
    data: {
        productId: string;
        title: string;
        slug: string;
        image: string;
        price: number;
        quantity: number;
        selectedSize: string;
        selectedColor: {
          title: string;
          color: string
        };
        timestamps: string;
        categorySlug: string;
    };
}

const OrderCardProduct
 = ({ data}: CartDataI) => {
    const router = useRouter();
    return (

        <div className="border-b border-strokeLight hover:bg-slate-50 cursor-pointer" onClick={()=>{
            router.push(`/products/${data?.categorySlug}/${data?.slug}`);
        }}>
            <div className="p-3 sm:p-5 sm:px-1 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center ">
                    <div className="w-full sm:w-auto flex justify-center mr-5 sm:mr-6">
                        <Image
                            height={150}
                            width={150}
                            src={data?.image}
                            alt={data?.title || "Product Image"}
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full space-y-2 ">
                        <h2 className="text-base sm:text-xl font-montSemiBold">{data?.title}</h2>

                        <div className="flex flex-col gap-2">
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
                            <p className="font-bold">{"₹ "}{(data?.quantity * data?.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <FaChevronRight size={30} className="mr-2" />
                </div>
            </div>
        </div>
    );
};

export default OrderCardProduct
;