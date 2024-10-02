"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import ProductCard from "./ProductCard";
import productImg from "@/public/productImg.png";
import PriceDetails from "./PriceDetails";
import UserDetails from "./UserDetails";
import { OrderAdminSide, Product } from "@/context/GlobalProvider";
import { formatTimestamp } from "@/lib/utils";

const OrderDetails = ({

  orderId,
}: {
  orderId: string;
}) => {

  const [fetchingOrder, setFetchingOrder] = useState<boolean>(true);
  const [address, setAddress] = useState<any>();
  const [fetchedOrder, setFetchedOrder] = useState<OrderAdminSide>();
  const [sampleCartData, setSampleCartData] = useState<any[]>([]);
  useEffect(() => {
    console.log("orderId: ", orderId);
    const fetchOrder = async () => {
      try {
        setFetchingOrder(true);
        const res = await fetch(`/api/orders/get-single-order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();
        console.log("fetched Order: ",data);
        setFetchedOrder(data);
          let sampleCartDataTemp: any[] = [];
          data.orderedProducts.map((product: Product) => {
            sampleCartDataTemp.push({
              id: product.productId,
              name: product.title,
              price: product.price,
              discount: 0,
              quantity: product.quantity,
              selected: true,
            });
          });
          setSampleCartData(sampleCartDataTemp);

          let addressTemp = {
            shippingAddress: data.orderInfo.shippingAddress,
            zipCode: data.orderInfo.zipCode,
          }
          setAddress(addressTemp);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setFetchingOrder(false);
      }
    };

    fetchOrder();
  }, [orderId]);


  return (
    <div className="p-5 pb-10 h-screen overflow-y-auto">
      {fetchingOrder ? <div>Loading...</div> :
      ( !fetchedOrder ? 
      <div>Order not found</div> :
      <section className="w-full h-full">
        <div className="w-full h-fit flex justify-between items-center md:py-6">
          <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
            <span className="">Order ID{" "}</span>
            <span className=" text-[#FFB433]">#{fetchedOrder.orderInfo.orderID}</span>
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
                <span>{formatTimestamp(fetchedOrder.orderInfo.orderDate)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Date</span>
                <span>{
                  fetchedOrder.orderInfo.shippingDate ? formatTimestamp(fetchedOrder.orderInfo.shippingDate) : "-"
                  }</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Date</span>
                <span>{ 
                  fetchedOrder.orderInfo.deliveryDate ? formatTimestamp(fetchedOrder.orderInfo.deliveryDate) : "-"
                  }</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹ {fetchedOrder.orderInfo.totalPrice}</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-7">Product Details</h2>

            {/* cards */}
            <div className="">
              {fetchedOrder.orderedProducts.map((product, index) => (
                <ProductCard key={index} data={product} />
              ))}
            </div>
          </div>
          {/* right */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4 sticky top-20">
            <PriceDetails cartData={sampleCartData} />
            <UserDetails userData={fetchedOrder.userId} address={address} />
          </div>
        </div>
      </section>
      )
}
    </div>
  );
};

export default OrderDetails;
