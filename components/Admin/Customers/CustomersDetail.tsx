"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatTimestamp } from "@/lib/utils";
import { Button } from "../../ui/button";
import Loader from "@/components/ui/Loader";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { DeletePopUp } from "../Products/Category/CategoryDetail";

interface UserValues {
  _id: string;
  email: string;
  phone_number: string;
  firstName: string;
  lastName: string;
  profile: string;
  gender: string;
  createdAt: string;
  address: string;
  state: { name: string; code: string };
  city: { name: string; code: string };
  zipCode: string;
}

const CustomersDetail: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<UserValues | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const handleDletePopupClose = () => {
    // setSelectedProduct({ id: "", title: "" });
    setIsDeleteOpen(false);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch(`/api/users/${userId}`);
        const userContactRes = await fetch(`/api/contact/${userId}`);

        if (!userRes.ok || !userContactRes.ok) {
          throw new Error("Failed to fetch user collection");
        }

        const userData = await userRes.json();
        const userContactData = await userContactRes.json();
        const userFullData: UserValues = {
          _id: userData?._id,
          email: userData?.email,
          phone_number: userData?.phone_number,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          profile: userData?.profile,
          gender: userData?.gender,
          createdAt: userData?.createdAt,
          address: userContactData?.address,
          state: {
            name: userContactData?.state?.name,
            code: userContactData?.state?.code,
          },
          city: {
            name: userContactData?.city?.name,
            code: userContactData?.city?.code,
          },
          zipCode: userContactData?.zipCode,
        };

        setUser(userFullData);
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    if (!user) fetchUser();
  }, [user, userId]);

  if (!user) return <Loader />;

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <header className="w-full h-fit flex justify-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Customer Details
          </h2>
          <Button className="bg-red-500 text-white">
            Delete User <RiDeleteBinLine size={20} className="ml-1" />
          </Button>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <UserDetail user={user} />
          <UserOrderTable />
        </div>
      </section>
      {isDeleteOpen && (
        <DeletePopUp
          action="delete-user"
          id={user._id}
          title={user.firstName + " " + user.lastName}
          isDeleteOpen={isDeleteOpen}
          handleDeleteClose={handleDletePopupClose}
        />
      )}
    </>
  );
};

const UserDetail: React.FC<{ user: UserValues }> = ({ user }) => {
  return (
    <div className="w-full h-[55vh] flex gap-2 bg-gray-100 rounded-xl p-4">
      <div className="pfp w-[30%] h-full flex-center flex-col gap-4 md:gap-6 border-r">
        <div className="flex-center flex-col space-y-2">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Image
              src={user?.profile ?? "/logo.png"}
              alt="Profile Picture"
              width={400}
              height={400}
              className="w-full h-full bg-zinc-200 rounded-full object-cover"
            />
          </div>
          <h2 className="capitalize">{`${user?.firstName} ${user?.lastName}`}</h2>
        </div>
        <h6>Registered at: {formatTimestamp(user.createdAt)}</h6>
        {/* <Button className="text-white">
              Send Email <HiOutlineMail size={20} className="ml-1" />
            </Button> */}
      </div>
      <div className="w-[70%] h-full overflow-hidden">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold">
          Personal Information
        </h2>
        <div className="w-full h-full max-h-[44vh] px-2 md:px-4 space-y-4 mt-2 overflow-x-hidden overflow-y-scroll">
          <DetailRow label="First name" value={user.firstName} />
          <DetailRow label="Last name" value={user.lastName} />
          {user.email && <DetailRow label="Email" value={user.email} />}
          {user.phone_number && (
            <DetailRow label="Phone" value={user.phone_number} />
          )}
          {user.gender && <DetailRow label="Gender" value={user.gender} />}
          <DetailRow label="Address" value={user.address} />
          <DetailRow label="State" value={user.state.name} />
          <DetailRow label="City" value={user.city.name} />
          <DetailRow label="Zip code" value={user.zipCode} />
        </div>
      </div>
    </div>
  );
};

export default CustomersDetail;

const UserOrderTable = () => {
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const statusOption = ["all", "delivered", "pending", "shipped", "cancelled"];
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
            <div className="hidden group-hover:block animate-slide-down absolute left-0 right-0 top-full z-40 w-full min-w-fit h-fit bg-slate-200 shadow-md rounded-md overflow-hidden">
              {statusOption.map((sp, index) => (
                <div
                  key={index}
                  onClick={() => setStatus(sp)}
                  className={`w-full cursor-pointer capitalize p-2 border-b border-b-slate-300 ${
                    status === sp && "text-primary bg-slate-100"
                  } ${
                    sp === "delivered"
                      ? "text-[#2CD396]"
                      : sp === "pending"
                      ? "text-orange-500"
                      : sp === "cancelled"
                      ? "text-[red]"
                      : "text-blue-600"
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
        <table className="w-full bg-white rounded-2xl">
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
          <tbody
            className={`relative ${
              filteredOrders.length === 0 ? "h-10" : "h-fit"
            }`}
          >
            {filteredOrders.length === 0 ? (
              <tr className="absolute inset-0 w-full h-full py-2 flex-center">
                No Orders found
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
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
                    className={`px-4 py-2 capitalize ${
                      order.status === "delivered"
                        ? "text-[#2CD396]"
                        : order.status === "pending"
                        ? "text-orange-500"
                        : order.status === "cancelled"
                        ? "text-[red]"
                        : "text-blue-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            )}
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

export const DetailRow: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between gap-6">
    <span>{label}</span>
    <span className="text-end">{value}</span>
  </div>
);
