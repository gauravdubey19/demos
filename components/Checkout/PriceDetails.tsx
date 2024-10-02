import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface PriceDetailsI {
    cartData: any,
    selectedItems: any,
    onProceed: () => void;
    currentStep: 'cart' | 'address' | 'payment';
    setTotals:any;
    totals:any;
}

const PriceDetails = ({ totals,onProceed,currentStep }: PriceDetailsI) => {


    const { totalMRP, totalDiscount, platformFee, shippingFee } = totals;
    const totalAmount = totalMRP - totalDiscount + platformFee + shippingFee;

    return (
        <div className="md:w-1/4 w-full h-max border border-gray-400 rounded-lg text-gray-600 py-5 sticky top-20">
            <h1 className="text-2xl md:text-3xl pl-5 text-black">Subtotal details</h1>
            <div className="space-y-2 pt-5">
                <div className="flex items-center justify-between px-5 text-base md:text-lg">
                    <p>Total MRP</p>
                    <p className="text-black">{"₹ "}{totalMRP.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between px-5 text-base md:text-lg">
                    <p>Total Discount</p>
                    <p className="text-green-500">{"- ₹ "}{totalDiscount}</p>
                </div>
                <div className="flex items-center justify-between px-5 text-base md:text-lg">
                    <p>Platform Fee</p>
                    <p className="text-black">{"₹ "}{platformFee}</p>
                </div>
                <div className="flex items-center justify-between px-5 text-base md:text-lg">
                    <p>Shipping Fee</p>
                    <p className="text-black">{"₹ "}{shippingFee}</p>
                </div>
            </div>
            <div className="px-2 pt-5">
                <hr className="h-[1px] bg-gray-400 border-gray-400" />
            </div>
            <div className="w-full px-3 space-y-6 pt-2">
                <div className="flex items-center font-semibold text-black justify-between text-base md:text-lg">
                    <p>Total Amount</p>
                    <p>{"₹ "}{totalAmount.toFixed(2)}</p>
                </div>
                <Button
                    onClick={onProceed}
                    className={`w-full text-lg md:text-xl hover:bg-yellow-500 flex items-center justify-center ${(currentStep === 'payment') ? "hidden" : "block"} `}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
}

export default PriceDetails;
