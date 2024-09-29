"use client";

import { replaceHyphensWithSpaces } from "@/lib/utils";
import { SectionProps } from "@/lib/types";
import {  useState } from "react";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Order, useGlobalContext } from "@/context/GlobalProvider";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchBar from "./ProfileComponents/SearchBar";
import AllOrders from "./ProfileComponents/AllOrders";

const Section: React.FC<SectionProps> = ({ section, sections }) => {
  const sampleData: Order[] = [
    {
      "_id": "65043225e93457d2e6b45e8f",
      "userId": "65043225e93457d2e6b45e90",
      "orderedProducts": [
        {
          "productId": "66eed4308449712754a8b968",
          "title": "Silk Sherwani",
          "slug": "silk-sherwani",
          "image": "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
          "price": 79.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "L",
          "color": "Black",
          "timestamps": "2024-09-28T12:00:00Z"
        },
        {
          "productId": "66eed4308449712754a8b961",
          "title": "Cotton Kurta",
          "slug": "cotton-kurta",
          "image": "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
          "price": 129.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "42",
          "color": "Brown",
          "timestamps": "2024-09-28T12:00:00Z"
        }
      ],
      "orderInfo": {
        "orderStatus": "delivered",
        "totalPrice": 209.98,
        "orderID": "123456",
        "orderDate": "2024-09-28T12:00:00Z",
        "deliveryDate": "2024-10-05T12:00:00Z",
        "shippingDate": "2024-09-29T12:00:00Z",
        "cancelledDate": "2024-09-30T12:00:00Z",
        "shippingAddress": "1234 Elm Street, Springfield, IL, 62704"
      },
      "timestamps": "2024-09-28T12:00:00Z"
    },
    {
      "_id": "65043225e93457d2e6b45e8e",
      "userId": "65043225e93457d2e6b45e90",
      "orderedProducts": [
        {
          "productId": "66eed4308449712754a8b968",
          "title": "Silk Sherwani",
          "slug": "silk-sherwani",
          "image": "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
          "price": 79.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "L",
          "color": "Black",
          "timestamps": "2024-09-28T12:00:00Z"
        },
        {
          "productId": "66eed4308449712754a8b961",
          "title": "Cotton Kurta",
          "slug": "cotton-kurta",
          "image": "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
          "price": 129.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "42",
          "color": "Brown",
          "timestamps": "2024-09-28T12:00:00Z"
        }
      ],
      "orderInfo": {
        "orderStatus": "shipped",
        "totalPrice": 209.98,
        "orderID": "234567",
        "orderDate": "2024-09-28T12:00:00Z",
        "deliveryDate": "2024-10-05T12:00:00Z",
        "shippingDate": "2024-09-29T12:00:00Z",
        "cancelledDate": "2024-09-30T12:00:00Z",
        "shippingAddress": "1234 Elm Street, Springfield, IL, 62704"
      },
      "timestamps": "2024-09-28T12:00:00Z"
    },
    {
      "_id": "65043225e93457d2e6b45e8a",
      "userId": "65043225e93457d2e6b45e90",
      "orderedProducts": [
        {
          "productId": "66eed4308449712754a8b968",
          "title": "Silk Sherwani",
          "slug": "silk-sherwani",
          "image": "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
          "price": 79.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "L",
          "color": "Black",
          "timestamps": "2024-09-28T12:00:00Z"
        },
        {
          "productId": "66eed4308449712754a8b961",
          "title": "Cotton Kurta",
          "slug": "cotton-kurta",
          "image": "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
          "price": 129.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "42",
          "color": "Brown",
          "timestamps": "2024-09-28T12:00:00Z"
        }
      ],
      "orderInfo": {
        "orderStatus": "cancelled",
        "totalPrice": 209.98,
        "orderID": "345678",
        "orderDate": "2024-09-28T12:00:00Z",
        "deliveryDate": "2024-10-05T12:00:00Z",
        "shippingDate": "2024-09-29T12:00:00Z",
        "cancelledDate": "2024-09-30T12:00:00Z",
        "shippingAddress": "1234 Elm Street, Springfield, IL, 62704"
      },
      "timestamps": "2024-09-28T12:00:00Z"
    },
    {
      "_id": "65043225e93457d2e6b45e8l",
      "userId": "65043225e93457d2e6b45e90",
      "orderedProducts": [
        {
          "productId": "66eed4308449712754a8b968",
          "title": "Silk Sherwani",
          "slug": "silk-sherwani",
          "image": "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
          "price": 79.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "L",
          "color": "Black",
          "timestamps": "2024-09-28T12:00:00Z"
        },
        {
          "productId": "66eed4308449712754a8b961",
          "title": "Cotton Kurta",
          "slug": "cotton-kurta",
          "image": "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
          "price": 129.99,
          "quantity": 1,
          "category": "sherwani",
          "size": "42",
          "color": "Brown",
          "timestamps": "2024-09-28T12:00:00Z"
        }
      ],
      "orderInfo": {
        "orderStatus": "pending",
        "totalPrice": 209.98,
        "orderID": "456789",
        "orderDate": "2024-09-28T12:00:00Z",
        "deliveryDate": "2024-10-05T12:00:00Z",
        "shippingDate": "2024-09-29T12:00:00Z",
        "cancelledDate": "2024-09-30T12:00:00Z",
        "shippingAddress": "1234 Elm Street, Springfield, IL, 62704"
      },
      "timestamps": "2024-09-28T12:00:00Z"
    }
  ];
  const router = useRouter();
  const [orderDuration, setOrderDuration] = useState("past 3 months");
  const orderDurationOptions = ["past 3 months", "past 6 months", "2024"];

  const tabs = [
    { id: "allOrders", label: "All Orders" },
    { id: "notShippedYet", label: "Not Shipped Yet" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
    { id: "search", label: "Search" },
  ];
  const pendingOrders = sampleData.filter((order) => order.orderInfo.orderStatus === "pending");
  const deliveredOrders = sampleData.filter((order) => order.orderInfo.orderStatus === "delivered");
  const cancelledOrders = sampleData.filter((order) => order.orderInfo.orderStatus === "cancelled");
  const { handleDeleteAddresses,suggestions,activeTab,setActiveTab} = useGlobalContext();

  const renderTabContent = () => {
    switch (activeTab) {
      case "allOrders":
        return <AllOrders sampleData={sampleData}/>;
      case "notShippedYet":
        return  <AllOrders sampleData={pendingOrders}/>
      case "delivered":
        return <AllOrders sampleData={deliveredOrders}/>;
      case "cancelled":
        return <AllOrders sampleData={cancelledOrders}/>;
      case "search":
        return <AllOrders sampleData={suggestions} isSearch/>;
      default:
        return <AllOrders sampleData={sampleData}/>;
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
              >
                Delete
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
            <SearchBar sampleData={sampleData} />
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
            <div className="mt-6 overflow-y-auto">{renderTabContent()}</div>
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
