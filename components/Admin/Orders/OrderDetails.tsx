import React from "react";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Order Analysis
          </h2>
          <div className="flex-center gap-1">
            <Button
              size="sm"
              className="group text-white bg-primary capitalize rounded-md flex items-center"
            >
              Change Status{" "}
              <FiEdit className="ml-1 group-hover:scale-110 ease-in-out duration-300" />
            </Button>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <div className="flex-between gap-2">
            <OrderDetail />
            {/* <OrdersTable /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;

const OrderDetail = () => {
  return <></>;
};
