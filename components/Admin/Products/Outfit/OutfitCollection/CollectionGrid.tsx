// import Image from "next/image";
// import React from "react";

// interface Product {
//   _id: string;
//   image: string;
//   title: string;
// }

// interface OutfitCollection {
//   outfitTitle: string;
//   outfitImage: string;
//   productCollection: Product[];
// }

// interface CollectionGridProps {
//   outfitCollection?: any[];
// }

// const CollectionGrid: React.FC<CollectionGridProps> = ({ outfitCollection }) => {
//   const outfit = outfitCollection?.[0];
//   const products = outfit?.productCollection || [];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
//       <div className="grid grid-cols-2 gap-4">
//         {products.slice(0, 2).map((product:any, index:any) => (
//           <div key={product._id || index} className="relative aspect-square">
//             <Image
//               src={product.image || "https://placehold.co/600x400"}
//               alt={product.title || "Product image"}
//               layout="fill"
//               objectFit="cover"
//             />
//           </div>
//         ))}
//       </div>
//       <div className="relative aspect-square">
//         <Image
//           src={outfit?.outfitImage || "https://placehold.co/600x400"}
//           alt={outfit?.outfitTitle || "Outfit image"}
//           layout="fill"
//           objectFit="cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <h2 className="text-white text-2xl font-bold text-center">
//             {outfit?.outfitTitle || "Outfit Title"}
//           </h2>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         {products.slice(2, 4).map((product:any, index:any) => (
//           <div key={product._id || index} className="relative aspect-square">
//             <Image
//               src={product.image || "https://placehold.co/600x400"}
//               alt={product.title || "Product image"}
//               layout="fill"
//               objectFit="cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollectionGrid;




import Image from "next/image";
import React from "react";

interface Product {
  _id: string;
  image: string;
  title: string;
}

interface OutfitCollection {
  outfitTitle: string;
  outfitImage: string;
  productCollection: Product[];
}

interface CollectionGridProps {
  outfitCollection?: any[];
}

const CollectionGrid: React.FC<CollectionGridProps> = ({ outfitCollection }) => {
  const outfit = outfitCollection?.[0];
  const products = outfit?.productCollection || [];

  return (
    <div className="w-full h-full flex items-center gap-1 justify-between">
      <div className="flex flex-col w-1/4 gap-1 h-full">
        {outfitCollection &&
          outfitCollection[0]?.productCollection
            .slice(0, 2)
            .map((product: any, index: any) => (
              <div
                key={index}
                title={product.title}
                className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2"
              >
                <Image
                  src={product.image_link}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
      </div>

      <div className="w-2/4 h-full flex justify-center items-center">
        <div className="relative w-full h-full bg-gray-100 rounded-xl flex justify-center items-center p-4 overflow-hidden">
          <Image
            src={outfitCollection && outfitCollection[0].outfitImage}
            alt={outfitCollection && outfitCollection[0].outfitTitle}
            width={400}
            height={400}
            className="w-full h-fit object-cover"
            style={{ objectFit: "cover" }}
          />
          <h1 className="absolute bottom-3 w-full text-center font-bold text-xl text-gray-600">
            {outfitCollection && outfitCollection[0].outfitTitle}
          </h1>
        </div>
      </div>

      <div className="flex flex-col w-1/4 gap-1 h-full">
        {outfitCollection &&
          outfitCollection[0].productCollection
            .slice(2, 4)
            .map((product: any, index: any) => (
              <div
                key={index + 2}
                title={product.title}
                className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2 overflow-hidden"
              >
                <Image
                  src={product.image_link}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
