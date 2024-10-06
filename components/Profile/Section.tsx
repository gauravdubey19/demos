"use client";

import { replaceHyphensWithSpaces } from "@/lib/utils";
import { SectionProps } from "@/lib/types";
import {  useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {  Order, useGlobalContext } from "@/context/GlobalProvider";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchBar from "./ProfileComponents/SearchBar";
import AllOrders from "./ProfileComponents/AllOrders";
import { useSession } from "next-auth/react";

const Section: React.FC<SectionProps> = ({ section, sections }) => {
 
  const router = useRouter();
  const {data:session} = useSession();
  const [orderDuration, setOrderDuration] = useState("past 3 months");
  const orderDurationOptions = ["past 3 months", "past 6 months", "2024"];
  const { fetchedOrders, fetchingOrders } = useGlobalContext();

  const tabs = [
    { id: "allOrders", label: "All Orders" },
    { id: "notShippedYet", label: "Not Shipped Yet" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
    { id: "search", label: "Search" },
  ];
  const { handleDeleteAddresses,suggestions,activeTab,setActiveTab, deletingAddresses} = useGlobalContext();
  if(!fetchedOrders) return (  
    <div className="
    flex items-center justify-center w-full h-full text-2xl font-semibold text-primary
    ">
      No Orders Found
    </div>
  )
  if ('error' in fetchedOrders) {
    // Handle the case where there is an error
    console.error(fetchedOrders.error);
    // return <div>Error fetching orders</div>;
  } 
 
  const renderTabContent = (fetchedOrders:Order[]) => {
    if(!Array.isArray(fetchedOrders)) return null;
    const pendingOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "pending");
    const deliveredOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "delivered");
    const cancelledOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "cancelled");
    switch (activeTab) {
      case "allOrders":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={fetchedOrders}/>;
      case "notShippedYet":
        return  <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={pendingOrders}/>
      case "delivered":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={deliveredOrders}/>;
      case "cancelled":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={cancelledOrders}/>;
      case "search":
        return <AllOrders fetchedOrders={suggestions} isSearch/>;
      default:
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={fetchedOrders}/>;
    }
  };

  return (
    <div className="w-full h-full flex flex-1 flex-col bg-[#F8F8F8] drop-shadow-lg overflow-hidden">
      <div className={`flex flex-col border-b p-4 shadow-sm md:px-8 md:py-6 ${section ==="order-history" && "border-none overflow-y-auto"}`}>
        <div className="flex-between">
          <h2
            className={`capitalize text-xl font-semibold tracking-tight ${
              section === "delete-my-account" && "text-red-500"
            }`}
          >
            {replaceHyphensWithSpaces(section)}
          </h2>

          {/* Shipping Addresses */}
          {section === "shipping-addresses" && (
            <div className="flex flex-row items-center justify-end">
              <Button
                className="hover:opacity-70 border border-primary mr-2"
                onClick={() => router.push("/profile/add-a-new-address")}
              >
                <IoAddSharp size={22} />
                Add Address
              </Button>
              <Button
                className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={handleDeleteAddresses}
                disabled={deletingAddresses}
              >
                {deletingAddresses ? "Deleting..." : "Delete All"}
              </Button>
            </div>
          )}

          {/* Filter */}
          {section === "order-history" && (
            <div className="flex-center gap-3">
              Filter:
              <div className="relative group w-fit h-fit">
                <Button className="h-fit text-white bg-primary capitalize py-2 px-3 rounded-md flex items-center">
                  {orderDuration}{" "}
                  <MdOutlineKeyboardArrowDown
                    size={20}
                    className="ml-1 group-hover:-rotate-180 ease-in-out duration-300"
                  />
                </Button>
                <div className="hidden group-hover:block animate-slide-down absolute right-0 top-full z-40 w-full h-fit bg-white shadow-md rounded-md overflow-hidden min-w-[200px]">
                  {orderDurationOptions.map((yr, index) => (
                    <div
                      key={index}
                      onClick={() => setOrderDuration(yr)}
                      className={`w-full cursor-pointer capitalize p-2 border-b border-b-slate-300 ${
                        orderDuration === yr && "text-primary bg-slate-100"
                      } hover:text-primary ease-in-out duration-300`}
                    >
                      {yr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {section === "order-history" && (
          <div className="w-full flex items-center justify-between gap-x-2 mt-4">
            <SearchBar fetchedOrders={fetchedOrders} />
          </div>
        )}

        {/* Tabs for Order History */}
        {section === "order-history" && (
          <>
            <div className="flex mt-6 border-b">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer px-4 py-2 text-center ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6 overflow-y-auto">{renderTabContent(fetchedOrders)}</div>
          </>
        )}
      </div>

        { section !== "order-history" && (
      <div className="w-full h-full overflow-y-scroll over-x">
        {sections.map((sec) =>
          section === sec.id ? <sec.sectionNode key={sec.id} /> : null
        )}
      </div>)
      }
    </div>

  );
};

export default Section;
