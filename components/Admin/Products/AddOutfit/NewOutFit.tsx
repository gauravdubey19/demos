import React, { useState, useEffect, useRef } from "react";
import AddModal from "./AddModal";
import CollectionGrid from "../OutfitCollection/CollectionGrid";
import Image from "next/image";
import { uploadNewFile } from "@/utils/actions/fileUpload.action";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Product {
  _id?: number;
  productId?: number;
  title: string;
  image_link?: string;
  image?: string;
  price: number;
  slug: string;
}

interface OutfitData {
  outfitTitle: string;
  outfitImage: string;
  productCollection: Product[];
}

const NewOutfit = () => {
  const router = useRouter();
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
  const [outfitTitle, setOutfitTitle] = useState("");
  const [outfitFile, setOutfitFile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [outfitImage, setOutfitImage] = useState(
    "https://placehold.co/600x400"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveOutfit = async () => {
    if (!outfitTitle || !outfitFile) {
      toast({
        title: "Enter Outfit Title and Choose Image",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const mainImageFormData = new FormData();
    mainImageFormData.append("file", outfitFile);
    const mainImageUrl = (await uploadNewFile(mainImageFormData)) as string;

    let finalOutfitCollection = {
      outfitTitle: outfitTitle,
      outfitImage: mainImageUrl,
      productCollection: selectedProducts.map((product) => {
        if (product) {
          return {
            productId: product._id,
            title: product.title,
            image: product.image_link,
            price: product.price,
            slug: product.slug,
          };
        }
        return {
          productId: 0,
          title: "",
          image: "",
          price: 0,
          slug: "",
        };
      }),
    };

    console.log("Final Outfit Collection: ", finalOutfitCollection);

    try {
      const response = await fetch("/api/outfitCollections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalOutfitCollection),
      });

      if (!response.ok) {
        throw new Error("Failed to save outfit");
      }

      const data = await response.json();
      console.log("Outfit saved successfully:", data);
      toast({
        title: "Outfit saved successfully",
      });
      router.push("/admin/all-outfit-collections");
      setOutfitCollection([finalOutfitCollection]);
      console.log("Image URL: ", mainImageUrl);
      console.log("Outfit Collection: ", outfitCollection);
    } catch (error) {
      console.error("Error saving outfit:", error);
      toast({
        title: "Error saving outfit",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
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
            // Filter out suggestions that are already in the outfitCollection's productCollection
            const existingProductIds = new Set(
              outfitCollection[0].productCollection.map(
                (product) => product._id
              )
            );
            const filteredSuggestions = data.products.filter(
              (product: any) => !existingProductIds.has(product._id)
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
  }, [outfitCollection, searchQuery]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSaveProduct = () => {
    if (selectedProduct && activeCardIndex !== null) {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts[activeCardIndex] = selectedProduct;
      setSelectedProducts(newSelectedProducts);

      const newOutfitCollection = [...outfitCollection];
      newOutfitCollection[0].productCollection = newSelectedProducts.filter(
        (p): p is Product => p !== null
      );
      setOutfitCollection(newOutfitCollection);

      setSelectedProduct(null);
      setActiveCardIndex(null);
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + (product?.price || 0),
      0
    );
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setOutfitImage(result);

          const newOutfitCollection = [...outfitCollection];
          newOutfitCollection[0].outfitImage = result;
          setOutfitCollection(newOutfitCollection);
        }
      };
      reader.readAsDataURL(file);
      setOutfitFile(file);
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

  const allProductsSelected = selectedProducts.every(
    (product) => product !== null
  );
  const image_linkSelected = outfitImage !== "https://placehold.co/600x400";
  useEffect(() => {
    setOutfitCollection((prev) => {
      return prev.map((outfit) => {
        return {
          ...outfit,
          outfitTitle: outfitTitle,
        };
      });
    });
  }, [outfitTitle]);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            disabled={saving || !allProductsSelected || !image_linkSelected}
            onClick={handleSaveOutfit}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-white hover:text-yellow-500 border border-1 border-primary cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Outfit"}
          </button>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4">Add Outfit Collection</h2>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {selectedProducts.map((product, index) => (
              <div key={index} className="border p-4 relative">
                {product ? (
                  <div className="h-56 ">
                    <Image
                      width={150}
                      height={250}
                      src={product.image_link ?? "https://placehold.co/600x400"}
                      alt={product.title}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-center">
                      No product selected
                    </span>
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
            <div className="relative mb-4">
              <div className="h-[300px] w-full bg-gray-200 overflow-hidden relative">
                <Image
                  src={outfitImage}
                  width={150}
                  height={150}
                  alt="Outfit collection"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
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
            {/* input for Taking outfit name */}
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
              {selectedProducts.some((product) => product !== null) ? (
                <>
                  <ul className="space-y-2">
                    {selectedProducts.map(
                      (product, index) =>
                        product && (
                          <li key={index} className="flex justify-between">
                            <span>{product.title}</span>
                            <span>₹ {product.price}</span>
                          </li>
                        )
                    )}
                  </ul>
                  <hr className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Total Outfit Price</span>
                    <span>₹ {calculateTotalPrice()}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center">
                  No products selected
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {allProductsSelected && image_linkSelected && (
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
