
// "use client";

// import ProductSection from "@/components/Products/ProductSection";
// import { CategoryValues } from "@/lib/types";
// import React, { useEffect, useState, useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const ProductCategorySection: React.FC<{ limit?: number }> = ({
//   limit = 3,
// }) => {
//   const [categories, setCategories] = useState<CategoryValues[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/newProducts/read/get-categories", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await res.json();
//         setCategories(data.categories as CategoryValues[]);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // GSAP animation for fade-in from left on scroll
//   useEffect(() => {
//     if (!loading && categories.length > 0 && containerRef.current) {
//       gsap.fromTo(
//         containerRef.current.children,
//         { opacity: 0, x: -100 }, // Start state: hidden and 100px left
//         {
//           opacity: 1,
//           x: 0, // End state: fully visible and at original position
//           duration: 1,
//           stagger: 0.2, // Add delay between each item for a sequential animation
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top 80%", // Start animation when 80% of the element is in view
//             toggleActions: "play none none reverse", // Play the animation when in view
//           },
//         }
//       );
//     }
//   }, [loading, categories]);

//   // Create a skeleton loader component
//   const SkeletonLoader = () => (
//     <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 pt-3 px-2 md:px-6 lg:px-8">
//       {[...Array(limit)].map((_, index) => (
//         <div key={index} className="w-full">
//           <div className="w-full flex-between">
//             <div className="w-32 md:w-52 h-full bg-slate-300 text-slate-300 animate-pulse rounded-md p-1">
//               .
//             </div>
//             <div className="group w-fit flex-center gap-2 p-1 px-3 md:p-1.5 md:px-4 rounded-3xl cursor-pointer lg:hover:bg-primary active:scale-95 ease-in-out duration-300">
//               {/* bg-primary md:bg-transparent active:bg-primary*/}
//               <span className="text-md md:text-lg font-medium translate-x-0.5">
//                 View More
//               </span>
//               <IoIosArrowForward
//                 size={20}
//                 className="font-extralight group-active:translate-x-1.5 ease-in-out duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="w-full overflow-hidden" ref={containerRef}>
//       {loading ? (
//         <SkeletonLoader />
//       ) : (
//         categories
//           .slice(0, limit)
//           .map((category) => (
//             <ProductSection
//               key={category._id}
//               category={category.title}
//               categorySlug={category.slug}
//             />
//           ))
//       )}
//     </div>
//   );
// };

// export default ProductCategorySection;






"use client";

import React, { useEffect, useState, useRef } from "react";
import ProductSection from "@/components/Products/ProductSection";
import { IoIosArrowForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Types based on your schema
interface ProductSize {
  size: string;
  quantity: number;
}

interface ProductImage {
  image_link: string;
  color: string;
  color_name: string;
  images: string[];
  quantity: ProductSize[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  title: string;
  slug: string;
}

interface Product {
  _id: string;
  sku: string;
  title: string;
  slug: string;
  description: string;
  images_collection: ProductImage[];
  price: number;
  sale_price?: number;
  sale_price_effective_date?: string;
  ratings: number;
  reviews_number: number;
  categories: Category[];
  product_highlights?: string[];
  type?: string[];
  material: string;
  sell_on_google_quantity?: number;
  pattern?: string;
  fabric_type?: string;
  care_instructions?: string;
  origin: string;
  availability: "in_stock" | "out_of_stock" | "preorder" | "backorder";
  availability_date?: Date;
  brand: string;
  faqs: FAQ[];
}

interface CategoryWithProducts extends Category {
  products: Product[];
}

const ProductCategorySection: React.FC<{ limit?: number }> = ({ limit = 3 }) => {
  const [categoryProducts, setCategoryProducts] = useState<CategoryWithProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProductsByCategories = async () => {
      try {
        const res = await fetch("/api/newProducts/read/get-categories", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        const products: Product[] = data.products;

        // Group products by category
        const categoryMap = new Map<string, CategoryWithProducts>();

        products.forEach((product) => {
          product.categories.forEach((category) => {
            if (!categoryMap.has(category.slug)) {
              categoryMap.set(category.slug, {
                ...category,
                products: [],
              });
            }
            categoryMap.get(category.slug)?.products.push(product);
          });
        });

        // Convert map to array and sort by category title
        const categoriesArray = Array.from(categoryMap.values()).sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setCategoryProducts(categoriesArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProductsByCategories();
  }, []);

  // GSAP animation for fade-in from left on scroll
  useEffect(() => {
    if (!loading && categoryProducts.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [loading, categoryProducts]);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 pt-3 px-2 md:px-6 lg:px-8">
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="w-full">
          <div className="w-full flex-between">
            <div className="w-32 md:w-52 h-full bg-slate-300 text-slate-300 animate-pulse rounded-md p-1">
              .
            </div>
            <div className="group w-fit flex-center gap-2 p-1 px-3 md:p-1.5 md:px-4 rounded-3xl cursor-pointer lg:hover:bg-primary active:scale-95 ease-in-out duration-300">
              <span className="text-md md:text-lg font-medium translate-x-0.5">
                View More
              </span>
              <IoIosArrowForward
                size={20}
                className="font-extralight group-active:translate-x-1.5 ease-in-out duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        categoryProducts.slice(0, limit).map((category) => (
          <ProductSection
            key={`${category.slug}`}
            category={category.title}
            categorySlug={category.slug}
            // products={category.products}
          />
        ))
      )}
    </div>
  );
};

export default ProductCategorySection;