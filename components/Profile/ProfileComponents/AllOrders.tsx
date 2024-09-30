"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { IoCheckmarkCircleSharp, IoChevronDown, IoChevronUp } from "react-icons/io5";
import OrderImage from '@/public/assets/orderBox.png';
import { MdCancel, MdOutlineCurrencyRupee } from 'react-icons/md';
import OrderCardProduct from './OrdersCardProduct';
import { AllOrdersProps, Order, useGlobalContext } from '@/context/GlobalProvider';

const AllOrders: React.FC<AllOrdersProps> = ({ fetchedOrders,isSearch=false,fetchingOrders }) => {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState<number | null>(null);
  const [clientRendered, setClientRendered] = useState(false);
  const {searchLoading,searchQuery} = useGlobalContext();
  useEffect(() => {
    setClientRendered(true);
  }, []);

  const orderStatusLine = (status: string, order: Order) => {
    switch (status) {
      case 'pending':
        return <span className={`font-mont text-base text-primary`}>Order is pending since {formatDate(order.orderInfo.orderDate)} </span>;
      case 'shipped':
        if(!order.orderInfo.shippingDate) return <span className={`font-mont text-base text-blue-500`}>Order is shipped</span>;
        return <span className={`font-mont text-base text-blue-500`}>Order is shipped since {formatDate(order.orderInfo.shippingDate)}</span>;
      case 'delivered':
        if(!order.orderInfo.deliveryDate) return <span className={`font-mont text-base text-green`}>Order is delivered</span>;
        return <span className={`font-mont text-base text-green`}>Order is delivered on {formatDate(order.orderInfo.deliveryDate)}</span>;
      case 'cancelled':
        if(!order.orderInfo.cancelledDate) return <span className={`font-mont text-base text-red-500`}>Order is cancelled</span>;
        return <span className={`font-mont text-base text-red-500`}>Order is cancelled on {formatDate(order.orderInfo.cancelledDate)}</span>;
      default:
        return 'Order status not available';
    }
  };

  const toggleOrder = (index: number) => {
    setExpandedOrderIndex(index === expandedOrderIndex ? null : index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  };
  if(fetchingOrders){
    return <div className="flex justify-center items-center h-[300px]"><p className="font-mont text-lg">Fetching orders...</p></div>
  }
  if(!searchQuery.trim() && isSearch){
    return <div className="flex justify-center items-center h-[300px]"><p className="font-mont text-lg">Search for an order ID</p></div>
  }
  if(isSearch && searchLoading && searchQuery.trim() !== ""){
    return <div className="flex justify-center items-center h-[300px]"><p className="font-mont text-lg ">Searching...</p></div>
  }
if(fetchedOrders.length === 0){
  return <div className="flex justify-center items-center h-[300px]"><p className="font-mont text-lg">No orders found</p></div>
}

  return (
    <div className=''>
      {fetchedOrders.map((order, orderIndex) => (
        <div key={order._id} className='bg-white p-4 rounded-md mb-4'>
          {/* Order Header - Accordion */}
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() => toggleOrder(orderIndex)}
          >
            <div className='flex flex-row gap-4 items-center justify-start'>
              <div className='relative'>
                <Image
                  src={OrderImage}
                  alt='Order Image'
                  width={60}
                  height={60}
                  className='object-cover rounded-md'
                />
                {order.orderInfo.orderStatus === 'delivered' && (
                  <IoCheckmarkCircleSharp className='absolute bottom-0 right-0' size={20} color='#2CD396' />
                )}
                {order.orderInfo.orderStatus === 'shipped' && (
                  <IoCheckmarkCircleSharp className='absolute bottom-0 right-0' size={20} color='#007AFF' />
                )}
                {order.orderInfo.orderStatus === 'cancelled' && (
                  <MdCancel className='absolute bottom-0 right-0' size={20} color='#FF3B30' />
                )}
              </div>
              <div className='flex flex-row gap-6 items-center'>
                <div className='flex flex-col gap-1'>
                  <p className='font-mont text-color-tertiary text-sm'>Order Placed</p>
                  <p className='font-dmSansSemiBold'>{clientRendered ? formatDate(order.orderInfo.orderDate) : '...'}</p>
                </div>
                <div className='bg-primary w-[0.5px] h-[50px]' />
                <div className='flex flex-col gap-1'>
                  <p className='font-mont text-color-tertiary text-sm'>Total Price</p>
                  <p className='font-dmSansSemiBold flex flex-row items-center'>
                    <MdOutlineCurrencyRupee size={18} />
                    {clientRendered ? order.orderInfo.totalPrice : '...'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              {expandedOrderIndex === orderIndex ? (
                <IoChevronUp size={24} />
              ) : (
                <IoChevronDown size={24} />
              )}
            </div>
          </div>

          {/* Order Products - Show when order is expanded */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedOrderIndex === orderIndex ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className='p-3 border-t border-gray-300 mt-4'>
              <div>
                <span className='font-mont text-base'>Order Status: </span>
                {orderStatusLine(order.orderInfo.orderStatus, order)}
              </div>
              <div className='mt-1'>
                <span className='font-mont text-base'>Order ID: </span>
                <span className='font-montSemiBold text-base'>{order.orderInfo.orderID}</span>
              </div>
              {order.orderedProducts.map((product) => (
                <OrderCardProduct key={product.productId} data={product} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
