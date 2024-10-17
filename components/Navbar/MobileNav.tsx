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
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { profileSections } from "@/lib/section";
import { useCart } from "@/context/CartProvider";
import { Turn as Hamburger } from "hamburger-react";
import { CategoriesListProps } from "./Navbar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DialogTitle } from "../ui/dialog";

const MobileNav: React.FC<CategoriesListProps> = ({
  categories,
  superCategories,
}) => {
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
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              size={28}
            />
          </div>
        </SheetTrigger>

        <SheetContent
          side="right"
          closeIcon={false}
          className="top-[3.7rem] h-[calc(100vh-60px)] bg-white border-none p-0 shadow-lg font-dmSans"
        >
          <DialogTitle></DialogTitle>
          {!session?.user ? (
            <SheetClose className="w-full px-4 mt-5">
              <Link href="/sign-in" className="w-full">
                <Button className="w-full rounded-none">Login / Sign Up</Button>
              </Link>
            </SheetClose>
          ) : (
            <SheetTitle className="w-full flex-between bg-primary p-4">
              <div className="flex items-center">
                <Image
                  src={session.user.image || "/profile.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div className="">
                  <p>{session.user.name || "User"}</p>
                  <p className="text-sm line-clamp-1">
                    {session.user.email || "User"}
                  </p>
                </div>
              </div>
            </SheetTitle>
          )}

          <nav className="w-full relative mt-4">
            <Accordion
              type="single"
              collapsible
              className="w-full h-fit flex flex-col gap-4 px-4 py-2"
            >
              <Link
                href="/"
                className={`w-full text-xl font-medium ${
                  pathname === "/" && "text-primary"
                }`}
              >
                Home
              </Link>
              <AccordionItem value={`item-1`} className="border-none text-xl">
                <AccordionTrigger className="p-0">
                  <Link
                    href="/products/all"
                    className={`w-fit hover-underline-lr ${
                      pathname === "/products/all" && "text-primary"
                    }`}
                  >
                    <SheetClose>All Categories</SheetClose>
                  </Link>
                </AccordionTrigger>
                <AccordionContent className="px-2 h-fit max-h-[25vh] overflow-x-hidden overflow-y-scroll">
                  <Accordion type="single" collapsible>
                    {categories.map((category, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="py-2 text-lg">
                          <Link
                            href={`/products/${category.slug}`}
                            className={`w-fit hover-underline-lr ${
                              pathname === `/products/${category.slug}` &&
                              "text-primary"
                            }`}
                          >
                            <SheetClose>{category?.title}</SheetClose>
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2 px-4 text-lg">
                          {category?.types?.map((type, index) => (
                            <p key={index}>
                              <Link
                                href={{
                                  pathname: `/products/${category?.slug}`,
                                  query: { type: type?.slug },
                                }}
                                key={type._id}
                                className="w-fit hover-underline-lr"
                              >
                                <SheetClose>{type?.title}</SheetClose>
                              </Link>
                            </p>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
              {superCategories.map((superCategory, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 2}`}
                  className="border-none text-xl"
                >
                  <AccordionTrigger className="p-0">
                    <Link
                      href={`/products/superCategory/${superCategory.slug}`}
                      className={`w-fit hover-underline-lr ${
                        pathname ===
                          `/products/superCategory/${superCategory.slug}` &&
                        "text-primary"
                      }`}
                    >
                      <SheetClose>{superCategory.title}</SheetClose>
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 h-fit max-h-[25vh] overflow-x-hidden overflow-y-scroll">
                    <Accordion type="single" collapsible>
                      {superCategory?.categories.map(
                        (category: any, index: number) => (
                          <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-none"
                          >
                            <AccordionTrigger className="py-2 text-lg">
                              <Link
                                href={`/products/${category.slug}`}
                                className={`w-fit hover-underline-lr ${
                                  pathname === `/products/${category.slug}` &&
                                  "text-primary"
                                }`}
                              >
                                <SheetClose>{category?.title}</SheetClose>
                              </Link>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 px-4 text-lg">
                              {categories
                                .find((cat) => cat.slug === category.slug)
                                ?.types.map((type) => (
                                  <p key={index}>
                                    <Link
                                      href={{
                                        pathname: `/products/${category?.slug}`,
                                        query: { type: type?.slug },
                                      }}
                                      key={type._id}
                                      className="w-full hover-underline-lr"
                                    >
                                      <SheetClose>{type?.title}</SheetClose>
                                    </Link>
                                  </p>
                                ))}
                            </AccordionContent>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}

              <Link
                href="/about"
                className={`w-full text-xl font-medium ${
                  pathname.includes("/about") && "text-primary"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`w-full text-xl font-medium ${
                  pathname.includes("/contact") && "text-primary"
                }`}
              >
                Contact & FAQ{"'"}s
              </Link>
            </Accordion>
            {session?.user && (
              <div className="py-2 px-4 space-y-4">
                <div className="border-b border-black/30 mt-2 mb-2"></div>
                {profileSections.map((link, index) => (
                  <SheetClose key={index} className="w-full">
                    <Link
                      href={link.href}
                      className={`flex-between text-xl font-medium ${
                        pathname.includes(link.href) && "text-primary"
                      }`}
                    >
                      {link.head}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose className="w-full">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      signOut();
                    }}
                    className="w-full rounded-none"
                  >
                    Logout
                  </Button>
                </SheetClose>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
