"use client";

import React, { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useCursor } from "@/context/CursorProvider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { CategoryValues } from "@/lib/types";
import MobileNav from "./MobileNav";
import Cart from "./CartSheet";
import ReactCountUp from "../ui/ReactCountUp";
import Search from "./Search";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Button } from "../ui/button";

const profileOption = [
  { _id: 1, title: "My Profile", href: "/profile/my-profile" },
  { _id: 1, title: "Order History", href: "/profile/order-history" },
  { _id: 2, title: "Payment Methods", href: "/profile/payment-methods" },
  { _id: 3, title: "About Us", href: "/about" },
  {
    _id: 4,
    title: "Contact Us & FAQs",
    href: "/contact",
  },
];

const Navbar: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
  const pathname = usePathname(); // console.log("pathname :", pathname);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session } = useSession();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { showLeft, showRight } = useCursor();
  const visible = showLeft || showRight;

  const [categories, setCategories] = useState<CategoryValues[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/read/get-categories", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        if (data as CategoryValues[]) {
          setCategories(data.categories as CategoryValues[]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) fetchCategories();
  }, [categories]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2.9 && pathname === "/") {
        setIsVisible(true);
      } else if (pathname !== "/") {
        setIsVisible(true);
      } else if (visible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, visible]);

  useEffect(() => {
    if (navbarRef.current) {
      if (isVisible) {
        gsap.to(navbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(navbarRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }
  }, [isVisible]);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 z-[9999] max-h-[60px] w-full select-none flex-between bg-white text-black p-2 px-3 md:p-4 lg:px-12 shadow-lg transition-all"
      style={{ transform: "translateY(-100px)", opacity: 0 }}
    >
      <div className="flex-center gap-4 md:gap-6">
        <Link
          href="/"
          className="flex-between gap-1 text-2xl lg:text-3xl font-black overflow-hidden"
        >
          <Image
            src="/logo.png"
            alt="LoGo"
            width={400}
            height={400}
            className="w-14 h-14"
          />
        </Link>
        <div>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex items-center gap-2 lg:gap-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-full cursor-pointer bg-transparent border-none outline-none p-1">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
                  <CategoriesList categories={categories} />
                </NavigationMenuContent>
              </NavigationMenuItem>
              {categories.slice(0, 3).map((link, index) => {
                const isActive = pathname === `/products/${link.slug}`;
                return (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={`/products/${link.slug}`}
                      className={`capitalize cursor-pointer ${
                        isActive
                          ? "text-primary font-semibold"
                          : "w-fit hover-underline-lr active:translate-y-0.5"
                      } ease-in-out duration-200`}
                    >
                      {link.title.split(" ")[0]}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <MobileNav categories={categories} />

      <div className="hidden md:flex-center md:gap-4 lg:gap-6 relative">
        {/* search */}
        <Search />
        {session?.user ? (
          <>
            <Link href="/profile/wishlist" className="relative mr-1">
              {pathname.includes("/profile/wishlist") ? (
                <GoHeartFill
                  size={25}
                  color="#FF6464"
                  className="cursor-pointer"
                />
              ) : (
                <GoHeart
                  size={25}
                  color="black"
                  className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
                />
              )}
              <ReactCountUp
                className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
                amt={0}
              />
            </Link>
            <Cart />
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="w-full cursor-pointer bg-transparent border-none outline-none p-1">
                    <Link
                      href={"/profile/my-profile"}
                      className="flex-center gap-2 group"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${
                          pathname.includes("/profile/my-profile") &&
                          "border border-primary"
                        } overflow-hidden`}
                      >
                        <Image
                          src={session?.user?.image || "/profile.png"}
                          alt="profile"
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className={`font-semibold ${
                          pathname.includes("/profile/my-profile") &&
                          "text-primary"
                        } group-hover:text-primary ease-in-out duration-300`}
                      >
                        {session?.user?.name &&
                          session?.user?.name.split(" ")[0]}
                      </span>
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-fit h-fit space-y-2 p-2 animate-slide-down">
                    {profileOption.map((option, index) => (
                      <div key={index || option._id} className="w-36">
                        <Link
                          href={option.href}
                          className={`w-fit text-sm hover-underline-lr hover:text-primary ${
                            pathname.includes(option.href) && "text-primary"
                          }`}
                        >
                          {option.title}
                        </Link>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      onClick={() => signOut()}
                      className="w-full h-fit capitalize rounded-none py-1 border border-primary text-black hover:text-white bg-transparent hover:bg-primary ease-in-out duration-300"
                    >
                      Logout
                      </Button>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : (
          <Link
            href={"/sign-in"}
            className="capitalize cursor-pointer flex-center px-4 py-2 rounded ring-1 ring-primary shadow-md text-black hover:text-white hover:bg-primary ease-in-out duration-300"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

export interface CategoriesListProps {
  categories: CategoryValues[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="w-[40vw] h-fit grid grid-cols-4 gap-2 p-2">
        {categories.map((category, index) => {
          const isActive = pathname === `/products/${category.slug}`;

          return (
            <Link
              href={`/products/${category.slug}`}
              key={category._id}
              className={`w-fit hover-underline-lr hover:text-primary text-xs ${
                isActive && "text-primary"
              }`}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </>
  );
};
