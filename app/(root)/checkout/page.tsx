"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useCart } from "@/context/CartProvider";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from "@/components/Checkout/ProgressIndicator";
import PriceDetails from "@/components/Checkout/PriceDetails";
import Address from "@/components/Checkout/Address";
import ShoppingCart from "@/components/Checkout/ShoppingCart";
import Payment from "@/components/Checkout/Payment";

const CheckoutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "address" | "payment"
  >("cart");
  const [addressData, setAddressData] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [placingOrder, setPlacingOrder] = useState<boolean>(false);
  const [initiatedProcess, setInitiatedProcess] = useState<boolean>(false);
  const [fetchingAddress, setFetchingAddress] = useState<boolean>(false);
  const { cart, setOpen, setCart, handleClearCart } = useCart();
  const [selectedItemsData, setSelectedItemsData] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shippingFee: 0,
    total: 0,
    totalMRP: 0,
    platformFee: 0,
    totalDiscount: 0,
  });

  const { setFetchedOrders,fetchOrders,fetchedOrders } = useGlobalContext();
  useEffect(() => {
    console.log("selectedAddress: ", selectedAddress);
  }, [selectedAddress]);
  useEffect(() => {
    console.log("cartData: ", cartData);
    const calculateTotals = () => {
      let totalMRP = 0;
      let totalDiscount = 0;

      cartData.forEach((item: any) => {
        if (item.selected) {
          totalMRP += item.price * item.quantity;
          totalDiscount += (item.discount || 0) * item.quantity;
        }
      });
      setTotals((prevTotals: any) => ({
        ...prevTotals,
        totalMRP,
        totalDiscount,
      }));
    };

    calculateTotals();
  }, [cartData, selectedItems, setTotals]);

  useEffect(() => {
    if (selectedAddressId) {
      setSelectedAddress(
        addressData.find((item) => item._id === selectedAddressId)
      );
    }
  }, [addressData, selectedAddressId]);

  const placeOrder = async () => {
    if (!session?.user?.id || placingOrder) {
      return;
    }
    const userId = session.user.id;
    const { totalMRP, totalDiscount, platformFee, shippingFee } = totals;
    const totalAmount = totalMRP - totalDiscount + platformFee + shippingFee;
    console.log("TotalAmount: ", totalAmount);
    const orderDetails = {
      orderedProducts: cartData.filter((item) => item.selected),
      orderInfo: {
        orderStatus: "pending",
        totalPrice: totalAmount,
        customerName: `${selectedAddress.firstName} ${selectedAddress.lastName}`,
        orderDate: new Date(),
        zipCode: selectedAddress.zipCode,
        shippingAddress: `${selectedAddress.address}, ${selectedAddress.city.name}, ${selectedAddress.state.name}`,
        phone_number: selectedAddress.phone_number,
      },
    };

    try {
      setPlacingOrder(true);
      const response = await fetch(`/api/orders/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderDetails }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order");
      }

      const data = await response.json();
      setCart([]);
      handleClearCart();
      if(fetchedOrders.length===0) {
        await fetchOrders();
      }else{
      setFetchedOrders((prevOrders) => [data.order, ...prevOrders]);
    }
      router.push(`/profile/order-history`);
      toast({
        title: "Order placed successfully",
        description: "Please wait while we redirect you to order history page.",
      });
    } catch (error: any) {
      console.error("Error placing order:", error.message);
      setCheckoutStep("cart");
      setInitiatedProcess(false);
      toast({
        title: "Error placing order",
        variant: "destructive",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const getUserAddress = useCallback(async () => {
    if (session) {
      try {
        setFetchingAddress(true);
        const response = await fetch(
          `/api/contact/${session.user.id}/get-All-contacts-by-user-Id/`
        );
        if (response.ok) {
          const res = await response.json();
          const initialAddress = res.map((item: any) => ({
            ...item,
            selected: true,
          }));
          setFetchingAddress(false);
          setAddressData(initialAddress);
        } else {
          console.error("Failed to fetch address");
        }
      } catch (error) {
        // console.error('Error fetching address:', error);
        throw new Error("Error fetching address");
      } finally {
        setFetchingAddress(false);
      }
    }
  }, [session]);

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
        // console.error('Error fetching cart items:', error);
        throw new Error("Error fetching cart items");
      }
    }
  }, [session, cart]);

  const handleSelectItem = (id: any, isSelected: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.productId === id ? { ...item, selected: isSelected } : item
      )
    );
    setSelectedItems((prevSelected) =>
      isSelected ? prevSelected + 1 : Math.max(prevSelected - 1, 0)
    );

    // Update selectedItemsData
    setSelectedItemsData((prevData: any) => {
      if (isSelected) {
        const selectedItem = cartData.find((item) => item.productId === id);
        return [...prevData, { id: id, quantity: selectedItem.quantity }];
      } else {
        return prevData.filter((item: any) => item.id !== id);
      }
    });
  };

  const handleSelectAll = (selectAll: boolean) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) => ({ ...item, selected: selectAll }))
    );
    setSelectedItems(selectAll ? cartData.length : 0);

    // Update selectedItemsData
    if (selectAll) {
      setSelectedItemsData(
        cartData.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        }))
      );
    } else {
      setSelectedItemsData([]);
    }
  };

  const handleProceed = () => {
    if (checkoutStep === "cart" && selectedItems === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item.",
        variant: "destructive",
      });
    } else if (checkoutStep === "cart") {
      setCheckoutStep("address");
    } else if (checkoutStep === "address" && !selectedAddressId) {
      toast({ title: "Select an address", variant: "destructive" });
    } else {
      setCheckoutStep("payment");
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
      <ProgressIndicator
        currentStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        initiatedProcess={initiatedProcess}
      />
      <div className="pt-7 px-2 w-full flex justify-between md:flex-row flex-col gap-3 pb-5">
        <div className="md:w-[75%] w-full p-5 min-h-60 max-h-max border border-[#8888] rounded-lg">
          <h3 className="text-2xl md:text-3xl text-black">
            {checkoutStep === "cart" && "Shopping Cart"}
            {checkoutStep === "address" && "Choose Address & Contact Info"}
            {checkoutStep === "payment" && "Payment"}
          </h3>

          {checkoutStep === "cart" && (
            <ShoppingCart
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              cartData={cartData}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
            />
          )}
          {checkoutStep === "address" && (
            <Address
              fetchingAddress={fetchingAddress}
              addressData={addressData}
              handleSelectAddress={setSelectedAddressId}
              selectedAddressId={selectedAddressId}
            />
          )}
          {checkoutStep === "payment" && (
            <Payment
              totals={totals}
              handlePlaceOrder={placeOrder}
              placingOrder={placingOrder}
              selectedAddress={selectedAddress}
              setInitiatedProcess={setInitiatedProcess}
            />
          )}
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
