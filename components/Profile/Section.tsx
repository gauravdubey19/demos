

"use client"
import React, { useEffect, useState } from "react";
import { replaceHyphensWithSpaces } from "@/lib/utils";
import { SectionProps } from "@/lib/types";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Order, useGlobalContext } from "@/context/GlobalProvider";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchBar from "./ProfileComponents/SearchBar";
import AllOrders from "./ProfileComponents/AllOrders";

const Section: React.FC<SectionProps> = ({ section, sections }) => {
  const router = useRouter();
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
  const { handleDeleteAddresses, suggestions, activeTab, setActiveTab, deletingAddresses } = useGlobalContext();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!fetchedOrders) return (
    <div className="flex items-center justify-center w-full h-full text-2xl font-semibold text-primary">
      No Orders Found
    </div>
  );

  if ('error' in fetchedOrders) {
    console.error(fetchedOrders.error);
  }

  const renderTabContent = (fetchedOrders: Order[]) => {
    if (!Array.isArray(fetchedOrders)) return null;
    const pendingOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "pending");
    const deliveredOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "delivered");
    const cancelledOrders = fetchedOrders.filter((order) => order.orderInfo.orderStatus === "cancelled");
    switch (activeTab) {
      case "allOrders":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={fetchedOrders} />;
      case "notShippedYet":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={pendingOrders} />;
      case "delivered":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={deliveredOrders} />;
      case "cancelled":
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={cancelledOrders} />;
      case "search":
        return <AllOrders fetchedOrders={suggestions} isSearch />;
      default:
        return <AllOrders fetchingOrders={fetchingOrders} fetchedOrders={fetchedOrders} />;
    }
  };

  const renderOrderHistory = () => (
    <div className={`flex flex-col ${isMobile ? 'space-y-4' : ''}`}>
      <h2 className="capitalize lg:text-xl font-semibold tracking-tight">
        {replaceHyphensWithSpaces(section)}
      </h2>

      {isMobile ? (
        <>
          <div className="flex justify-between items-center">
            <div className="relative group flex-1 mr-2">
              <Button className="w-full text-white bg-primary capitalize py-2 px-3 rounded-md flex items-center justify-between">
                {tabs.find(tab => tab.id === activeTab)?.label || "Select Tab"}
                <MdOutlineKeyboardArrowDown size={20} className="ml-1" />
              </Button>
              <div className="hidden group-hover:block animate-slide-down absolute left-0 top-full z-40 w-full bg-white shadow-md rounded-md">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer capitalize p-2 border-b border-gray-300 ${
                      activeTab === tab.id && "text-primary bg-gray-100"
                    } hover:bg-gray-100 transition duration-300`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end flex-1">
              {/* <span className="mb-1">Filter:</span> */}
              <div className="relative group w-full">
                <Button className="w-full text-white bg-primary capitalize py-2 px-3 rounded-md flex items-center justify-between">
                  {orderDuration}
                  <MdOutlineKeyboardArrowDown size={20} className="ml-1" />
                </Button>
                <div className="hidden group-hover:block animate-slide-down absolute right-0 top-full z-40 w-full bg-white shadow-md rounded-md">
                  {orderDurationOptions.map((yr, index) => (
                    <div
                      key={index}
                      onClick={() => setOrderDuration(yr)}
                      className={`cursor-pointer capitalize p-2 border-b border-gray-300 ${
                        orderDuration === yr && "text-primary bg-gray-100"
                      } hover:bg-gray-100 transition duration-300`}
                    >
                      {yr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SearchBar fetchedOrders={fetchedOrders} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4">
            <div className="flex mt-6 border-b overflow-visible">
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

            <div className="flex items-center gap-3">
              <span>Filter:</span>
              <div className="relative group">
                <Button className="text-white bg-primary capitalize py-2 px-3 rounded-md flex items-center">
                  {orderDuration}{" "}
                  <MdOutlineKeyboardArrowDown
                    size={20}
                    className="ml-1 transition-transform duration-300 ease-in-out group-hover:-rotate-180"
                  />
                </Button>
                <div className="hidden group-hover:block animate-slide-down absolute right-0 top-full z-40 w-full bg-white shadow-md rounded-md min-w-[200px]">
                  {orderDurationOptions.map((yr, index) => (
                    <div
                      key={index}
                      onClick={() => setOrderDuration(yr)}
                      className={`cursor-pointer capitalize p-2 border-b border-gray-300 ${
                        orderDuration === yr && "text-primary bg-gray-100"
                      } hover:bg-gray-100 transition duration-300`}
                    >
                      {yr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <SearchBar fetchedOrders={fetchedOrders} />
          </div>
        </>
      )}

      <div className="mt-6 overflow-y-auto">
        {renderTabContent(fetchedOrders)}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#F8F8F8] drop-shadow-lg overflow-hidden">
      <div className={`flex flex-col border-b p-4 shadow-sm md:px-8 md:py-6 ${section === "order-history" && "border-none overflow-y-auto"}`}>
        {section === "order-history" ? (
          renderOrderHistory()
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className={`capitalize lg:text-xl font-semibold tracking-tight ${section === "delete-my-account" && "text-red-500"}`}>
                {replaceHyphensWithSpaces(section)}
              </h2>

              {section === "shipping-addresses" && (
                <div className="flex flex-col lg:flex-row md:flex-row items-center justify-end space-y-2 md:space-y-0 md:space-x-2">
                  <Button
                    className="hover:opacity-70 border border-primary w-full lg:w-auto lg:px-4 lg:py-2 md:p-2 text-xs lg:text-md md:text-sm"
                    onClick={() => router.push("/profile/add-a-new-address")}
                  >
                    <IoAddSharp size={22} />
                    Add Address
                  </Button>
                  <Button
                    className="bg-white border border-red-500 text-red-500 w-full lg:w-auto lg:px-4 lg:py-2 md:p-2 text-xs lg:text-md md:text-sm hover:bg-red-500 hover:text-white"
                    onClick={handleDeleteAddresses}
                    disabled={deletingAddresses}
                  >
                    {deletingAddresses ? "Deleting..." : "Delete All"}
                  </Button>
                </div>
              )}
            </div>

            <div className="w-full h-full overflow-y-scroll mt-4">
              {sections.map((sec) =>
                section === sec.id ? <sec.sectionNode key={sec.id} /> : null
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Section;