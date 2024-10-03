"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  removeFile,
  uploadMultipleNewFiles,
} from "@/utils/actions/fileUpload.action";
import { calculateDiscount } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ColorOption, FAQs, SelectCategoriesAndTypes } from "./AddProduct";
import ReactCountUp from "@/components/ui/ReactCountUp";
import Loader from "@/components/ui/Loader";

export interface ProductDetailValues {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  image_link: string;
  price: number;
  oldPrice?: number;
  quantityInStock: number;
  availableSizes: string[];
  colorOptions: {
    _id: string;
    title: string;
    color: string;
  }[];
  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];
  type: string[];
  material: string;
  fabricType?: string;
  careInstructions?: string;
  origin: string;
  brand: string;
  faqs?: {
    _id: string;
    question: string;
    answer: string;
  }[];
}

interface ColorOptionValue {
  title: string;
  color: string;
}
interface CategoryValue {
  title: string;
  slug: string;
}
interface Faq {
  question: string;
  answer: string;
}

const EditProduct: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetailValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [changedFields, setChangedFields] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [image_link, setImage_link] = useState<string>("");
  const [fetchImages, setFetchImages] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [oldPrice, setOldPrice] = useState<number>();
  const [quantityInStock, setQuantityInStock] = useState<number>();
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [colorOptions, setColorOptions] = useState<ColorOptionValue[]>([]);
  const [categories, setCategories] = useState<CategoryValue[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [material, setMaterial] = useState<string>("");
  const [fabricType, setFabricType] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [origin, setOrigin] = useState<string>("India");
  const [brand, setBrand] = useState<string>(
    "Chimanlal Suresh Kumar (CSK) Textiles"
  );
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const handleAddImage = async (event: React.MouseEvent<HTMLDivElement>) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, .gif";
    input.multiple = true;

    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);

      if (files.length > 0) {
        const imagesFormData = new FormData();
        files.forEach((file) => {
          imagesFormData.append("files", file);
        });

        const imagesUrl = (await uploadMultipleNewFiles(
          imagesFormData
        )) as string[];

        if (!imagesUrl.length) {
          return toast({
            title: "Images upload failed.",
            description: "Please try again later...",
            variant: "destructive",
          });
        }
        setImages((prevImages) => [...prevImages, ...imagesUrl]);
        if (!image_link) {
          setImage_link(imagesUrl[0]);
        }
      }
    };

    input.click();
  };

  const handleRemoveImage = async (imageToRemove: string) => {
    const success = await removeFile(imageToRemove);

    if (success) {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter(
          (image) => image !== imageToRemove
        );

        if (image_link === imageToRemove && updatedImages.length > 0) {
          setImage_link(updatedImages[0]);
        } else if (updatedImages.length === 0) {
          setImage_link("");
        }

        return updatedImages;
      });
    } else {
      toast({
        title: "Image removal failed.",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };

  const toggleSize = (size: string) => {
    setAvailableSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/products/read/get-product-by-slug/${slug}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!product) fetchProductBySlug();
    else {
      setImage_link(product?.image_link);
      setFetchImages(product?.images);
      setTitle(product.title);
      setDescription(product?.description);
      setPrice(product?.price);
      setOldPrice(product?.oldPrice);
      setQuantityInStock(product?.quantityInStock);
      setAvailableSizes(product?.availableSizes);
      setColorOptions(product?.colorOptions);
      setCategories(product?.categories);
      setTypes(product?.type);
      setMaterial(product?.material);
      if (product?.fabricType) setFabricType(product?.fabricType);
      if (product?.careInstructions)
        setCareInstructions(product?.careInstructions);
      if (product?.origin) setOrigin(product?.origin);
      if (product?.brand) setBrand(product?.brand);
      if (product?.faqs) setFaqs(product?.faqs);
    }
  }, [product, slug]);

  useEffect(() => {
    const handleFieldChange = () => {
      const hasChanges =
        image_link !== product?.image_link ||
        JSON.stringify(images) !== JSON.stringify(product?.images) ||
        title !== product?.title ||
        description !== product?.description ||
        price !== product?.price ||
        oldPrice !== product?.oldPrice ||
        quantityInStock !== product?.quantityInStock ||
        JSON.stringify(availableSizes) !==
          JSON.stringify(product?.availableSizes) ||
        JSON.stringify(colorOptions) !==
          JSON.stringify(product?.colorOptions) ||
        JSON.stringify(categories) !== JSON.stringify(product?.categories) ||
        JSON.stringify(types) !== JSON.stringify(product?.type) ||
        material !== product?.material ||
        fabricType !== product?.fabricType ||
        careInstructions !== product?.careInstructions ||
        origin !== product?.origin ||
        brand !== product?.brand ||
        JSON.stringify(faqs) !== JSON.stringify(product?.faqs);

      setChangedFields(hasChanges);
    };
    handleFieldChange();
  }, [
    image_link,
    images,
    title,
    description,
    price,
    oldPrice,
    quantityInStock,
    availableSizes,
    colorOptions,
    categories,
    types,
    material,
    fabricType,
    careInstructions,
    origin,
    brand,
    faqs,
    product?.image_link,
    product?.images,
    product?.title,
    product?.description,
    product?.price,
    product?.oldPrice,
    product?.quantityInStock,
    product?.availableSizes,
    product?.colorOptions,
    product?.categories,
    product?.type,
    product?.material,
    product?.fabricType,
    product?.careInstructions,
    product?.origin,
    product?.brand,
    product?.faqs,
  ]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSave(true);
    const updatedImages = [...fetchImages, ...images];

    // const fields = {
    //   image_link,
    //   images: updatedImages,
    //   title,
    //   description,
    //   price,
    //   oldPrice,
    //   quantityInStock,
    //   availableSizes,
    //   colorOptions,
    //   categories,
    //   types,
    //   material,
    //   fabricType,
    //   careInstructions,
    //   origin,
    //   brand,
    //   faqs,
    // };

    try {
      const res = await fetch(
        `/api/products/update/admin/edit-product/${product?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_link,
            images: updatedImages,
            title,
            description,
            price,
            oldPrice,
            quantityInStock,
            availableSizes,
            colorOptions,
            categories,
            type: types,
            material,
            fabricType,
            careInstructions,
            origin,
            brand,
            faqs,
          }),
        }
      );

      const data = await res.json();

      toast({
        title: data.message || data.error,
        description: data.message
          ? "Product updated successfully."
          : "Please try again later...",
        variant: data.error ? "destructive" : "default",
      });

      if (res.ok) {
        setSuccess(true);
        // router.push("/admin/all-products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  if (loading) return <Loader />;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <form
        onSubmit={handleEditSubmit}
        className="w-full h-full overflow-hidden"
      >
        <header className="w-full h-fit flex justify-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Edit Product
          </h2>
          <div className="w-fit flex-center gap-2">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-red-500 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!changedFields || loadingSave || success}
              className="text-white"
            >
              {!loadingSave
                ? "Save Edit"
                : success
                ? "Saved Edits"
                : "Saving Edit..."}
            </Button>
          </div>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <div className="w-full h-[calc(100vh-140px)] flex gap-2">
            <div className="w-[60%] h-full overflow-hidden">
              <h4>Main Image</h4>
              <div className="relative w-full h-[95%] bg-[#F8F8F8] flex-center">
                {image_link ? (
                  <Image
                    src={image_link}
                    alt="Main Image"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain animate-slide-down"
                  />
                ) : (
                  <>
                    <Image
                      src="/logo.png"
                      alt="Main Image"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 flex-center text-primary animate-slide-down">
                      Choose a Image
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-[40%] h-full overflow-hidden">
              <h4>Images</h4>
              <div className="w-full h-[95%] bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll">
                <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div
                    className="w-full h-56 flex-center cursor-pointer select-none br active:scale-95 ease-in-out duration-300"
                    onClick={handleAddImage}
                  >
                    <div className="w-12 h-12 rounded-full flex-center bg-primary text-2xl md:text-4xl lg:text-5xl text-white p-4">
                      +
                    </div>
                  </div>
                  {images
                    .slice()
                    .reverse()
                    .map((image, index) => (
                      <div
                        key={index}
                        className={`relative group w-full h-56 br ${
                          image === image_link && "bg-primary shadow-md"
                        }`}
                        onClick={() => setImage_link(image)}
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          title="Remove"
                          className="absolute top-1 right-2 z-10 text-xl text-[red] opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                        >
                          x
                        </button>
                        {image === image_link && (
                          <div className="absolute inset-0 cursor-not-allowed bg-black/40 flex-center text-primary animate-slide-down">
                            Main Image
                          </div>
                        )}
                        <Image
                          src={image}
                          alt={`Image ${index + 1}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-contain cursor-pointer"
                        />
                      </div>
                    ))}

                  {fetchImages
                    .slice()
                    .reverse()
                    .map((image, index) => (
                      <div
                        key={index}
                        className={`relative group w-full h-56 br ${
                          image === image_link && "bg-primary shadow-xl"
                        }`}
                        onClick={() => setImage_link(image)}
                      >
                        <button
                          type="button"
                          // onClick={() => handleRemoveImage(image)}
                          title="Remove"
                          className="absolute top-1 right-2 z-10 text-xl text-red opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                        >
                          x
                        </button>
                        {image === image_link && (
                          <div className="absolute inset-0 bg-black/40 flex-center text-primary animate-slide-down">
                            Main Image
                          </div>
                        )}
                        <Image
                          src={image}
                          alt={`Image ${index + 1}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-contain cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
            <>
              {/* Product Title and Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  placeholder="Enter Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Enter Description"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                ></textarea>
              </div>

              {/* Price and Old Price */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value as unknown as number)
                      }
                      required
                      placeholder="Enter"
                      className="custom-number-input mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Old Price
                    </label>
                    <input
                      type="number"
                      value={oldPrice}
                      onChange={(e) =>
                        setOldPrice(e.target.value as unknown as number)
                      }
                      placeholder="Enter"
                      className="custom-number-input mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                    />
                  </div>
                </div>
                {/* Discount and Available Sizes */}
                {oldPrice && (
                  <div className="w-fit h-fit py-1 animate-slide-down overflow-hidden">
                    <label className="animate-slide-up block text-sm font-medium text-gray-700">
                      Discount -{" "}
                      {price && oldPrice && (
                        <ReactCountUp
                          amt={calculateDiscount(price, oldPrice)}
                          duration={1}
                          className="text-md text-[#2CD396] font-medium"
                        >
                          % off
                        </ReactCountUp>
                      )}
                    </label>
                  </div>
                )}
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Material
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                  placeholder="Enter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                />
              </div>

              {/* Color Section */}
              <ColorOption
                section="edit"
                colorOptions={colorOptions}
                setColorOptions={setColorOptions}
              />

              {/* Available Sizes Section */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Sizes
                  </label>
                  <div className="flex space-x-2 mt-1">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={`border rounded-full px-3 py-2 ${
                          availableSizes.includes(size)
                            ? "bg-primary text-white"
                            : "bg-white text-gray-700"
                        }`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity In Stock
                  </label>
                  <input
                    type="number"
                    value={quantityInStock}
                    onChange={(e) =>
                      setQuantityInStock(e.target.value as unknown as number)
                    }
                    required
                    placeholder="Enter"
                    className="custom-number-input mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  />
                </div>
              </div>

              {/* Fabric Type, Origin, Care Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fabric Type
                </label>
                <input
                  type="text"
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  placeholder="Enter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Enter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                />
              </div>
              {/* Brand */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  placeholder="Enter"
                />
              </div>
              <SelectCategoriesAndTypes
                section="edit"
                categories={categories}
                types={types}
                setCategories={setCategories}
                setTypes={setTypes}
              />
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Care Instructions
                </label>
                <textarea
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  placeholder="Enter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                ></textarea>
              </div>
            </>
            <FAQs faqs={faqs} setFaqs={setFaqs} />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
