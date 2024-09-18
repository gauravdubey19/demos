// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { useCursor } from "@/context/CursorProvider";
// // import { links } from "@/lib/data";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "../ui/navigation-menu";
// import { CategoryValues } from "@/lib/types";
// import MobileNav from "./MobileNav";
// import Cart from "./CartSheet";
// import ReactCountUp from "../ui/ReactCountUp";
// import { GoHeart } from "react-icons/go";
// import { IoSearchOutline } from "react-icons/io5";
// import { Button } from "../ui/button";

// const profileOption = [
//   { _id: 1, title: "Order History", href: "/profile/order-history" },
//   { _id: 2, title: "Payment Methods", href: "/profile/payment-methods" },
//   { _id: 3, title: "Account Settings", href: "/profile/account-settings" },
//   {
//     _id: 4,
//     title: "Customer Support & Help",
//     href: "/profile/customer-support-&-help",
//   },
// ];

// const Navbar: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
//   const pathname = usePathname();
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const { data: session } = useSession();
//   const navbarRef = useRef<HTMLDivElement>(null);
//   const { showLeft, showRight } = useCursor();
//   const visible = showLeft || showRight;

//   const [categories, setCategories] = useState<CategoryValues[]>([]);


//   // 
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<string[]>([]); // To hold search suggestions
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchQuery.trim()) {
//         try {
//           const response = await fetch(`/api/products/read/get-products-by-name?q=${encodeURIComponent(searchQuery)}`);

//           if (!response.ok) {
//             throw new Error('Failed to fetch products');
//           }

//           const data = await response.json();
//           console.log(data)
//           setSuggestions(data.products);
//           setShowSuggestions(true);
//           // const res = await fetch(`/api/products/search?query=${searchQuery}`);
//           // const data = await res.json();
//           // setSuggestions(data.suggestions); // Assuming API returns a `suggestions` array
//           // setShowSuggestions(true);

//           // console.log(searchQuery);
//           // setSuggestions(["kjahdjf","kjasdjkh","kjdhfkj"]);
//           // setShowSuggestions(true);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//           setShowSuggestions(false);
//         }
//       } else {
//         setShowSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [searchQuery]);
//   // 

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/products/read/get-categories", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data = await res.json();
//         if (data as CategoryValues[]) {
//           setCategories(data.categories as CategoryValues[]);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     if (categories.length === 0) fetchCategories();
//   }, [categories]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > window.innerHeight * 2.9 && pathname === "/") {
//         setIsVisible(true);
//       } else if (pathname !== "/") {
//         setIsVisible(true);
//       } else if (visible) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [pathname, visible]);

//   useEffect(() => {
//     if (navbarRef.current) {
//       if (isVisible) {
//         gsap.to(navbarRef.current, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//         });
//       } else {
//         gsap.to(navbarRef.current, {
//           y: -100,
//           opacity: 0,
//           duration: 1,
//           ease: "power3.out",
//         });
//       }
//     }
//   }, [isVisible]);

//   return (
//     <div
//       ref={navbarRef}
//       className="fixed top-0 z-[9999] max-h-[60px] w-full select-none flex-between bg-white text-black p-2 px-3 md:p-4 lg:px-12 shadow-lg transition-all"
//       style={{ transform: "translateY(-100px)", opacity: 0 }}
//     >
//       <div className="flex-center gap-4 md:gap-6">
//         <Link
//           href="/"
//           className="flex-between gap-1 text-2xl lg:text-3xl font-black overflow-hidden"
//         >
//           <Image
//             src="/logo.png"
//             alt="LoGo"
//             width={400}
//             height={400}
//             className="w-14 h-14"
//           />
//         </Link>
//         <div>
//           <NavigationMenu className="hidden md:block">
//             <NavigationMenuList className="flex items-center gap-2 lg:gap-4">
//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="w-full cursor-pointer bg-transparent border-none outline-none p-1">
//                   Categories
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
//                   <CategoriesList categories={categories} />
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//               {categories.slice(0, 3).map((link, index) => {
//                 const isActive = pathname === `/products/${link.slug}`;
//                 return (
//                   <NavigationMenuItem key={index}>
//                     <Link
//                       href={`/products/${link.slug}`}
//                       className={`capitalize cursor-pointer ${isActive
//                           ? "text-primary font-semibold"
//                           : "w-fit hover-underline-lr active:translate-y-0.5"
//                         } ease-in-out duration-200`}
//                     >
//                       {link.title.split(" ")[0]}
//                     </Link>
//                   </NavigationMenuItem>
//                 );
//               })}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       </div>
//       <MobileNav categories={categories} />

//       <div className="hidden md:flex-center md:gap-4 lg:gap-6 relative">
//         <div className="flex-center relative">
//           <div
//             id="search"
//             className="flex-center lg:bg-zinc-100 rounded-md px-2"
//           >
//             <IoSearchOutline
//               size={20}
//               className="text-zinc-400 scale-150 lg:scale-100"
//             />
//             <input
//               type="text"
//               placeholder="Search for products, categories & more"
//               className="hidden lg:block xl:w-96 bg-transparent border-none outline-none p-2"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide dropdown after delay to allow click
//             />
//           </div>

//           {showSuggestions && suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-md z-10 border rounded-md p-2 space-y-2">
//               {suggestions.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   className="hover:bg-gray-100 p-2 cursor-pointer"
//                   onClick={() => {
//                     setSearchQuery(suggestion);
//                     setShowSuggestions(false);
//                   }}
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         {session?.user ? (
//           <>
//             <Link href="/profile/wishlist" className="relative mr-1">
//               <GoHeart
//                 size={25}
//                 color="black"
//                 className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
//               />
//               <ReactCountUp
//                 className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
//                 amt={0}
//               />
//             </Link>
//             <Cart />
//             <NavigationMenu className="hidden md:block">
//               {/* Profile dropdown */}
//             </NavigationMenu>
//           </>
//         ) : (
//           <Link
//             href={"/sign-in"}
//             className="bg-zinc-50 border border-gray-300 text-black p-1 rounded-full cursor-pointer text-sm font-semibold hover:bg-gray-100 hover:shadow-sm transition-all duration-300 ease-in-out"
//           >
//             Sign In
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// export interface CategoriesListProps {
//   categories: CategoryValues[];
// }

// const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
//   const pathname = usePathname();
//   // if (categories.length === 0) return;
//   return (
//     <>
//       <div className="w-[40vw] h-fit grid grid-cols-4 gap-2 p-2">
//         {categories.map((category, index) => {
//           const isActive = pathname === `/products/${category.slug}`;

//           return (
//             <Link
//               href={`/products/${category.slug}`}
//               key={category._id}
//               className={`w-fit hover-underline-lr hover:text-primary text-xs ${
//                 isActive && "text-primary"
//               }`}
//             >
//               {category.title}
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };



"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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
import { GoHeart } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";

const profileOption = [
  { _id: 1, title: "Order History", href: "/profile/order-history" },
  { _id: 2, title: "Payment Methods", href: "/profile/payment-methods" },
  { _id: 3, title: "Account Settings", href: "/profile/account-settings" },
  {
    _id: 4,
    title: "Customer Support & Help",
    href: "/profile/customer-support-&-help",
  },
];

const Navbar: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session } = useSession();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { showLeft, showRight } = useCursor();
  const visible = showLeft || showRight;

  const [categories, setCategories] = useState<CategoryValues[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);


  const isFirstRender = useRef(true); 
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(`/api/products/read/search/${searchQuery}`);
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setSuggestions(data.products);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setShowSuggestions(false);
        }
      } else {
        setShowSuggestions(false);
      }
    };

    if (isFirstRender.current) {
      fetchSuggestions();
      isFirstRender.current = false; 
    } else {

      const delayFetch = setTimeout(fetchSuggestions, 2000);
      return () => clearTimeout(delayFetch);
    }

  }, [searchQuery]);



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

  console.log("pathname :", pathname);

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
                      className={`capitalize cursor-pointer ${isActive
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
        <div className="flex-center relative">
          <div
            id="search"
            className="flex-center lg:bg-zinc-100 rounded-md px-2"
          >
            <IoSearchOutline
              size={20}
              className="text-zinc-400 scale-150 lg:scale-100"
            />
            <input
              type="text"
              placeholder="Search for products, categories & more"
              className="hidden lg:block xl:w-96 bg-transparent border-none outline-none p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-md z-10 border rounded-md p-2 space-y-2">
              {suggestions.map((product) => (
                <li
                  key={product._id}
                  className="hover:bg-gray-100 p-2 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(product.title);
                    setShowSuggestions(false);
                    
                    router.replace(`products/${product.categories[0].slug}/${product.slug}`)

                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {session?.user ? (
          <>
            <Link href="/profile/wishlist" className="relative mr-1">
              <GoHeart
                size={25}
                color="black"
                className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
              />
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
                    <Image
                      src={session.user.image || "/avatar.png"}
                      alt="User"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
                    {profileOption.map((option) => (
                      <Link
                        key={option._id}
                        href={option.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.title}
                      </Link>
                    ))}
                    <Link
                      href={"/sign-in"}
                      className="bg-zinc-50 border border-gray-300 text-black p-1 rounded-full cursor-pointer text-sm font-semibold hover:bg-gray-100 hover:shadow-sm transition-all duration-300 ease-in-out"
                    >
                      Sign In
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : (
            <Link
              href={"/sign-in"}
              className="capitalize cursor-pointer flex-center px-4 rounded ring-1 ring-primary shadow-md text-black hover:text-white hover:bg-primary ease-in-out duration-300"
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
              className={`w-fit hover-underline-lr hover:text-primary text-xs ${isActive && "text-primary"
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