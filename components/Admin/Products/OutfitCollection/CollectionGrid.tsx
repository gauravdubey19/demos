import Image from 'next/image';
import React from 'react';

const CollectionGrid = () => {
    const outfitCollection = [
        {
            outfitTitle: "Outfit 1",
            outfitImage: "/images/outfit1.jpg",
            productCollection: [
                { title: "Product 1", image: "/images/product1.jpg" },
                { title: "Product 2", image: "/images/product2.jpg" },
                { title: "Product 3", image: "/images/product3.jpg" },
                { title: "Product 4", image: "/images/product4.jpg" },
            ],
        },
    ];

    return (
        <div className='w-full h-full flex items-center gap-1 justify-between'>
            <div className="flex flex-col w-1/4 gap-1">
                {outfitCollection[0].productCollection.slice(0, 2).map((product, index) => (
                    <div key={index} title={product.title} className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2">
                        <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-full object-contain" />
                    </div>
                ))}
            </div>

            <div className="w-2/4 h-full flex justify-center items-center">
                <div className="relative w-full h-full bg-gray-100 rounded-xl flex justify-center items-center p-4">
                    <Image src={outfitCollection[0].outfitImage} alt={outfitCollection[0].outfitTitle} width={400} height={400} className="object-contain" />
                    <h1 className="absolute bottom-3 w-full text-center font-bold text-xl text-gray-600">{outfitCollection[0].outfitTitle}</h1>
                </div>
            </div>

            <div className="flex flex-col w-1/4 gap-1">
                {outfitCollection[0].productCollection.slice(2, 4).map((product, index) => (
                    <div key={index + 2} title={product.title} className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2">
                        <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-full object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionGrid;
