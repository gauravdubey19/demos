import Image from 'next/image';
import React from 'react';

interface CollectionGridProps {
    outfitCollection?: any[];
}

const CollectionGrid = ({ outfitCollection }: CollectionGridProps) => {
    return (
        <div className='w-full h-full flex items-center gap-1 justify-between'>
            <div className="flex flex-col w-1/4 gap-1 h-full">
                {outfitCollection && outfitCollection[0]?.productCollection.slice(0, 2).map((product: any, index: any) => (
                    <div key={index} title={product.title} className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2">
                        <Image
                            src={product.image_link}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <div className="w-2/4 h-full flex justify-center items-center">
                <div className="relative w-full h-full bg-gray-100 rounded-xl flex justify-center items-center p-4">
                    <Image
                        src={outfitCollection && outfitCollection[0].outfitImage}
                        alt={outfitCollection && outfitCollection[0].outfitTitle}
                        width={400}
                        height={400}
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                    />
                    <h1 className="absolute bottom-3 w-full text-center font-bold text-xl text-gray-600">{outfitCollection && outfitCollection[0].outfitTitle}</h1>
                </div>
            </div>

            <div className="flex flex-col w-1/4 gap-1 h-full">
                {outfitCollection && outfitCollection[0].productCollection.slice(2, 4).map((product: any, index: any) => (
                    <div key={index + 2} title={product.title} className="h-[50%] bg-gray-100 rounded-xl flex justify-center items-center p-2">
                        <Image
                            src={product.image_link}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionGrid;