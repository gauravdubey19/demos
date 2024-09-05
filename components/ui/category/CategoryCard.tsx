// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// interface CategoryCard {
//   item: any;
//   activeSlide: any;
//   index: any;
// }

// const CategoryCard = ({ item, activeSlide, index }: CategoryCard) => {
//   return (
//     <div className="px-2">
//       <div
//         className={`relative transition-all flex items-center justify-center flex-col  duration-300 ${
//           activeSlide === index
//             ? "opacity-100 scale-140"
//             : "opacity-50 scale-50"
//         }`}
//       >
//         <Image
//           src={item.imageUrl}
//           alt={`Slide ${item.id}`}
//           width={800}
//           height={500}
//           className={`w-fit h-[20rem] transition-all duration-300`}
//         />
//         <div className="flex items-center flex-col gap-3 w-[70%]">
//           <div className="flex items-center flex-col  ">
//             <h1 className="text-lg ">Vibrant checks Shirt</h1>
//             <p className="text-[#a1a1a1]">
//               classic full-sleeve men{"'"}s shirt red and blue check pattern.
//             </p>
//           </div>

//           <Button
//             className={`mt-4 w-full transition-all duration-300 bg-primary rounded-none`}
//           >
//             View More
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;


import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  item: any
  activeSlide: number;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, activeSlide, index }) => {
  return (
    <div className="px-2 sm:px-4 py-10">
      <div
        className={`relative transition-all flex items-center justify-center flex-col duration-300 ${activeSlide === index
            ? "opacity-100 scale-100 sm:scale-100"
            : "opacity-50 scale-90 sm:scale-50"
          }`}
      >
        <Image
          src={item.imageUrl}
          alt={`Slide ${item.id}`}
          width={100}
          height={100}
          className="w-full h-auto max-h-[20rem] object-cover transition-all duration-300"
          />
        <div className="flex items-center flex-col gap-3 w-full sm:w-[70%] mt-4">
          <div className="flex items-center flex-col text-center">
            <h1 className="text-lg font-semibold">{item.title}</h1>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>

          <Button
            className="mt-2 w-full max-w-xs transition-all duration-300 bg-primary rounded-none"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;