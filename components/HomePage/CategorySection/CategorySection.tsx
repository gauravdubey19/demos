// "use client";

// import React, { useEffect, useState } from "react";
// import CategoryCarousel from "@/components/ui/category/CategoryCarousel";
// import CategoryCard from "./CategoryCard";
// import { CategoryValues } from "@/lib/types";

// const CategorySection: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState<number>(0);
//   const [categories, setCategories] = useState<CategoryValues[]>([]);
//   const [loading,setLoading] = useState<boolean>(true);

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
//         // console.log(data.categories as CategoryValues[]);
//         if (data as CategoryValues[]) {
//           setCategories(data.categories as CategoryValues[]);
//           setLoading(false)
//         }
//       } catch (error) {
//         setLoading(false)
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);


//   return (
//     <section className="h-[calc(100vh-60px)] w-full flex-center flex-col p-4 overflow-hidden">
//       <div className="w-full max-w-3xl mb-5">
//         <div className="h-[2px] bg-black w-full mb-5" />
//         <h1 className="md:text-4xl text-2xl font-bold text-center">
//           Choose Your Style
//         </h1>
//       </div>
//       <div className="w-full flex justify-center">
//         <div className="slider-container max-w-6xl w-full">
//           <CategoryCarousel setActiveSlide={setActiveSlide}>
//             {categories.map((item, index) => (
//               <CategoryCard
//                 key={item._id}
//                 item={item}
//                 activeSlide={activeSlide}
//                 index={index}
//                 loading={loading}
//               />
//             ))}
//           </CategoryCarousel>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;






"use client"
import React, { useEffect, useState, useRef } from "react";
import CategoryCarousel from "@/components/ui/category/CategoryCarousel";
import CategoryCard from "./CategoryCard";
import { CategoryValues } from "@/lib/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skeleton } from "@/components/ui/skeleton";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CategorySection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryRef = useRef<HTMLDivElement>(null);

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
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryRef.current && !loading) {
      const elements = gsap.utils.toArray(".category-item") as Element[];

      elements.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [loading]);

  const renderContent = () => {
    if (loading) {
      return (
        <CategoryCarousel setActiveSlide={setActiveSlide}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="category-item p-10 category-item">
              <Skeleton className="h-64 w-full mb-2 bg-slate-200 " />
              {/* <Skeleton className="h-4 w-full mb-2 bg-slate-200 " />
              <Skeleton className="h-4 w-full bg-slate-200 " /> */}
            </div>
          ))}
        </CategoryCarousel>
      );
    }

    return (
      <CategoryCarousel setActiveSlide={setActiveSlide}>
        {categories.map((item, index) => (
          <CategoryCard
            key={item._id}
            item={item}
            activeSlide={activeSlide}
            index={index}
            loading={loading}
            className="category-item"
          />
        ))}
      </CategoryCarousel>
    );
  };

  return (
    <section className="h-[calc(100vh-60px)] w-full flex-center flex-col p-4 overflow-hidden">
      <div className="w-full max-w-3xl mb-5">
        <div className="h-[2px] bg-black w-full mb-5" />
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          Choose Your Style
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="slider-container max-w-6xl w-full" ref={categoryRef}>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;