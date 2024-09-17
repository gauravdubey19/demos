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

"use client";
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

  const sectionRef = useRef<HTMLElement>(null);

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
        setLoading(true);
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) fetchCategories();
  }, [categories]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          y: 0,
          opacity: 0,
          scale: 0.7,
        },
        {
          y: -80, // Move up by 50px
          ease: "none",
          scale: 1.4,
          duration: 0.3,
          delay: 0,
          opacity: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <section ref={sectionRef}>
          <CategoryCarousel setActiveSlide={setActiveSlide}>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="category-item p-10 flex flex-col items-center"
              >
                <Skeleton className="h-64 w-full mb-2 bg-slate-200" />
                <Skeleton className="h-2 w-full mb-2 bg-slate-200" />
                <Skeleton className="h-2 w-full mb-2 bg-slate-200" />
                <Skeleton className="h-5 w-full mb-2 bg-slate-200" />
              </div>
            ))}
          </CategoryCarousel>
        </section>
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
          />
        ))}
      </CategoryCarousel>
    );
  };

  return (
    <section className="min-h-screen w-full flex-center flex-col p-4 overflow-hidden">
      <div className="w-full max-w-3xl mb-5">
        <div className="h-[2px] bg-black w-full mb-5" />
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          Choose Your Style
        </h1>
      </div>
      <section ref={sectionRef} className="w-full flex justify-center">
        <div className="slider-container max-w-6xl w-full">
          {renderContent()}
        </div>
      </section>
    </section>
  );
};

export default CategorySection;
