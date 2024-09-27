import React, { useEffect, useState } from 'react';

interface PriceDetailsI {
    cartData: any;
}

const PriceDetails = ({ cartData }: PriceDetailsI) => {

    const [totals, setTotals] = useState({
        totalMRP: 0,
        totalDiscount: 0,
        platformFee: 15,
        shippingFee: 40,
    });

    useEffect(() => {
        const calculateTotals = () => {
            let totalMRP = 0;
            let totalDiscount = 0;

            cartData.forEach((item: any) => {
                totalMRP += item.price * item.quantity;
                totalDiscount += (item.discount || 0) * item.quantity;
            });

            setTotals((prevTotals) => ({
                ...prevTotals,
                totalMRP,
                totalDiscount,
            }));
        };

        calculateTotals();
    }, [cartData]);

    const { totalMRP, totalDiscount, platformFee, shippingFee } = totals;
    const totalAmount = totalMRP - totalDiscount + platformFee + shippingFee;

    return (
        <div className=" w-full h-max border border-gray-400 rounded-lg text-gray-600 py-5 ">
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
            </div>
        </div>
    );
}

export default PriceDetails;
