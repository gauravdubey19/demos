"use client";

import React, { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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
import { useCart } from "@/context/CartProvider";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalProvider";

//adding comment
const profileOption = [
  { _id: "my-profile", title: "My Profile", href: "/profile/my-profile" },
  {
    _id: "order-history",
    title: "Order History",
    href: "/profile/order-history",
  },
  {
    _id: "payment-methods",
    title: "Payment Methods",
    href: "/profile/payment-methods",
  },
  { _id: "about", title: "About Us", href: "/about" },
  {
    _id: "contact",
    title: "Contact Us & FAQs",
    href: "/contact",
  },
];

const Navbar: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
  const pathname = usePathname(); // console.log("pathname :", pathname);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { showLeft, showRight } = useCursor();
  const visible = showLeft || showRight;
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  const router = useRouter();
  const { favProducts } = useCart();
  const [superCategories, setSuperCategories] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchSuperCategories = async () => {
      try {
        const res = await fetch("/api/superCategories", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch super categories");
        }

        const data = await res.json();
        if (data) {
          setSuperCategories(data.superCategories);
        }
      } catch (error) {
        console.error("Error fetching super categories:", error);
      }
    };

    if (superCategories.length === 0) fetchSuperCategories();
  }, [superCategories]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!pathname.includes("/admin")) {
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
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) fetchCategories();
  }, [categories, pathname]);

  useEffect(() => {
    if (pathname.includes("/admin")) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1 && pathname === "/") {
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

  return (
    <div
      ref={navbarRef}
      className={`fixed  ${
        isVisible ? "top-0" : "-top-full"
      } left-0 right-0 z-[9999] max-h-[60px] w-full select-none flex-between bg-white text-black p-2 px-3 md:p-4 lg:px-12 shadow-md transition-all ease-in-out duration-700`}
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
                <NavigationMenuTrigger
                  className={`w-full cursor-pointer bg-transparent border-none outline-none p-1 ${
                    pathname === "/products/all" && "text-primary font-semibold"
                  }`}
                  onClick={() => router.push("/products/all")}
                >
                  All Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
                  <CategoriesList
                    categories={categories}
                    superCategories={[]}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Map 3 supercategories below with their drop down containing categories */}
              {superCategories.slice(0, 3).map((superCategory, index) => {
                return (
                  <NavigationMenuItem key={index} className=" relative">
                    <NavigationMenuTrigger
                      className={`w-full cursor-pointer bg-transparent border-none outline-none p-1 ${
                        pathname ===
                          `/products/superCategory/${superCategory.slug}` &&
                        "text-primary font-semibold"
                      }`}
                      onClick={() =>
                        router.push(
                          `/products/superCategory/${superCategory.slug}`
                        )
                      }
                    >
                      {superCategory.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
                      <div
                        className={`w-[50vw] h-fit grid grid-cols-4 gap-2 items-center justify-center p-2`}
                      >
                        {superCategory.categories.map((category: any) => (
                          <div key={category._id}>
                            <Link
                              href={`/products/${category.slug}`}
                              className="text-primary hover-underline-lr"
                            >
                              {category.title}
                            </Link>
                            <div className="text-xs grid grid-cols-1 gap-1 pl-3">
                              {categories
                                .find((cat) => cat.slug === category.slug)
                                ?.types.map((type) => (
                                  <Link
                                    href={{
                                      pathname: `/products/${category.slug}`,
                                      query: { type: type.slug },
                                    }}
                                    key={type._id}
                                    className="hover:text-primary ease-in-out duration-300"
                                  >
                                    {type.title}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <MobileNav categories={categories} superCategories={superCategories} />

      <div className="hidden md:flex-center md:gap-4 lg:gap-6 relative">
        {/* search */}
        <Search />
        {session?.user?.id ? (
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
              {favProducts.length > 0 && (
                <ReactCountUp
                  className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
                  amt={favProducts.length}
                />
              )}
            </Link>
            <Cart />
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="w-full cursor-pointer bg-transparent border-none outline-none p-1">
                    <Link
                      href={
                        session?.user?.role === "admin"
                          ? "/admin/dashboard"
                          : "/profile/my-profile"
                      }
                      className="flex-center gap-2 group"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${
                          pathname.includes("/profile/my-profile") &&
                          "border border-primary"
                        } overflow-hidden`}
                      >
                        {session?.user?.image ? (
                          <Image
                            src={session?.user?.image || "/profile.png"}
                            alt="profile"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUserCircle size={32} color="#000" />
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span
                          className={`font-semibold ${
                            pathname.includes("/profile/my-profile") &&
                            "text-primary"
                          } group-hover:text-primary ease-in-out duration-300`}
                        >
                          {session?.user?.name?.split(" ")[0] || "Profile"}
                        </span>
                        {session?.user?.role === "admin" && (
                          <span className="text-xs">{session?.user?.role}</span>
                        )}
                      </div>
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-fit h-fit space-y-2 p-2 animate-slide-down">
                    {session?.user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className={`w-fit text-sm hover-underline-lr hover:text-primary ${
                          pathname.includes("/admin") && "text-primary"
                        }`}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {profileOption.map((option, index) => (
                      <div key={index || option._id} className="w-36">
                        {session?.user?.role !== "admin" ? (
                          <Link
                            href={option.href}
                            className={`w-fit text-sm hover-underline-lr hover:text-primary ${
                              pathname.includes(option.href) && "text-primary"
                            }`}
                          >
                            {option.title}
                          </Link>
                        ) : (
                          (option._id === "about" ||
                            option._id === "contact") && (
                            <Link
                              href={option.href}
                              className={`w-fit text-sm hover-underline-lr hover:text-primary ${
                                pathname.includes(option.href) && "text-primary"
                              }`}
                            >
                              {option.title}
                            </Link>
                          )
                        )}
                      </div>
                    ))}
                    <Button
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        signOut();
                      }}
                      className="w-full h-fit capitalize py-1 border border-primary text-black hover:text-white bg-transparent hover:bg-primary ease-in-out duration-300 rounded"
                    >
                      Logout
                    </Button>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : status === "loading" ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
          <Link
            href="/sign-in"
            className=" cursor-pointer flex-center px-4 py-2 ring-1 ring-primary shadow-md text-black hover:text-white hover:bg-primary active:translate-y-0.5 ease-in-out duration-300 rounded"
          >
            Login / Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

export interface CategoriesListProps {
  categories: CategoryValues[];
  superCategories: any[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  const pathname = usePathname();
  // console.log(categories);

  return (
    <>
      <div className="w-[50vw] h-fit grid grid-cols-4 gap-2 items-center justify-center p-2">
        {categories.map((category, index) => {
          const isActive = pathname === `/products/${category.slug}`;

          return (
            <div key={category._id} className="w-fit h-fit">
              <Link
                href={`/products/${category.slug}`}
                className={`w-fit hover-underline-lr text-primary text-md ${
                  isActive && "text-primary"
                }`}
              >
                {category.title}
              </Link>
              <div className="text-xs grid grid-cols-1 gap-1 pl-3">
                {category.types.map((type) => (
                  <Link
                    href={{
                      pathname: `/products/${category.slug}`,
                      query: { type: type.slug },
                    }}
                    // href={`/products/${category.slug}?type=${type.slug}`}
                    key={type._id}
                    className="hover:text-primary ease-in-out duration-300"
                  >
                    {type.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
