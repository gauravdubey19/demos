"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const CustomersDetail = ({ userId }: { userId: string }) => {
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Customer Details
            {/* {"Gaurav Dubey".split(" ")[0]}, */}
          </h2>
          <div className="flex-center">
            <Button className="bg-[red] text-white">
              Delete User <RiDeleteBinLine size={20} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <UserDetail userId={userId} />
          <UserOrderTable />
        </div>
      </section>
    </>
  );
};

export default CustomersDetail;

const UserDetail = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="w-full h-[55vh] flex gap-2 bg-[#F8F8F8] rounded-xl p-4">
        <div className="pfp w-[30%] h-full flex-center border-r">
          <div className="flex-center flex-col gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="pfp"
                width={400}
                height={400}
                className="w-full h-full bg-zinc-200 rounded-full object-cover"
              />
            </div>
            <h2 className="">{userId}</h2>
            <h6 className="">Register at: 12/06/2022</h6>
            <Button className="text-white">
              Send Email <HiOutlineMail size={20} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="w-[70%] h-full overflow-hidden">
          <h2 className="w-full h-fit text-md md:text-lg lg:text-xl font-semibold">
            Personal Information
          </h2>
          <div className="w-full h-full px-2 space-y-4 mt-2 overflow-hidden">
            {info.map((pi, index) => (
              <div key={index} className="flex justify-between gap-6">
                <span>{pi.lable}</span>
                <span className="text-end">{pi.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const info = [
  { lable: "First name", value: "Gaurav" },
  { lable: "Last name", value: "D." },
  { lable: "Email", value: "gd@textile.csk" },
  { lable: "Phone", value: "1234567890" },
  { lable: "Gender", value: "Male" },
  {
    lable: "Address",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugit exercitationem natus minus soluta fuga ducimus maxime eos a at!",
  },
  { lable: "Pincode", value: "400057" },
];

const UserOrderTable = () => {
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const statusOption = ["all", "delivered", "pending", "shipped"];
  const [status, setStatus] = useState<string>(statusOption[0]);
  const [search, setSearch] = useState<string>("");

  const filteredOrders = orders
    .filter((order) => order.orderID.includes(search))
    .filter((order) => (status === "all" ? true : order.status === status))
    .sort((a, b) => {
      if (isAscending) {
        return a.orderID > b.orderID ? 1 : -1;
      } else {
        return a.orderID < b.orderID ? 1 : -1;
      }
    });
  return (
    <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4 select-none">
      <div className="w-full h-fit flex-between">
        <div className="w-fit font-semibold">Recent Orders</div>
        <div className="w-fit h-fit flex-between gap-2">
          {/* Search Bar */}
          <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
            <IoSearchOutline size={20} className="text-primary" />
            <input
              type="text"
              placeholder="Search By Order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="placeholder:text-primary bg-none border-none outline-none"
            />
          </div>

          <div className="relative group w-fit h-fit">
            <button className="h-fit text-white bg-primary capitalize py-1 px-3 rounded-md flex items-center">
              {status}{" "}
              <MdOutlineKeyboardArrowDown
                size={20}
                className="ml-1 group-hover:-rotate-180 ease-in-out duration-300"
              />
            </button>
            <div className="hidden group-hover:block animate-slide-down absolute left-0 right-0 -bottom-[25.5vh] z-40 w-full min-w-fit h-fit bg-slate-200 shadow-md rounded-md overflow-hidden">
              {statusOption.map((sp, index) => (
                <div
                  key={index}
                  onClick={() => setStatus(sp)}
                  className={`w-full cursor-pointer capitalize p-2 border-b border-b-slate-300 ${
                    status === sp && "text-primary bg-slate-100"
                  } hover:text-primary ease-in-out duration-300`}
                >
                  {sp}
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={() => setIsAscending(!isAscending)}
            className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2"
          >
            {isAscending ? (
              <FaArrowDownShortWide size={20} className="text-primary" />
            ) : (
              <FaArrowUpShortWide size={20} className="text-primary" />
            )}
          </div>
        </div>
      </div>

      <div className="relative w-full h-fit max-h-[72vh] border border-gray-300 rounded-2xl overflow-auto">
        <table className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
          <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Shipping</th>
              <th className="px-4 py-2 text-left">Delivery</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="h-fit group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
              >
                <td className="px-4 py-2 text-primary hover:underline">
                  {order.orderID}
                </td>
                <td className="px-4 py-2">{order.orderDate}</td>
                <td className="px-4 py-2">{order.shippingDate || "-"}</td>
                <td className="px-4 py-2">{order.deliveryDate || "-"}</td>
                <td className="px-4 py-2">₹ {order.price}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "pending"
                      ? "text-orange-500"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const orders = [
  {
    orderID: "012345",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012346",
    orderDate: "24-10-2020",
    shippingDate: "-",
    deliveryDate: "-",
    price: 100000,
    status: "pending",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012346",
    orderDate: "24-10-2020",
    shippingDate: "-",
    deliveryDate: "-",
    price: 100000,
    status: "pending",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
];
