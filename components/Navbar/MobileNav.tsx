"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/lib/data";
import { Turn as Hamburger } from "hamburger-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoCart } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "@/context/CartProvider";
import ReactCountUp from "../ui/ReactCountUp";

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleMenuClick = () => setOpen(!isOpen);

  const handleLinkClick = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 770) {
      setOpen(false);
    }
  }, [windowWidth]);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div onClick={handleMenuClick} className="">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              size={28}
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="top-[3.7rem] backdrop-blur-sm bg-white/20 z-50 border-none outline-none p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          closeIcon={false}
        >
          <SheetTitle className="w-full flex justify-end gap-6">
            <Link
              href={"/#cart"}
              className="relative w-12 h-12 rounded-full border border-[#D3D3D3] flex-center"
            >
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
              <IoCart size={25} className="fill-[#717171]" />
            </Link>
            <Link
              href={"/profile/personal-information"}
              className="w-12 h-12 rounded-full overflow-hidden"
            >
              <Image
                src={session?.user?.image || "/profile.png"}
                alt="profile"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </Link>
          </SheetTitle>
          <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
            {links.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <div
                  key={index}
                  className="cursor-pointer z-50"
                  onClick={handleLinkClick}
                >
                  <Link
                    href={link.href}
                    className={`w-full capitalize text-2xl font-semibold ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-white active:translate-y-0.5 w-fit hover-underline-lr"
                    }`}
                  >
                    {link.head}
                  </Link>
                </div>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

export const Cart = () => {
  const { cart, isOpen, setOpen } = useCart();
  const handleCartClick = () => setOpen(!isOpen);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div
            onClick={handleCartClick}
            className="relative w-10 h-10 rounded-full border border-[#D3D3D3] flex-center group cursor-pointer"
          >
            <ReactCountUp
              className="absolute -top-1 -right-1.5 w-1.5 h-1.5 text-primary rounded-full text-sm"
              amt={cart?.length}
            />
            <IoCart
              size={25}
              className="fill-[#717171] group-hover:fill-primary ease-in-out duration-300"
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="top-[3.7rem] text-white backdrop-blur-sm bg-white/20 z-50 border-none outline-none p-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          closeIcon={true}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-[3.7rem] left-0 right-0 h-20 w-full rounded-t-2xl z-50 bg-white/10"></div>
            <div className="p-2">
              <SheetTitle className="text-white p-2">Cart Items</SheetTitle>
              <CartItems />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const CartItems = () => {
  const { cart, handleIncrement, handleDecrement, handleRemoveFromCart } =
    useCart();

  return (
    <div className="relative mt-2 w-full h-[68vh] text-white overflow-hidden">
      <div className="w-full h-full space-y-4 overflow-y-scroll overflow-x-hidden">
        {cart.map((item) => (
          <div
            key={item.slug}
            className="relative w-full h-20 group flex gap-2 bg-white/20 rounded-md p-1 shadow-md hover:shadow-lg scale-95 hover:scale-100 ease-in-out duration-300"
          >
            <div
              onClick={() => handleRemoveFromCart(item.productId)}
              className={`absolute right-2 top-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 ${
                item.quantity !== 1
                  ? "text-zinc-300 hover:text-primary"
                  : "text-primary"
              }`}
            >
              x
            </div>

            <div className="img w-[20%] h-full flex-center select-none">
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
              <p className="text-xs text-zinc-200 line-clamp-1 select-none">
                {item.description}
              </p>

              <div className="absolute bottom-0 right-0 w-full h-fit flex-between gap-2 p-1">
                <ReactCountUp
                  className="text-primary"
                  prefix="₹"
                  amt={item.price}
                  decimals={true}
                />
                <div className="flex-center gap-2 select-none">
                  <AiOutlineMinus
                    onClick={() => handleDecrement(item.productId)}
                    className={
                      item.quantity !== 1
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
