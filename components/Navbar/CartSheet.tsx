"use client";

import Image from "next/image";
import ReactCountUp from "../ui/ReactCountUp";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useCart } from "@/context/CartProvider";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { cart, isOpen, setOpen } = useCart(); //console.log(isOpen);

  const handleCartClick = () => setOpen(!isOpen);

  // calculating the total price and total quantity of the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // const totalProducts = cart.reduce((acc, item) => acc, 0);
  const totalProducts = cart.length;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div
            onClick={handleCartClick}
            className="relative w-12 h-12 md:w-8 md:h-8 rounded-full border border-[#D3D3D3] flex-center group cursor-pointer"
          >
            {cart?.length > 0 && (
              <ReactCountUp
                className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
                amt={cart?.length}
              />
            )}
            <BsHandbag
              size={20}
              className={`${
                isOpen ? "lg:fill-primary" : "lg:fill-[#717171]"
              } fill-primary scale-125 md:scale-100 group-hover:fill-primary ease-in-out duration-300`}
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="top-[3.7rem] text-black backdrop-blur-sm bg-white z-50 border-none outline-none p-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          closeIcon={true}
        >
          <div className="relative w-full h-full">
            <div
              id="checkout-panel"
              className="absolute bottom-[3.7rem] left-0 right-0 h-fit w-full rounded-t-2xl z-50 bg-[#ffb43327] space-y-1 p-2"
            >
              <p>Total</p>
              <div className="w-full mb-2 px-1 flex-between text-black select-none">
                <span>
                  Products:{" "}
                  <ReactCountUp amt={totalProducts} className="text-primary" />
                </span>
                {/* <span>
                  <ReactCountUp
                    prefix="₹"
                    amt={totalPrice}
                    decimals={true}
                    // className="text-primary"
                  />
                </span> */}
              </div>
              <Button
                onClick={()=>router.push('/checkout')}
                size="sm"
                className="w-full select-none text-lg rounded-none hover:shadow-md active:translate-y-0.5 border-none outline-none ease-in-out duration-300"
              >
                Checkout
              </Button>
            </div>
            <div className="p-2">
              <SheetTitle className="text-black p-2">Your Bag Items</SheetTitle>
              <CartItems />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;

interface CartItem {
  slug: string;
  productId: string;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  availableSizes: string[];
  selectedSize: string;
  colorOptions: {
    _id: string;
    title: string;
    color: string;
  }[];
  selectedColor: {
    title: string;
    color: string;
  };
}

const CartItems = () => {
  const { cart } = useCart();
  // console.log(cart);

  return (
    <div className="relative mt-2 w-full h-[64vh] text-black overflow-hidden">
      <div className="w-full h-full space-y-4 overflow-y-scroll overflow-x-hidden">
        {cart.map((item: CartItem) => (
          <CartItemCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
};

const CartItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
  const {
    handleIncrement,
    handleDecrement,
    handleRemoveFromCart,
    handleColorSize,
  } = useCart();

  const [size, setSize] = useState<string>(item?.selectedSize);
  const [color, setColor] = useState<{ title: string; color: string }>(
    item?.selectedColor
  );

  const sizeLabels: { [key: string]: string } = {
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large",
  };

  const handleSizeChange = (selectedSize: string) => {
    setSize(selectedSize);
    handleColorSize("upd-size", item.productId, undefined, selectedSize);
  };

  const handleColorChange = (selectedColor: {
    title: string;
    color: string;
  }) => {
    setColor(selectedColor);
    handleColorSize("upd-color", item.productId, selectedColor);
  };

  return (
    <div className="relative w-full h-fit group bg-white/20 rounded-md p-1 shadow-md hover:shadow-lg scale-95 hover:scale-100 ease-in-out duration-300">
      <div
        onClick={() => handleRemoveFromCart(item.productId)}
        className={`absolute right-2 top-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 ${
          item.quantity !== 1
            ? "text-gray-400 hover:text-primary"
            : "text-primary"
        }`}
      >
        x
      </div>

      <div className="flex gap-2">
        <div className="img w-[20%] h-fit flex-center select-none">
          <Image
            src={item.image}
            alt={item.title}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="details relative w-[80%] h-full">
          <h3 className="w-[95%] text-md line-clamp-1">{item.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-1 select-none">
            {item.description}
          </p>
          <div
            id="color-&-size-selection"
            className="w-full h-fit mt-1 rounded-lg flex-between gap-1 overflow-hidden"
          >
            <Select defaultValue={size} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-full bg-transparent border border-primary rounded-r-none rounded-l-lg ">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {item.availableSizes.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                    className="cursor-pointer"
                  >
                    {sizeLabels[size] || size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              defaultValue={color?.title}
              onValueChange={(selectedColor) => {
                const selected = item.colorOptions.find(
                  (c) => c.title === selectedColor
                );
                if (selected) handleColorChange(selected);
              }}
            >
              <SelectTrigger className="w-full bg-transparent border border-primary rounded-l-none rounded-r-lg ">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {item.colorOptions.map((c) => (
                  <SelectItem
                    key={c._id}
                    value={c?.title}
                    className="cursor-pointer"
                  >
                    {c?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full h-fit space-y-1 p-1">
        <div className="w-full h-fit flex-between gap-2">
          <div className="flex-between gap-2">
            <ReactCountUp
              className="text-sm"
              prefix="₹"
              amt={item.price}
              decimals={true}
            />
            <span className="text-xs select-none text-primary">x</span>
            <span className="text-sm select-none">{item.quantity}</span>
          </div>
          <div className="flex-center gap-2 select-none">
            <AiOutlineMinus
              onClick={() => handleDecrement(item.productId)}
              className={
                item.quantity !== 1 ? "cursor-pointer" : "cursor-not-allowed"
              }
            />
            <span className="text-sm text-primary select-none">
              {item.quantity}
            </span>
            <AiOutlinePlus
              onClick={() => handleIncrement(item.productId)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <ReactCountUp
          className="text-primary text-md"
          prefix="₹"
          amt={item.price * item.quantity}
          decimals={true}
        />
      </div>
    </div>
  );
};
