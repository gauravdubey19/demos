// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import AddModal from "./AddModal";

// interface Product {
//     id: number;
//     title: string;
//     mainImage: string; // Changed from 'image' to 'mainImage' to match the API response
//     price: number;
// }

// interface OutfitData {
//     outfitTitle: string;
//     outfitImage: string;
//     productCollection: Product[];
// }

// const NewOutfit = () => {
//     const [outfitCollection, setOutfitCollection] = useState<OutfitData[]>([
//         {
//             outfitTitle: "Outfit 1",
//             outfitImage: "/images/outfit1.jpg",
//             productCollection: [],
//         },
//     ]);

//     const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>(
//         Array(4).fill(null)
//     );

//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState<Product[]>([]);
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);


//     const [outfitImage, setOutfitImage] = useState("/images/outfit1.jpg");
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         const fetchSuggestions = async () => {
//             if (searchQuery.trim()) {
//                 setLoading(true);
//                 try {
//                     const response = await fetch(
//                         `/api/products/read/search/${searchQuery}`
//                     );
//                     const data = await response.json();
//                     if (response.ok && data.products && data.products.length > 0) {
//                         setSuggestions(data.products);
//                     } else {
//                         setSuggestions([]);
//                     }
//                 } catch (error) {
//                     console.error("Error fetching suggestions:", error);
//                     setSuggestions([]);
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 setSuggestions([]);
//             }
//         };

//         fetchSuggestions();
//     }, [searchQuery]);

//     const handleSelectProduct = (product: Product) => {
//         setSelectedProduct(product);
//     };

//     const handleSaveProduct = () => {
//         if (selectedProduct && activeCardIndex !== null) {
//             const newSelectedProducts = [...selectedProducts];
//             newSelectedProducts[activeCardIndex] = selectedProduct;
//             setSelectedProducts(newSelectedProducts);

//             // Update outfitCollection
//             const newOutfitCollection = [...outfitCollection];
//             newOutfitCollection[0].productCollection = newSelectedProducts.filter((p): p is Product => p !== null);
//             setOutfitCollection(newOutfitCollection);

//             setSelectedProduct(null);
//             setActiveCardIndex(null);
//         }
//     };

//     const calculateTotalPrice = () => {
//         return selectedProducts.reduce((total, product) => total + (product?.price || 0), 0);
//     };

//     return (
//         <div className='h-screen overflow-y-auto'>
//             <div className="p-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold">Products</h1>
//                     <button className="bg-yellow-500 text-white px-6 py-2 rounded">Save</button>
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-medium mb-4">Add Outfit Collection</h2>
//                     <div className="grid grid-cols-4 gap-4 mb-8">
//                         {selectedProducts.map((product, index) => (
//                             <div key={index} className="border p-4 relative">
//                                 {product ? (
//                                     <img
//                                         src={product.mainImage}
//                                         alt={product.title}
//                                         className="w-full h-40 object-cover"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
//                                         <span className="text-gray-500">No product selected</span>
//                                     </div>
//                                 )}
//                                 <AddModal
//                                     searchQuery={searchQuery}
//                                     setSearchQuery={setSearchQuery}
//                                     suggestions={suggestions}
//                                     handleSelectProduct={handleSelectProduct}
//                                     selectedProduct={selectedProduct}
//                                     loading={loading}
//                                     onSave={() => {
//                                         setActiveCardIndex(index);
//                                         handleSaveProduct();
//                                     }}
//                                     onOpen={() => setActiveCardIndex(index)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-8">
//                     <div>
//                         <h2 className="text-xl font-medium mb-4">Choose Main Image</h2>
//                         <div className="relative">
//                             <img src={outfitCollection[0].outfitImage} alt="Outfit collection" className="w-full h-auto" />
//                             <button className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 px-4 py-2 rounded">Remove</button>
//                         </div>
//                     </div>
//                     <div>
//                         <h2 className="text-xl font-medium mb-4">Product Details</h2>
//                         <div className='border border-[#8888] rounded-lg p-5'>
//                             <ul className="space-y-2">
//                                 {selectedProducts.map((product, index) => (
//                                     product && (
//                                         <li key={index} className="flex justify-between">
//                                             <span>{product.title}</span>
//                                             <span>₹ {product.price}</span>
//                                         </li>
//                                     )
//                                 ))}
//                             </ul>
//                             <hr className="my-4" />
//                             <div className="flex justify-between font-bold">
//                                 <span>Total Outfit Price</span>
//                                 <span>₹ {calculateTotalPrice()}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <h2 className="text-xl p-5 px-10 font-medium mb-4">Product Details</h2>

//             <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-full">
//                 {outfitCollection.map((outfit, index) => (
//                     <div key={index} className="flex flex-col gap-4 border p-4 shadow-lg rounded-lg">
//                         <img src={outfit.outfitImage} className="w-full h-[8rem] object-cover rounded-md" />
//                         <div className="flex flex-col gap-2">
//                             <h2 className="text-md font-semibold">Outfit {outfit.outfitTitle}</h2>
//                             <div className="flex justify-between font-bold text-lg">
//                                 ₹ <span>{calculateTotalPrice()}</span>
//                             </div>
//                             <Button className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg">
//                                 <Plus size={16} /> Add Products
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NewOutfit;








import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddModal from "./AddModal";
import CollectionGrid from '../OutfitCollection/CollectionGrid';

interface Product {
    id: number;
    title: string;
    mainImage: string;
    price: number;
}

interface OutfitData {
    outfitTitle: string;
    outfitImage: string;
    productCollection: Product[];
}

const NewOutfit = () => {
    const [outfitCollection, setOutfitCollection] = useState<OutfitData[]>([
        {
            outfitTitle: "Outfit 1",
            outfitImage: "https://placehold.co/600x400",
            productCollection: [],
        },
    ]);

    const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>(
        Array(4).fill(null)
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
    const [outfitImage, setOutfitImage] = useState("https://placehold.co/600x400");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim()) {
                setLoading(true);
                try {
                    const response = await fetch(
                        `/api/products/read/search/${searchQuery}`
                    );
                    const data = await response.json();
                    if (response.ok && data.products && data.products.length > 0) {
                        setSuggestions(data.products);
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchQuery]);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleSaveProduct = () => {
        if (selectedProduct && activeCardIndex !== null) {
            const newSelectedProducts = [...selectedProducts];
            newSelectedProducts[activeCardIndex] = selectedProduct;
            setSelectedProducts(newSelectedProducts);

            const newOutfitCollection = [...outfitCollection];
            newOutfitCollection[0].productCollection = newSelectedProducts.filter((p): p is Product => p !== null);
            setOutfitCollection(newOutfitCollection);

            setSelectedProduct(null);
            setActiveCardIndex(null);
        }
    };

    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + (product?.price || 0), 0);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    setOutfitImage(result);

                    const newOutfitCollection = [...outfitCollection];
                    newOutfitCollection[0].outfitImage = result;
                    setOutfitCollection(newOutfitCollection);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        setOutfitImage("https://placehold.co/600x400");

        const newOutfitCollection = [...outfitCollection];
        newOutfitCollection[0].outfitImage = "https://placehold.co/600x400";
        setOutfitCollection(newOutfitCollection);
    };

    const allProductsSelected = selectedProducts.every(product => product !== null);
    const mainImageSelected = outfitImage !== "https://placehold.co/600x400";

    return (
        <div className='h-screen overflow-y-auto'>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <button className="bg-yellow-500 text-white px-6 py-2 rounded">Save</button>
                </div>
                <div>
                    <h2 className="text-xl font-medium mb-4">Add Outfit Collection</h2>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {selectedProducts.map((product, index) => (
                            <div key={index} className="border p-4 relative">
                                {product ? (
                                    <img
                                        src={product.mainImage}
                                        alt={product.title}
                                        className="w-full h-40 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No product selected</span>
                                    </div>
                                )}
                                <AddModal
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    suggestions={suggestions}
                                    handleSelectProduct={handleSelectProduct}
                                    selectedProduct={selectedProduct}
                                    loading={loading}
                                    onSave={() => {
                                        setActiveCardIndex(index);
                                        handleSaveProduct();
                                    }}
                                    onOpen={() => setActiveCardIndex(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-medium mb-4">Choose Main Image</h2>
                        <div className="relative">
                            <img src={outfitImage} alt="Outfit collection" className="w-full h-auto" />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 px-4 py-2 rounded"
                            >
                                Remove
                            </button>
                            <button
                                onClick={handleChooseImage}
                                className="absolute top-2 right-2 bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded"
                            >
                                Choose Image
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium mb-4">Product Details</h2>
                        <div className='border border-[#8888] rounded-lg p-5'>
                            {selectedProducts.some(product => product !== null) ? (
                                <>
                                    <ul className="space-y-2">
                                        {selectedProducts.map((product, index) => (
                                            product && (
                                                <li key={index} className="flex justify-between">
                                                    <span>{product.title}</span>
                                                    <span>₹ {product.price}</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                    <hr className="my-4" />
                                    <div className="flex justify-between font-bold">
                                        <span>Total Outfit Price</span>
                                        <span>₹ {calculateTotalPrice()}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-center">No products selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {allProductsSelected && mainImageSelected && (
                <>
                    <h2 className="text-xl p-5 px-10 font-medium mb-4">Preview</h2>

                    <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-full">
                        <CollectionGrid outfitCollection={outfitCollection} />
                    </div>
                </>
            )}
        </div>
    );
};

export default NewOutfit;