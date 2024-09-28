"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoCheckmarkCircleSharp, IoSearchOutline } from "react-icons/io5";
import OrderImage from '@/public/assets/orderBox.png';
import { AllOrdersProps, Order, useGlobalContext } from "@/context/GlobalProvider";
import { MdCancel } from "react-icons/md";

const SearchBar:React.FC<AllOrdersProps> = ({sampleData}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { setSuggestions, setActiveTab,activeTab, setSearchLoading,searchQuery,setSearchQuery } = useGlobalContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
        if (searchQuery.trim() === "") {
            setSuggestions([]);
            setSearchLoading(false);
            return;
        }
    
        setSearchLoading(true);
        // Perform your search logic here using sampleData
        let searchedData = sampleData.filter((item) =>
            item.orderInfo.orderID.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setSuggestions(searchedData);
        setSearchLoading(false);
    };

    if (isFirstRender.current) {
      fetchSuggestions();
      isFirstRender.current = false;
    } else {
      const delayFetch = setTimeout(fetchSuggestions, 2000);
      return () => clearTimeout(delayFetch);
    }
  }, [searchQuery]);

  return (
    <>
      <div className="relative w-full">
        <div id="search" className="flex flex-row items-center justify-start lg:bg-white w-full rounded-md px-2 border border-[#D8D8D8]">
          <IoSearchOutline
            size={20}
            className="text-zinc-400 scale-150 lg:scale-100 w-[5%] "
          />
          <input
            type="text"
            placeholder="Search for an order ID"
            className="bg-transparent border-none outline-none p-2  w-[95%]"
            value={searchQuery}
            onChange={(e) => {
                setSearchLoading(true);
                if(activeTab !=='search'){
                    setActiveTab('search');
                }
                if(e.target.value.trim() === ""){
                    setSuggestions([]);
                    setSearchLoading(false);
                }
                if(!isNaN(Number(e.target.value))){
                setSearchQuery(e.target.value);
                }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>

        {/* {searchQuery.trim() !== "" && false && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-md z-10 border rounded-md p-2 space-y-2">
            {loading ? (
              <li className="p-2 text-gray-500">Loading suggestions...</li>
            ) : suggestions.length > 0 ? (
              suggestions.map((item) => (
                <li key={item._id} className="p-2 border-b border-gray-200 cursor-pointer hover:bg-slate-50" onClick={()=>{
                    setSearchQuery(item.orderInfo.orderID);
                    setShowSuggestions(false);
                }}>
                    <div className="flex flex-row items-center gap-4">
                    <div className='relative'>
                        <Image
                        src={OrderImage}
                        alt='Order Image'
                        width={50}
                        height={50}
                        className='object-cover rounded-md'
                        />
                        {item.orderInfo.orderStatus === 'delivered' && (
                        <IoCheckmarkCircleSharp className='absolute bottom-0 right-0' size={20} color='#2CD396' />
                        )}
                        {item.orderInfo.orderStatus === 'shipped' && (
                        <IoCheckmarkCircleSharp className='absolute bottom-0 right-0' size={20} color='#007AFF' />
                        )}
                        {item.orderInfo.orderStatus === 'cancelled' && (
                        <MdCancel className='absolute bottom-0 right-0' size={20} color='#FF3B30' />
                        )}
                    </div>
                      <div>
                        <h3 className=" font-semibold">OrderID: {item.orderInfo.orderID}</h3>
                        <p className="text-sm mt-1 text-gray-500 capitalize">Order Status: {item.orderInfo.orderStatus}</p>
                      </div>
                      </div>
                </li>
              ))
            ) : !loading ? (
              <li className="p-2 text-gray-500">
                No Order found matching your query..
              </li>
            ) : null}
          </ul>
        )} */}
      </div>
    </>
  );
};

export default SearchBar;
