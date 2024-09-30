"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartProvider";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from '@/components/Checkout/ProgressIndicator';
import PriceDetails from '@/components/Checkout/PriceDetails';
import Address from '@/components/Checkout/Address';
import ShoppingCart from '@/components/Checkout/ShoppingCart';
import Payment from '@/components/Checkout/Payment';

const CheckoutPage = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [addressData, setAddressData] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [totals, setTotals] = useState({
      totalMRP: 0,
      totalDiscount: 0,
      platformFee: 15,
      shippingFee: 40,
  });
  const [selectedItemsData, setSelectedItemsData] = useState<{ id: string, quantity: number }[]>([]);

  const { cart, isOpen, setOpen } = useCart();


  const handlePlaceOrder=()=>{
    console.log("Selected items with quantities:", selectedItemsData);
    console.log("selectedItems : ", selectedItems);
    console.log("selectedAddressId : ", selectedItems);
    console.log("shippingFee : ", totals.shippingFee);
    console.log("totalDiscount : ", totals.totalDiscount);
    console.log("platformFee : ", totals.platformFee);
    console.log("totalMRP : ", totals.totalMRP);
    const totalAmount = totals.totalMRP - totals.totalDiscount + totals.platformFee + totals.shippingFee;
    console.log("totalAmount : ", totalAmount);
  }

  // Memoizing getUserAddress with useCallback
  const getUserAddress = useCallback(async () => {
    if (session) {
      try {
        const response = await fetch(`/api/contact/${session.user.id}/get-All-contacts-by-user-Id/`);
        if (response.ok) {
          const res = await response.json();
          const initialAddress = res.map((item: any) => ({
            ...item,
            selected: true,
          }));
          setAddressData(initialAddress);
        } else {
          console.error('Failed to fetch address');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  }, [session]);

  // Memoizing getCartItems with useCallback
  const getCartItems = useCallback(async () => {
    if (session) {
      try {
        const initialCartData = cart.map((item: any) => ({
          ...item,
          selected: true,
        }));
        setCartData(initialCartData);
        setSelectedItems(initialCartData.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  }, [session, cart]);

  // const handleSelectItem = (id: any, isSelected: boolean) => {
  //   setCartData((prevCartData) =>
  //     prevCartData.map((item) =>
  //       item.productId === id ? { ...item, selected: isSelected } : item
  //     )
  //   );
  //   setSelectedItems((prevSelected) => (isSelected ? prevSelected + 1 : Math.max(prevSelected - 1, 0)));
  // };
  const handleSelectItem = (id: any, isSelected: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.productId === id ? { ...item, selected: isSelected } : item
      )
    );
    setSelectedItems((prevSelected) => (isSelected ? prevSelected + 1 : Math.max(prevSelected - 1, 0)));

    // Update selectedItemsData
    setSelectedItemsData((prevData) => {
      if (isSelected) {
        const selectedItem = cartData.find(item => item.productId === id);
        return [...prevData, { id: id, quantity: selectedItem.quantity }];
      } else {
        return prevData.filter(item => item.id !== id);
      }
    });
  };

  // const handleSelectAll = (selectAll: boolean) => {
  //   setCartData((prevCartData) => prevCartData.map((item) => ({ ...item, selected: selectAll })));
  //   setSelectedItems(selectAll ? cartData.length : 0);
  // };
  const handleSelectAll = (selectAll: boolean) => {
    setCartData((prevCartData) => prevCartData.map((item) => ({ ...item, selected: selectAll })));
    setSelectedItems(selectAll ? cartData.length : 0);

    // Update selectedItemsData
    if (selectAll) {
      setSelectedItemsData(cartData.map(item => ({ id: item.productId, quantity: item.quantity })));
    } else {
      setSelectedItemsData([]);
    }
  };

  const handleProceed = () => {
    if (checkoutStep === 'cart' && selectedItems === 0) {
      toast({ title: "No items selected", description: "Please select at least one item.", variant: "destructive" });
    } else if (checkoutStep === 'cart') {
      setCheckoutStep('address');
    } else if (checkoutStep === 'address' && !selectedAddressId) {
      toast({ title: "Select an address", variant: "destructive" });
    } else {
      setCheckoutStep('payment');
    }
  };

  useEffect(() => {
    setOpen(false);
    if (session?.user?.id) {
      getCartItems();
      getUserAddress();
    }
  }, [session, getCartItems, getUserAddress, setOpen]);

  return (
    <div className="h-max w-full pt-20">
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
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
            />
          )}
          {checkoutStep === 'address' &&
            <Address
              addressData={addressData}
              handleSelectAddress={setSelectedAddressId}
              selectedAddressId={selectedAddressId}
            />
          }
          {checkoutStep === 'payment' && <Payment handlePlaceOrder={handlePlaceOrder} />}
        </div>
        <PriceDetails
          cartData={cartData}
          selectedItems={selectedItems}
          onProceed={handleProceed}
          currentStep={checkoutStep}
          totals={totals}
          setTotals={setTotals}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;



