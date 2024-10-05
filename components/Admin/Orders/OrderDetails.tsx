"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import ProductCard from "./ProductCard";
import productImg from "@/public/productImg.png";
import PriceDetails from "./PriceDetails";
import UserDetails from "./UserDetails";
import { OrderAdminSide, Product } from "@/context/GlobalProvider";
import { capitalizeString, formatTimestamp, generateSlug } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Loader from "@/components/ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const [fetchingOrder, setFetchingOrder] = useState<boolean>(true);
  const [address, setAddress] = useState<any>();
  const [fetchedOrder, setFetchedOrder] = useState<OrderAdminSide>();
  const [sampleCartData, setSampleCartData] = useState<any[]>([]);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string>("");

  useEffect(() => {
    // console.log("orderId: ", orderId);
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
        // console.log("fetched Order: ", data);
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
        };
        setAddress(addressTemp);
        setOrderStatus(data.orderInfo.orderStatus);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setFetchingOrder(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (fetchingOrder) return <Loader />;
  if (!fetchedOrder) return <div>Order not found</div>;

  return (
    <>
      <section className="w-full h-screen p-5 pb-10 overflow-y-auto">
        <div className="w-full h-fit flex justify-between items-center md:py-6">
          <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
            <span className="">Order ID </span>
            <span className=" text-[#FFB433]">
              #{fetchedOrder.orderInfo.orderID}
            </span>
          </h2>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="group text-white bg-primary capitalize rounded-md flex items-center"
            >
              Change Status{" "}
              <FiEdit className="ml-1 group-hover:scale-110 ease-in-out duration-300" />
            </Button>
          </div>
        </div>
        {/* toggle */}
        <div className="flex items-center flex-row gap-2">
          <div className="px-3 py-1 text-white bg-[#2ed396] rounded-lg capitalize">
            Paid
          </div>
          <div
            className={`px-3 py-1 text-white rounded-lg capitalize ${
              orderStatus === "pending"
                ? "bg-orange-500"
                : orderStatus === "cancelled"
                ? "bg-[red]"
                : orderStatus === "shipped"
                ? "bg-blue-500"
                : "bg-[#2CD396]"
            }`}
          >
            {/* Pending */}
            {orderStatus}
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
                <span>
                  {fetchedOrder.orderInfo.shippingDate
                    ? formatTimestamp(fetchedOrder.orderInfo.shippingDate)
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Date</span>
                <span>
                  {fetchedOrder.orderInfo.deliveryDate
                    ? formatTimestamp(fetchedOrder.orderInfo.deliveryDate)
                    : "-"}
                </span>
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

      <ChangeStatusPopUp
        orderId={orderId}
        currentStatus={capitalizeString(orderStatus)}
        setOrderStatus={setOrderStatus}
        isStatusOpen={isStatusOpen}
        handleStatusClose={() => setIsStatusOpen(!isStatusOpen)}
      />
    </>
  );
};

export default OrderDetails;

const ChangeStatusPopUp: React.FC<{
  orderId: string;
  currentStatus: string;
  setOrderStatus: (orderStatus: string) => void;
  isStatusOpen: boolean;
  handleStatusClose: () => void;
}> = ({
  orderId,
  currentStatus,
  setOrderStatus,
  isStatusOpen,
  handleStatusClose,
}) => {
  const statusOptions: string[] = [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [updatedStatus, setUpdatedStatus] = useState<string>(currentStatus);

  const handleChange = (value: string) => {
    setUpdatedStatus(value);
  };

  const updateOrderStatus = async () => {
    if (!orderId || !updatedStatus) {
      toast({
        title:
          "Something went wrong while getting the order Id or updated status",
        description: "Please try again later...",
        variant: "destructive",
      });
      handleStatusClose();
    }
    try {
      setLoadingSave(true);
      const res = await fetch("/api/orders/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          updatedStatus: generateSlug(updatedStatus),
        }),
      });

      const data = await res.json();

      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you can view the order status."
          : "Please try again later...",
        variant: data.error ? "destructive" : "default",
      });

      if (res.ok) {
        setLoadingSave(false);
        setOrderStatus(generateSlug(updatedStatus));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Something went wrong while updating status",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };
  console.log(
    "status",
    generateSlug(currentStatus),
    generateSlug(updatedStatus)
  );

  return (
    <>
      <Dialog open={isStatusOpen} onOpenChange={handleStatusClose}>
        <DialogContent className="w-full h-fit flex flex-col gap-8">
          <DialogTitle>Change the status</DialogTitle>
          <Select
            value={updatedStatus}
            defaultValue={currentStatus}
            onValueChange={handleChange}
          >
            <SelectTrigger className="w-full bg-transparent border border-primary rounded-none">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="capitalize cursor-pointer"
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            disabled={loadingSave || currentStatus === updatedStatus}
            onClick={updateOrderStatus}
          >
            {loadingSave
              ? "Saving Status..."
              : currentStatus === updatedStatus
              ? "Change Status first"
              : "Save Status"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
