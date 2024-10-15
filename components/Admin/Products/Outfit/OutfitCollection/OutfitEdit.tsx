// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { removeFile, uploadNewFile } from "@/utils/actions/fileUpload.action";
// import { toast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import AddModal from "@/components/Admin/Products/Outfit/AddOutfit/AddModal";
// import ReactCountUp from "@/components/ui/ReactCountUp";
// import CollectionGrid from "@/components/Admin/Products/Outfit/OutfitCollection/CollectionGrid";

// interface Product {
//     _id: string;
//     productId: string;
//     title: string;
//     image: string;
//     price: number;
//     slug: string;
// }

// interface OutfitData {
//     _id: string;
//     outfitTitle: string;
//     outfitImage: string;
//     productCollection: Product[];
// }

// interface EditOutfitProps {
//     id: string;
// }

// const EditOutfit: React.FC<EditOutfitProps> = ({ id }) => {
//     const router = useRouter();
//     const [outfitCollection, setOutfitCollection] = useState<OutfitData[]>([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [suggestions, setSuggestions] = useState<Product[]>([]);
//     const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([]);
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
//     const [outfitTitle, setOutfitTitle] = useState("");
//     const [outfitImage, setOutfitImage] = useState("");
//     const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         const fetchOutfitData = async () => {
//             try {
//                 const response = await fetch(`/api/products/read/get-outfit-collection-by-id/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch outfit data");
//                 }
//                 const data = await response.json();
//                 console.log(data);
//                 setOutfitCollection([data.outfit]);
//                 setOutfitTitle(data.outfit.outfitTitle);
//                 setOutfitImage(data.outfit.outfitImage);
//                 setSelectedProducts(data.outfit.productCollection);
//             } catch (error) {
//                 console.error("Error fetching outfit data:", error);
//                 toast({
//                     title: "Error fetching outfit data",
//                     description: "Please try again later",
//                     variant: "destructive",
//                 });
//             }
//         };

//         fetchOutfitData();
//     }, [id]);



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
//                         // Filter out suggestions that are already in the outfitCollection's productCollection
//                         const existingProductIds = new Set(
//                             outfitCollection[0].productCollection.map(
//                                 (product) => product._id
//                             )
//                         );
//                         const filteredSuggestions = data.products.filter(
//                             (product: any) => !existingProductIds.has(product._id)
//                         );
//                         setSuggestions(filteredSuggestions);
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
//     }, [outfitCollection, searchQuery]);

//     // ... (keep other functions like handleSelectProduct, handleSaveProduct, calculateTotalPrice, etc.)
//     const handleSelectProduct = (product: Product) => {
//         setSelectedProduct(product);
//     };

//     const handleRemoveImage = async () => {
//         const rmImage = await removeFile(outfitImage);
//         if (!rmImage) {
//             return toast({
//                 title: "Failed to remove old outfit image.",
//                 description: "Please try again later...",
//                 variant: "destructive",
//             });
//         }

//         setOutfitImage("https://placehold.co/600x400");
//         const newOutfitCollection = [...outfitCollection];
//         newOutfitCollection[0].outfitImage = "https://placehold.co/600x400";
//         setOutfitCollection(newOutfitCollection);
//     };

//     const handleSaveProduct = () => {
//         if (selectedProduct && activeCardIndex !== null) {
//             const newSelectedProducts = [...selectedProducts];
//             newSelectedProducts[activeCardIndex] = selectedProduct;
//             setSelectedProducts(newSelectedProducts);

//             const newOutfitCollection = [...outfitCollection];
//             newOutfitCollection[0].productCollection = newSelectedProducts.filter(
//                 (p): p is Product => p !== null
//             );
//             setOutfitCollection(newOutfitCollection);

//             setSelectedProduct(null);
//             setActiveCardIndex(null);
//         }
//     };

//     const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const outfitImageFile = e.target.files?.[0];
//         if (!outfitImageFile) return;
//         setLoadingImageUpload(true);
//         if (outfitImage && outfitImage !== "https://placehold.co/600x400") {
//             const rmImage = await removeFile(outfitImage);
//             if (!rmImage) {
//                 toast({
//                     title: "Failed to remove old outfit image.",
//                     description: "Please try again later...",
//                     variant: "destructive",
//                 });
//                 setLoadingImageUpload(false);
//                 return;
//             }
//         }
//         const outfitImageFileFormData = new FormData();
//         outfitImageFileFormData.append("file", outfitImageFile);
//         const outfitImageUrl = (await uploadNewFile(
//             outfitImageFileFormData
//         )) as string;
//         if (!outfitImageUrl) {
//             toast({
//                 title: "outfit image upload failed.",
//                 description: "Please try again later...",
//                 variant: "destructive",
//             });
//             setLoadingImageUpload(false);
//             return;
//         }
//         setOutfitImage(outfitImageUrl);
//         const newOutfitCollection = [...outfitCollection];
//         newOutfitCollection[0].outfitImage = outfitImageUrl;
//         setOutfitCollection(newOutfitCollection);
//         setLoadingImageUpload(false);
//     };

//     const calculateTotalPrice = () => {
//         return selectedProducts.reduce(
//             (total, product) => total + (product?.price || 0),
//             0
//         );
//     };

//     const handleSaveOutfit = async () => {
//         if (!outfitTitle || !outfitImage) {
//             toast({
//                 title: "Enter Outfit Title and Choose Image",
//                 variant: "destructive",
//             });
//             return;
//         }

//         setSaving(true);

//         const productCollection = selectedProducts
//             .map((product) => {
//                 if (product) {
//                     return {
//                         productId: product._id,
//                         title: product.title,
//                         image: product.image,
//                         price: product.price,
//                         slug: product.slug,
//                     };
//                 }
//                 return null;
//             })
//             .filter((product): product is Exclude<typeof product, null> => product !== null);

//         try {
//             const response = await fetch(`/api/products/update/update-outfit-collection-by-id/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     outfitTitle,
//                     outfitImage,
//                     productCollection,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to update outfit");
//             }

//             const data = await response.json();
//             toast({
//                 title: "Outfit updated successfully",
//             });
//             router.push("/admin/all-outfit-collections");
//         } catch (error) {
//             console.error("Error updating outfit:", error);
//             toast({
//                 title: "Error updating outfit",
//                 variant: "destructive",
//             });
//         } finally {
//             setSaving(false);
//         }
//     };

//     const allProductsSelected = selectedProducts.every((product) => product !== null);
//     const image_linkSelected = outfitImage !== "https://placehold.co/600x400";

//     return (
//         <>
//             <section className="w-full h-full overflow-hidden">
//                 <header className="w-full h-fit flex justify-between p-4 md:py-6">
//                     <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
//                         Edit Outfit Collection
//                     </h2>
//                     <div className="w-fit flex-center gap-2 md:gap-4">
//                         <Button
//                             type="button"
//                             onClick={() => router.back()}
//                             className="bg-red-500 text-white"
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             disabled={saving || !allProductsSelected || !image_linkSelected}
//                             onClick={handleSaveOutfit}
//                             className="text-white"
//                         >
//                             {saving ? "Saving..." : "Save Outfit"}
//                         </Button>
//                     </div>
//                 </header>
//                 <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
//                     <div>
//                         <h2 className="text-xl font-medium mb-4">Edit Outfit Collection</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                             {selectedProducts.map((product, index) => (
//                                 <div key={index} className="border p-4 relative">
//                                     {product ? (
//                                         <div className="h-56 ">
//                                             <Image
//                                                 width={150}
//                                                 height={250}
//                                                 src={product.image ?? "https://placehold.co/600x400"}
//                                                 alt={product.title}
//                                                 style={{
//                                                     objectFit: "contain",
//                                                     width: "100%",
//                                                     height: "100%",
//                                                 }}
//                                             />
//                                         </div>
//                                     ) : (
//                                         <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
//                                             <span className="text-gray-500 text-center">No product selected</span>
//                                         </div>
//                                     )}
//                                     <AddModal
//                                         searchQuery={searchQuery}
//                                         setSearchQuery={setSearchQuery}
//                                         suggestions={suggestions}
//                                         handleSelectProduct={handleSelectProduct}
//                                         selectedProduct={selectedProduct}
//                                         loading={loading}
//                                         onSave={() => {
//                                             setActiveCardIndex(index);
//                                             handleSaveProduct();
//                                         }}
//                                         onOpen={() => setActiveCardIndex(index)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div>
//                             <h2 className="text-xl font-medium mb-4">Choose Main Image</h2>
//                             <div className="relative mb-4">
//                                 <div className="h-[300px] w-full bg-gray-200 overflow-hidden relative">
//                                     {loadingImageUpload ? (
//                                         <div className="absolute inset-0 z-20 bg-gray-300 flex-center animate-pulse cursor-not-allowed">
//                                             Uploading Image...
//                                         </div>
//                                     ) : (
//                                         <Image
//                                             src={outfitImage}
//                                             width={150}
//                                             height={150}
//                                             alt="Outfit collection"
//                                             className="w-full h-full object-contain"
//                                         />
//                                     )}
//                                 </div>
//                                 <button
//                                     onClick={handleRemoveImage}
//                                     disabled={outfitImage === "https://placehold.co/600x400"}
//                                     className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 px-4 py-2 rounded disabled:opacity-70"
//                                 >
//                                     Remove
//                                 </button>
//                                 <button className="absolute top-2 right-2 bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded overflow-hidden">
//                                     Choose Image
//                                     <input
//                                         type="file"
//                                         onChange={handleImageChange}
//                                         accept="image/*"
//                                         className="absolute inset-0 opacity-0 cursor-pointer"
//                                     />
//                                 </button>
//                             </div>
//                             <input
//                                 value={outfitTitle}
//                                 onChange={(e) => setOutfitTitle(e.target.value)}
//                                 type="text"
//                                 placeholder="Enter Outfit Name"
//                                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-none"
//                             />
//                         </div>
//                         <div>
//                             <h2 className="text-xl font-medium mb-4">Product Details</h2>
//                             <div className="border border-[#8888] rounded-lg p-5">
//                                 {selectedProducts.some((product) => product !== null) ? (
//                                     <>
//                                         <ul className="space-y-2">
//                                             {selectedProducts.map(
//                                                 (product, index) =>
//                                                     product && (
//                                                         <li key={index} className="flex justify-between">
//                                                             <span>{product.title}</span>
//                                                             <span>₹ {product.price}</span>
//                                                         </li>
//                                                     )
//                                             )}
//                                         </ul>
//                                         <hr className="my-4" />
//                                         <div className="flex justify-between font-bold">
//                                             <span>Total Outfit Price</span>
//                                             <ReactCountUp
//                                                 prefix="₹"
//                                                 amt={calculateTotalPrice()}
//                                                 decimals={true}
//                                             />
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <p className="text-gray-500 text-center">No products selected</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     {allProductsSelected && image_linkSelected && (
//                         <div className="w-full h-full">
//                             <h2 className="w-fit h-fit text-xl p-5 px-10 font-medium mb-4">
//                                 Preview
//                             </h2>
//                             <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-full">
//                                 <CollectionGrid outfitCollection={outfitCollection} />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default EditOutfit;



"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeFile, uploadNewFile } from "@/utils/actions/fileUpload.action";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AddModal from "@/components/Admin/Products/Outfit/AddOutfit/AddModal";
import ReactCountUp from "@/components/ui/ReactCountUp";
import CollectionGrid from "@/components/Admin/Products/Outfit/OutfitCollection/CollectionGrid";

interface Product {
    _id: string;
    productId: string;
    title: string;
    image: string;
    price: number;
    slug: string;
}

interface OutfitData {
    _id: string;
    outfitTitle: string;
    outfitImage: string;
    productCollection: Product[];
}

interface EditOutfitProps {
    id: string;
}

const EditOutfit: React.FC<EditOutfitProps> = ({ id }) => {
    const router = useRouter();
    const [outfitCollection, setOutfitCollection] = useState<OutfitData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
    const [outfitTitle, setOutfitTitle] = useState("");
    const [outfitImage, setOutfitImage] = useState("");
    const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchOutfitData = async () => {
            try {
                const response = await fetch(`/api/products/read/get-outfit-collection-by-id/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch outfit data");
                }
                const data = await response.json();
                setOutfitCollection([data.outfit]);
                setOutfitTitle(data.outfit.outfitTitle);
                setOutfitImage(data.outfit.outfitImage);
                setSelectedProducts(data.outfit.productCollection);
            } catch (error) {
                console.error("Error fetching outfit data:", error);
                toast({
                    title: "Error fetching outfit data",
                    description: "Please try again later",
                    variant: "destructive",
                });
            }
        };

        fetchOutfitData();
    }, [id]);

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
                        const existingProductIds = new Set(
                            selectedProducts.map((product) => product._id)
                        );
                        const filteredSuggestions = data.products.filter(
                            (product: Product) => !existingProductIds.has(product._id)
                        );
                        setSuggestions(filteredSuggestions);
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
    }, [selectedProducts, searchQuery]);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleRemoveImage = async () => {
        const rmImage = await removeFile(outfitImage);
        if (!rmImage) {
            return toast({
                title: "Failed to remove old outfit image.",
                description: "Please try again later...",
                variant: "destructive",
            });
        }

        setOutfitImage("https://placehold.co/600x400");
        const newOutfitCollection = [...outfitCollection];
        newOutfitCollection[0].outfitImage = "https://placehold.co/600x400";
        setOutfitCollection(newOutfitCollection);
    };

    const handleSaveProduct = () => {
        if (selectedProduct && activeCardIndex !== null) {
            const newSelectedProducts = [...selectedProducts];
            newSelectedProducts[activeCardIndex] = selectedProduct;
            setSelectedProducts(newSelectedProducts);

            const newOutfitCollection = [...outfitCollection];
            newOutfitCollection[0].productCollection = newSelectedProducts;
            setOutfitCollection(newOutfitCollection);

            setSelectedProduct(null);
            setActiveCardIndex(null);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const outfitImageFile = e.target.files?.[0];
        if (!outfitImageFile) return;
        setLoadingImageUpload(true);
        if (outfitImage && outfitImage !== "https://placehold.co/600x400") {
            const rmImage = await removeFile(outfitImage);
            if (!rmImage) {
                toast({
                    title: "Failed to remove old outfit image.",
                    description: "Please try again later...",
                    variant: "destructive",
                });
                setLoadingImageUpload(false);
                return;
            }
        }
        const outfitImageFileFormData = new FormData();
        outfitImageFileFormData.append("file", outfitImageFile);
        const outfitImageUrl = (await uploadNewFile(
            outfitImageFileFormData
        )) as string;
        if (!outfitImageUrl) {
            toast({
                title: "outfit image upload failed.",
                description: "Please try again later...",
                variant: "destructive",
            });
            setLoadingImageUpload(false);
            return;
        }
        setOutfitImage(outfitImageUrl);
        const newOutfitCollection = [...outfitCollection];
        newOutfitCollection[0].outfitImage = outfitImageUrl;
        setOutfitCollection(newOutfitCollection);
        setLoadingImageUpload(false);
    };

    const calculateTotalPrice = () => {
        return selectedProducts.reduce(
            (total, product) => total + product.price,
            0
        );
    };

    const handleSaveOutfit = async () => {
        if (!outfitTitle || !outfitImage) {
            toast({
                title: "Enter Outfit Title and Choose Image",
                variant: "destructive",
            });
            return;
        }

        setSaving(true);

        const productCollection = selectedProducts.map((product) => ({
            productId: product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            slug: product.slug,
        }));

        try {
            const response = await fetch(`/api/products/update/update-outfit-collection-by-id/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    outfitTitle,
                    outfitImage,
                    productCollection,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update outfit");
            }

            const data = await response.json();
            toast({
                title: "Outfit updated successfully",
            });
            router.push("/admin/all-outfit-collections");
        } catch (error) {
            console.error("Error updating outfit:", error);
            toast({
                title: "Error updating outfit",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    const allProductsSelected = selectedProducts.length === 4;
    const image_linkSelected = outfitImage !== "https://placehold.co/600x400";

    return (
        <>
            <section className="w-full h-full overflow-hidden">
                <header className="w-full h-fit flex justify-between p-4 md:py-6">
                    <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                        Edit Outfit Collection
                    </h2>
                    <div className="w-fit flex-center gap-2 md:gap-4">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-red-500 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving || !allProductsSelected || !image_linkSelected}
                            onClick={handleSaveOutfit}
                            className="text-white"
                        >
                            {saving ? "Saving..." : "Save Outfit"}
                        </Button>
                    </div>
                </header>
                <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
                    <div>
                        <h2 className="text-xl font-medium mb-4">Edit Outfit Collection</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {selectedProducts.map((product, index) => (
                                <div key={index} className="border p-4 relative">
                                    <div className="h-56 ">
                                        <Image
                                            width={150}
                                            height={250}
                                            src={product.image ?? "https://placehold.co/600x400"}
                                            alt={product.title}
                                            style={{
                                                objectFit: "contain",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-medium mb-4">Choose Main Image</h2>
                            <div className="relative mb-4">
                                <div className="h-[300px] w-full bg-gray-200 overflow-hidden relative">
                                    {loadingImageUpload ? (
                                        <div className="absolute inset-0 z-20 bg-gray-300 flex-center animate-pulse cursor-not-allowed">
                                            Uploading Image...
                                        </div>
                                    ) : (
                                        <Image
                                            src={outfitImage}
                                            width={150}
                                            height={150}
                                            alt="Outfit collection"
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={handleRemoveImage}
                                    disabled={outfitImage === "https://placehold.co/600x400"}
                                    className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 px-4 py-2 rounded disabled:opacity-70"
                                >
                                    Remove
                                </button>
                                <button className="absolute top-2 right-2 bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded overflow-hidden">
                                    Choose Image
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </button>
                            </div>
                            <input
                                value={outfitTitle}
                                onChange={(e) => setOutfitTitle(e.target.value)}
                                type="text"
                                placeholder="Enter Outfit Name"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-none"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-medium mb-4">Product Details</h2>
                            <div className="border border-[#8888] rounded-lg p-5">
                                {selectedProducts.length > 0 ? (
                                    <>
                                        <ul className="space-y-2">
                                            {selectedProducts.map((product, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{product.title}</span>
                                                    <span>₹ {product.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <hr className="my-4" />
                                        <div className="flex justify-between font-bold">
                                            <span>Total Outfit Price</span>
                                            <ReactCountUp
                                                prefix="₹"
                                                amt={calculateTotalPrice()}
                                                decimals={true}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-center">No products selected</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {allProductsSelected && image_linkSelected && (
                        <div className="w-full h-full">
                            <h2 className="w-fit h-fit text-xl p-5 px-10 font-medium mb-4">
                                Preview
                            </h2>
                            <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-full">
                                <CollectionGrid outfitCollection={outfitCollection} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default EditOutfit;