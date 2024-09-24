"use client";
import Address from '@/components/Checkout/Address';
import ShoppingCart from '@/components/Checkout/ShoppingCart';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import ProgressIndicator from '@/components/Checkout/ProgressIndicator';
import PriceDetails from '@/components/Checkout/PriceDetails';
import Payment from '@/components/Checkout/Payment';
import { useCart } from "@/context/CartProvider";
import { toast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [addressData, setAddressData] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const { cart, isOpen, setOpen } = useCart(); //console.log(isOpen);


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
    setOpen(false);
    if (session?.user?.id) {
      getCartItems();
      getUserAddress();
    }
  }, [session,cart]);

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
  };


  const handleSelectItem = (id: any, isSelected: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.productId === id ? { ...item, selected: isSelected } : item
      )
    );

    setSelectedItems((prevSelected) => {
      if (isSelected) {
        return prevSelected + 1;
      } else {
        return Math.max(prevSelected - 1, 0);
      }
    });
  };

  const handleSelectAll = (selectAll: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) => ({ ...item, selected: selectAll }))
    );
    setSelectedItems(selectAll ? cartData.length : 0);
  };



  // const handleProceed = () => {
  //   if (checkoutStep === 'cart') {
  //     setCheckoutStep('address');
  //   } else if (checkoutStep === 'address') {
  //     setCheckoutStep('payment');
  //   }
  // };

  const handleProceed = () => {
    if (checkoutStep === 'cart') {
      if (selectedItems === 0) {
        // alert('Please select at least one item in your cart to proceed.');
        toast({
          title: "No items items seclected",
          description: "Please select at least one item in your cart to proceed.",
          variant: "destructive",
        });
        return;
      }
      setCheckoutStep('address');
    } else if (checkoutStep === 'address') {
      if (!selectedAddressId) {
        toast({
          title: "Please select an address to proceed.",
          variant: "destructive",
        });
        return;
      }
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