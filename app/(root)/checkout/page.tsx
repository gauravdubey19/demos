"use client";
import Address from '@/components/Checkout/Address';
import ShoppingCart from '@/components/Checkout/ShoppingCart';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import ProgressIndicator from '@/components/Checkout/ProgressIndicator';
import PriceDetails from '@/components/Checkout/PriceDetails';
import Payment from '@/components/Checkout/Payment';

const CheckoutPage = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [addressData, setAddressData] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const handlePlaceOrder = ()=>{
    const selectedProductIds = cartData
      .filter((item) => item.selected)   
      .map((item) => item._id);          
      
    console.log('Selected Product IDs:', selectedProductIds);
    console.log('Selected Address ID:', selectedAddressId);
  }


  useEffect(() => {
    if (session?.user?.id) {
      getCartItems();
      getUserAddress();
    }
  }, [session]);

  const getUserAddress = async () => {
    if (session) {
      try {
        const response = await fetch(`/api/contact/${session.user.id}/get-All-contacts-by-user-Id/`);
        if (response.ok) {
          const res = await response.json();
          const initialAddress = res.map((item: any) => ({
            ...item,
            selected: true,
          }));
          console.log(initialAddress);
          setAddressData(initialAddress);
          // setSelectedAddress(initialAddress.length);
        } else {
          console.error('Failed to fetch address');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };


  const getCartItems = async () => {
    if (session) {
      try {
        const response = await fetch(`/api/products/read/get-user-cart-items/${session.user.id}/`);
        if (response.ok) {
          const res = await response.json();
          const initialCartData = res.map((item: any) => ({
            ...item,
            selected: true,
          }));
          setCartData(initialCartData);
          setSelectedItems(initialCartData.length);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  const handleRemoveCartItem = async (id: any) => {
    try {
      const response = await fetch(`/api/products/delete/delete-cart-item-by-id/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log("Item removed successfully:", result);

      setCartData((prevCartData) => {
        const updatedCartData = prevCartData.filter((item) => item._id !== id);
        setSelectedItems(updatedCartData.filter((item) => item.selected).length);
        return updatedCartData;
      });
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleRemoveAllCartItems = async () => {
    try {
      if (session?.user?.id) {
        const response = await fetch(`/api/products/delete/delete-users-all-cart-items/${session.user.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log("All items removed successfully:", result);

        setCartData([]);
        setSelectedItems(0);
      }
    } catch (error) {
      console.error("Error removing all cart items:", error);
    }
  };

  const handleSelectItem = (id: any, isSelected: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item._id === id ? { ...item, selected: isSelected } : item
      )
    );
    setSelectedItems((prevSelected) =>
      isSelected ? prevSelected + 1 : prevSelected - 1
    );
  };

  const handleSelectAll = (selectAll: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) => ({ ...item, selected: selectAll }))
    );
    setSelectedItems(selectAll ? cartData.length : 0);
  };

  const handleProceed = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('address');
    } else if (checkoutStep === 'address') {
      setCheckoutStep('payment');
    }
  };

  return (
    <div className="h-max w-full pt-20">
      {/* <ProgressIndicator /> */}
      <ProgressIndicator currentStep={checkoutStep} />
      <div className="pt-7 px-2 w-full flex justify-between md:flex-row flex-col gap-3 pb-5">
        <div className="md:w-[75%] w-full p-5 min-h-60 max-h-max border border-[#8888] rounded-lg">
          
          <h1 className="text-2xl md:text-3xl text-black">
            {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'address' && 'Choose Address & Contact Info'}
            {checkoutStep === 'payment' && 'Payment'}
          </h1>

          {checkoutStep === 'cart' && (
            <ShoppingCart
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              cartData={cartData}
              onRemoveCartItem={handleRemoveCartItem}
              onRemoveAllItems={handleRemoveAllCartItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
            />
          )}
          {checkoutStep === 'address' && 
            <Address
               addressData={addressData}
               handleSelectAddress={handleSelectAddress}
               selectedAddressId={selectedAddressId}
             />
          }
          {checkoutStep === 'payment' && 
            <Payment
            handlePlaceOrder={handlePlaceOrder}
            />
          }
        </div>
        <PriceDetails
          cartData={cartData}
          selectedItems={selectedItems}
          onProceed={handleProceed}
          currentStep={checkoutStep}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;