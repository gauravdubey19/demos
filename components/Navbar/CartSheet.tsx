"use client";

import Image from "next/image";
import ReactCountUp from "../ui/ReactCountUp";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useCart } from "@/context/CartProvider";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { CartItem, ColorCartObject, ColorObject } from "@/lib/types";

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
            className="relative w-12 h-12 md:w-8 md:h-8 rounded-full lg:border border-[#D3D3D3] flex-center group cursor-pointer"
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
              } lg:fill-primary scale-125 md:scale-100 group-hover:fill-primary ease-in-out duration-300`}
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
                onClick={() => router.push("/checkout")}
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

  // useEffect(() => {
  //   console.log("item: ", item);
  // }, [item]);
  const [size, setSize] = useState<string>(item?.selectedSize ?? item.productId.images_collection[0].quantity[0].size);
  const [color, setColor] = useState<{ title: string; color: string }>(
    item?.selectedColor
  );
  const [currentColor, setCurrentColor] = useState<ColorCartObject>(item.productId.images_collection[0]);
  useEffect(() => {
    let selectedColor = item.productId.images_collection.find(
      (c) => c.color === color.color
    );
    let sizeExists = selectedColor?.quantity.find((q) => q.size === size);
    if (!sizeExists) {
      console.log("Setting selectedColor: ", selectedColor);
      selectedColor = item.productId.images_collection[0];
      setSize(selectedColor.quantity[0].size);
    }
    if(selectedColor)
    setCurrentColor(selectedColor);
  },[color, item.productId.images_collection, size]);

  const { cartLoading } = useCart();
  const sizeLabels: { [key: string]: string } = {
    XS: "Extra Small",
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large",
    XXL: "Extra Extra Large",
  };

  const handleSizeChange = (selectedSize: string) => {
    setSize(selectedSize);
    // console.log("selectedSize: ", selectedSize);
    handleColorSize("upd-size", item.productId._id, undefined, selectedSize);
  };

  const handleColorChange = (selectedColor: {
    title: string;
    color: string;
    quantity: Array<{ size: string; quantity: number }>;
  }) => {
    setColor(selectedColor);
    let size = selectedColor.quantity[0].size;
    let selectedSizeExists = selectedColor.quantity.find((q) => q.size === size);
    if (!selectedSizeExists) {
      console.log("Setting new size");
      size = selectedColor.quantity[0].size;}
    handleColorSize("upd-color", item.productId._id, selectedColor, size);
  };

  if(!item.productId.images_collection) return null;
  return (
    <div className="relative w-full h-fit group bg-white/20 rounded-md p-1 shadow-md hover:shadow-lg scale-95 hover:scale-100 ease-in-out duration-300">
      <div
        onClick={() => handleRemoveFromCart(item.productId._id)}
        className={`absolute right-2 top-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 ${
          item.quantity !== 1 ? "text-gray-400 hover:text-[red]" : "text-[red]"
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
            <Select defaultValue={size} value={size} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-full bg-transparent border border-primary rounded-r-none rounded-l-lg ">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {item?.productId.images_collection?.map((c,index) => (
                  c.color===item.selectedColor.color && c.quantity.map((q,index) => (
                    <SelectItem
                      key={index}
                      value={q.size}
                      className="cursor-pointer"
                    >
                      {sizeLabels[q.size]}
                    </SelectItem>
                  ))
                ))
                }
              </SelectContent>
            </Select>
            <Select
            value={color?.title}
              defaultValue={color?.title}
              onValueChange={(selectedColor) => {
                const selected = item.productId.images_collection.find(
                  (c) => c.color_name === selectedColor
                );
                if (selected) handleColorChange({ title: selected.color_name, color: selected.color, quantity: selected.quantity });

              }}
            >
              <SelectTrigger className="w-full bg-transparent border border-primary rounded-l-none rounded-r-lg ">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {item?.productId.images_collection?.map((c,index) => (
                  <SelectItem
                    key={index}
                    value={c?.color_name}
                    className="cursor-pointer"
                  >
                    {c?.color_name}
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
            <Button
              type="button"
              onClick={() => handleDecrement(item.productId._id)}
              disabled={item.quantity === 1}
              size="icon"
              className="cursor-pointer bg-transparent disabled:opacity-60 disabled:cursor-pointer"
            >
              <AiOutlineMinus color="#000" />
            </Button>
            <span className="text-sm text-primary select-none">
              {item.quantity}
            </span>
            <Button
              type="button"
              size="icon"
              onClick={() =>
                handleIncrement(
                  item.productId._id,
                  currentColor.quantity.find( q => q.size === size)?.quantity || 1,
                  item.quantity
                )
              }
              disabled={
                cartLoading === item.productId._id ||
                item.quantity === item.productId.images_collection[0].quantity[0].quantity
              }
              className="cursor-pointer bg-transparent disabled:opacity-60 disabled:cursor-pointer"
            >
              <AiOutlinePlus color="#000" />
            </Button>
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
