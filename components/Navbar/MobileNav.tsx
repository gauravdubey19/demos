"use client";

// import React, { useState, useEffect } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { links } from "@/lib/data";
// import { Turn as Hamburger } from "hamburger-react";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Cart from "./CartSheet";
// import { CategoriesListProps } from "./Navbar";
// import ReactCountUp from "../ui/ReactCountUp";
// import { GoHeart, GoHeartFill } from "react-icons/go";
// import { DialogTitle } from "@radix-ui/react-dialog";
// import { Button } from "../ui/button";
// import { useCart } from "@/context/CartProvider";

// const MobileNav: React.FC<CategoriesListProps> = ({ categories }) => {
//   const [isOpen, setOpen] = useState<boolean>(false);
//   const [windowWidth, setWindowWidth] = useState<number>(
//     typeof window !== "undefined" ? window.innerWidth : 0
//   );
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const { favProducts } = useCart();

//   const handleMenuClick = () => setOpen(!isOpen);

//   const handleLinkClick = () => setOpen(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (windowWidth > 770) {
//       setOpen(false);
//     }
//   }, [windowWidth]);

//   return (
//     <div className="md:hidden bg-white">
//       <Sheet open={isOpen} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <div onClick={handleMenuClick} className="">
//             <Hamburger
//               toggled={isOpen}
//               toggle={setOpen}
//               direction="right"
//               size={28}
//             />
//           </div>
//         </SheetTrigger>
//         <SheetContent
//           side={"right"}
//           className="top-[3.7rem] h-[calc(100vh-60px)] backdrop-blur-sm bg-white/20 z-50 border-none outline-none p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
//           closeIcon={false}
//         >
//           {session?.user && (
//             <DialogTitle>
//               <SheetTitle className="w-full h-fit flex-between gap-6 overflow-hidden">
//                 <Link
//                   href="/profile/wishlist"
//                   className="relative flex-center mr-1"
//                 >
//                   <SheetClose>
//                     {pathname.includes("/profile/wishlist") ? (
//                       <GoHeartFill size={40} color="#FF6464" />
//                     ) : (
//                       <GoHeart size={40} color="#FF6464" />
//                     )}
//                     {favProducts.length > 0 && (
//                       <ReactCountUp
//                         className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
//                         amt={favProducts.length}
//                         // amt={fav?.length}
//                       />
//                     )}
//                   </SheetClose>
//                 </Link>
//                 <SheetClose>
//                   <Cart />
//                 </SheetClose>
//                 <Link
//                   href={"/profile/my-profile"}
//                   className={`w-10 h-10 rounded-full ${
//                     pathname.includes("/profile") && "border-2 border-primary"
//                   } overflow-hidden`}
//                 >
//                   <SheetClose>
//                     <Image
//                       src={session?.user?.image || "/profile.png"}
//                       alt="profile"
//                       width={200}
//                       height={200}
//                       className="w-full h-full rounded-full br overflow-hidden"
//                     />
//                   </SheetClose>
//                 </Link>
//               </SheetTitle>
//             </DialogTitle>
//           )}
//           <div className="relative w-full h-[calc(100vh-130px)]">
//             <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
//               {links.map((link, index) => {
//                 const isActive = pathname === link.href;

//                 return (
//                   <div
//                     key={index}
//                     className="cursor-pointer z-50"
//                     onClick={handleLinkClick}
//                   >
//                     <SheetClose>
//                       <Link
//                         href={link.href}
//                         className={`w-full capitalize text-2xl font-semibold ${
//                           isActive
//                             ? "text-primary font-semibold"
//                             : "text-white active:translate-y-0.5 w-fit hover-underline-lr"
//                         }`}
//                       >
//                         {link.head}
//                       </Link>
//                     </SheetClose>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
//               {categories.slice(0, 5).map((link, index) => {
//                 const isActive = pathname === `/products/${link.slug}`;

//                 return (
//                   <div
//                     key={index}
//                     className="cursor-pointer z-50"
//                     onClick={handleLinkClick}
//                   >
//                     <SheetClose>
//                       <Link
//                         href={`/products/${link.slug}`}
//                         className={`w-full capitalize text-2xl font-semibold ${
//                           isActive
//                             ? "text-primary font-semibold"
//                             : "text-white active:translate-y-0.5 w-fit hover-underline-lr"
//                         }`}
//                       >
//                         {link.title}
//                       </Link>
//                     </SheetClose>
//                   </div>
//                 );
//               })}
//             </div>
//             <div
//               className={`absolute ${
//                 !session?.user ? "bottom-3" : "bottom-1"
//               }  left-0 right-0`}
//             >
//               {!session?.user ? (
//                 <Link
//                   href={"/sign-in"}
//                   className="capitalize cursor-pointer flex-center text-xl font-semibold p-2 rounded ring-1 ring-primary shadow-md text-white bg-primary"
//                 >
//                   Login / SignUp
//                 </Link>
//               ) : (
//                 <Button
//                   size="lg"
//                   onClick={() => {
//                     // remove the jwt token as well
//                     localStorage.removeItem("jwt");
//                     signOut();
//                   }}
//                   className="w-full capitalize text-xl text-white font-semibold p-2 rounded shadow-md"
//                 >
//                   Logout
//                 </Button>
//               )}
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MobileNav;


import React, { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { CategoriesListProps } from "./Navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartProvider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const links = [
  { head: "Home", href: "/" },
  {
    head: "All Categories",
    href: "/categories",
    subCategories: [
      {
        title: "Category 1",
        slug: "category-1",
        subCategories: [
          { title: "Category Type 1", slug: "category-type-1" },
          { title: "Category Type 2", slug: "category-type-2" },
        ],
      },
      { title: "Category 2", slug: "category-2" },
      { title: "Category 3", slug: "category-3" },
      { title: "A very long category 4", slug: "very-long-category-4" },
      { title: "Category 4", slug: "category-4" },
    ],
  },
  { head: "Traditional", href: "/traditional" },
  { head: "Party Wears", href: "/party-wears" },
  { head: "Formal Wears", href: "/formal-wears" },
  { head: "About Us", href: "/about-us" },
  { head: "Contact & FAQs", href: "/contact-faqs" },
];

const accountLinks = [
  { head: "My Account", href: "/account" },
  { head: "Order History", href: "/order-history" },
  { head: "Shipping Address", href: "/shipping-address" },
  { head: "Helpdesk", href: "/helpdesk" },
  { head: "My Tickets", href: "/my-tickets" },
];

const MobileNav: React.FC<CategoriesListProps> = ({ categories,superCategories }) => {

  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { favProducts } = useCart();

  // Toggle menu state
  const handleMenuClick = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 770) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:hidden bg-white">
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div onClick={handleMenuClick}>
          <Hamburger toggled={isOpen} toggle={setOpen} direction="right" size={28} />
        </div>
      </SheetTrigger>
  
      <SheetContent side="right" className="top-[3.7rem] h-[calc(100vh-60px)] bg-white border-none p-0 shadow-lg">
        
        {!session?.user && (
          <div className="py-2 px-4 absolute top-0 w-full mt-4">
            <SheetClose>
              <Link href="/sign-in">
                <Button className="w-full text-white bg-primary">Login / Sign Up</Button>
              </Link>
            </SheetClose>
          </div>
        )}
        
        {session?.user && (
          <DialogTitle className="bg-yellow-500 m-0 p-0 w-full">
            <SheetTitle className="flex items-center justify-between mb-0 p-4">
              <div className="flex items-center">
                <Image
                  src={session.user.image || "/profile.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <span>{session.user.name || "User"}</span>
              </div>
            </SheetTitle>
          </DialogTitle>
        )}
  
        <nav className="flex flex-col relative top-20">
          {/* {links.map((link, index) => (
            <div key={index} className="py-2 px-4">
              {link.head === "All Categories" ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={`category-${index}`}>
                    <AccordionTrigger className="flex items-center justify-between text-lg font-medium text-gray-700">
                      {link.head}
                    </AccordionTrigger>
                    <AccordionContent className="ml-4 mt-1">
                      <Accordion type="single" collapsible>
                        {link.subCategories?.map((subCat, subIndex) => (
                          <AccordionItem key={subIndex} value={`subCategory-${subIndex}`}>
                            <AccordionTrigger className="flex items-center justify-between text-gray-600 py-2">
                              {subCat.title}
                              {subCat.subCategories && (
                                <IoChevronForward className="ml-2" />
                              )}
                            </AccordionTrigger>
                            <AccordionContent className="ml-4 mt-1">
                              {subCat.subCategories?.map((subSubCat, subSubIndex) => (
                                <div key={subSubIndex} className="py-1">
                                  <Link
                                    href={`/categories/${subCat.slug}/${subSubCat.slug}`}
                                    className="text-gray-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    {subSubCat.title}
                                  </Link>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <SheetClose>
                  <Link
                    href="/products/all"
                    className={`flex items-center justify-between text-lg font-medium ${
                      pathname === link.href ? "text-primary" : "text-gray-700"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.head}
                    {["Traditional", "Party Wears", "Formal Wears"].includes(link.head) && (
                      <IoChevronForward className="ml-2" />
                    )}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))} */}
          {categories.map((category, index) => (
  <div key={index} className="py-2 px-4">
    {category.title === "All Categories" ? ( // "All Categories" ko check karna
      <Accordion type="single" collapsible>
        <AccordionItem value={`category-${index}`}>
          <AccordionTrigger className="flex items-center justify-between text-lg font-medium text-gray-700">
            {category.title}
          </AccordionTrigger>
          <AccordionContent className="ml-4 mt-1">
            <Accordion type="single" collapsible>
              {category.subCategories?.map((subCat: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; subCategories: any[]; slug: any; }, subIndex: React.Key | null | undefined) => (
                <AccordionItem key={subIndex} value={`subCategory-${subIndex}`}>
                  <AccordionTrigger className="flex items-center justify-between text-gray-600 py-2">
                    {subCat.title}
                    {subCat.subCategories && (
                      <IoChevronForward className="ml-2" />
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="ml-4 mt-1">
                    {subCat.subCategories?.map((subSubCat, subSubIndex) => (
                      <div key={subSubIndex} className="py-1">
                        <Link
                          href={`/categories/${subCat.slug}/${subSubCat.slug}`}
                          className="text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          {subSubCat.title}
                        </Link>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ) : (
      <SheetClose>
      
        <Link
          href="/products/all"
          className={`flex items-center justify-between text-lg font-medium ${
            pathname === category.slug ? "text-primary" : "text-gray-700"
          }`}
          onClick={() => setOpen(false)}
        >
          {category.title}
          {["Traditional", "Party Wears", "Formal Wears"].includes(category.title) && (
            <IoChevronForward className="ml-2" />
          )}
        </Link>
      </SheetClose>
    )}
  </div>
))}

  
          {session?.user && (
            <>
              {accountLinks.map((link, index) => (
                <div key={index} className="py-2 px-4">
                  <SheetClose>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between text-lg font-medium ${
                        pathname === link.href ? "text-primary" : "text-gray-700"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.head}
                    </Link>
                  </SheetClose>
                </div>
              ))}
  
              <div className="py-2 px-4">
                <div
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    signOut();
                  }}
                  className="w-full text-gray-500 cursor-pointer font-medium"
                >
                  Logout
                </div>
              </div>
              <div className="py-2 px-4">
                <div className="w-full text-gray-500 cursor-pointer font-medium">
                  Delete Your Account
                </div>
              </div>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  </div>
  
  );
};

export default MobileNav;
