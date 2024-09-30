"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { calculateDiscount, capitalizeString } from "@/lib/utils";
import { CategoryCollectionValues, Type } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { FaPlus } from "react-icons/fa";
import { BsPlus, BsTrash } from "react-icons/bs";
import Loader from "@/components/ui/Loader";
import { ColorOption, FAQs } from "./AddProduct";

export interface ProductDetailValues {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  mainImage: string;
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
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [fetchImages, setFeachImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

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
      setMainImage(product?.mainImage);
      setFeachImages(product?.images);
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

  console.log(product);

  const handleAddImage = (event: React.MouseEvent<HTMLDivElement>) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, .gif";
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);
      setImages((prevImages) => [...prevImages, ...files]);

      if (!mainImage && files.length > 0) {
        setMainImage(files[0]);
      }
    };

    input.click();
  };

  const handleSetMainImage = (image: File) => {
    setMainImage(image);
  };

  const handleRemoveImage = (imageToRemove: File) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter(
        (image) => image !== imageToRemove
      );

      if (mainImage === imageToRemove && updatedImages.length > 0) {
        setMainImage(updatedImages[0]);
      } else if (updatedImages.length === 0) {
        setMainImage(null);
      }

      return updatedImages;
    });
  };

  const toggleSize = (size: string) => {
    setAvailableSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        // removing size if it's already selected
        return prevSizes.filter((s) => s !== size);
      } else {
        // adding size if it's not selected
        return [...prevSizes, size];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSave(true);

    if (
      !title ||
      !description ||
      !images.length ||
      !mainImage ||
      !price ||
      !quantityInStock ||
      !availableSizes.length ||
      !colorOptions.length ||
      !categories.length ||
      !types.length ||
      !material
    ) {
      setLoadingSave(false);
      return toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }

    const formData = new FormData();
    try {
      formData.append("mainImage", mainImage); // Main image
      images.forEach((image) => {
        formData.append("images", image); // Multiple images
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price.toString());
      if (oldPrice) formData.append("oldPrice", oldPrice.toString());
      formData.append("quantityInStock", quantityInStock.toString());
      formData.append("material", material);
      if (fabricType) formData.append("fabricType", fabricType);
      if (careInstructions)
        formData.append("careInstructions", careInstructions);
      formData.append("origin", origin || "India");
      if (brand) formData.append("brand", brand);
      formData.append("availableSizes", JSON.stringify(availableSizes));
      formData.append("colorOptions", JSON.stringify(colorOptions));
      formData.append("categories", JSON.stringify(categories));
      formData.append("types", JSON.stringify(types));
      if (faqs.length) formData.append("faqs", JSON.stringify(faqs));

      const res = await fetch(
        `/api/products/update/admin/edit-product/${product?._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you can view the updated product details."
          : "Please try again later...",
        variant: data.error ? "destructive" : "default",
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
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
      <form onSubmit={handleSubmit} className="w-full h-full overflow-hidden">
        <header className="w-full h-fit flex justify-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Add New Product
          </h2>
          <div className="w-fit flex-center gap-2">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-red-500 text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loadingSave} className="text-white">
              {!loadingSave ? "Save" : "Saving..."}
            </Button>
          </div>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <div className="w-full h-[calc(100vh-140px)] flex gap-2">
            <div className="w-[60%] h-full overflow-hidden">
              <h4>
                Main Image<span className="text-[red]">*</span>
              </h4>
              <div className="relative w-full h-[95%] bg-[#F8F8F8] flex-center">
                {mainImage ? (
                  typeof mainImage === "string" ? (
                    <Image
                      src={mainImage}
                      alt="Main Image"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain animate-slide-down"
                    />
                  ) : (
                    <Image
                      src={URL.createObjectURL(mainImage)}
                      alt="Main Image"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain animate-slide-down"
                    />
                  )
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
                      Choose an Image
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-[40%] h-full overflow-hidden">
              <h4>
                Images<span className="text-[red]">*</span>
              </h4>
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
                          image === mainImage && "bg-primary shadow-xl"
                        }`}
                        onClick={() => handleSetMainImage(image)}
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          title="Remove"
                          className="absolute top-1 right-2 z-10 text-xl text-red opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                        >
                          x
                        </button>
                        {image === mainImage && (
                          <div className="absolute inset-0 bg-black/40 flex-center text-primary animate-slide-down">
                            Main Image
                          </div>
                        )}
                        <Image
                          src={URL.createObjectURL(image)}
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
                          image === mainImage && "bg-primary shadow-xl"
                        }`}
                        // onClick={() => handleSetMainImage(image)}
                      >
                        <button
                          type="button"
                          // onClick={() => handleRemoveImage(image)}
                          title="Remove"
                          className="absolute top-1 right-2 z-10 text-xl text-red opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                        >
                          x
                        </button>
                        {image === mainImage && (
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
                  Title<span className="text-[red]">*</span>
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
                  Description<span className="text-[red]">*</span>
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
                      Price<span className="text-[red]">*</span>
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
                  Material<span className="text-[red]">*</span>
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
                colorOptions={colorOptions}
                setColorOptions={setColorOptions}
              />

              {/* Available Sizes Section */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Sizes<span className="text-[red]">*</span>
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
                    Quantity In Stock<span className="text-[red]">*</span>
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

interface SelectCategoriesAndTypesProps {
  categories: CategoryValue[];
  types: string[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryValue[]>>;
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectCategoriesAndTypes: React.FC<SelectCategoriesAndTypesProps> = ({
  setCategories,
  setTypes,
  categories,
  types,
}) => {
  const [categoriesCollection, setCategoriesCollection] = useState<
    CategoryCollectionValues[]
  >([]);
  const [categorySelections, setCategorySelections] = useState<
    { category: CategoryCollectionValues; type: Type }[]
  >([]);

  useEffect(() => {
    const fetchCategoriesCollection = async () => {
      try {
        const res = await fetch(`/api/products/read/get-categories`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategoriesCollection(data.categories as CategoryCollectionValues[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesCollection();
  }, []);

  useEffect(() => {
    // Update initial selections based on categories and types from props
    const initialSelections = categories.map((category) => {
      const matchedCategory = categoriesCollection.find(
        (cat) => cat.slug === category.slug
      ) || {
        _id: "",
        image: "",
        title: "",
        slug: "",
        description: "",
        types: [],
        createdAt: "",
      };

      return {
        category: matchedCategory,
        type: { title: "", slug: "" },
      };
    });

    setCategorySelections(initialSelections);
  }, [categories, categoriesCollection]);

  useEffect(() => {
    // Update the types based on category selections
    const selectedTypes = categorySelections.map(
      (selection) => selection.type.slug
    );
    setTypes(selectedTypes);
  }, [categorySelections, setTypes]);

  const handleCategoryChange = (index: number, slug: string) => {
    const selectedCategory = categoriesCollection.find(
      (category) => category.slug === slug
    );
    if (selectedCategory) {
      const updatedSelections = [...categorySelections];
      updatedSelections[index] = {
        category: selectedCategory,
        type: updatedSelections[index]?.type || { title: "", slug: "" },
      };
      setCategorySelections(updatedSelections);

      // Update selected categories in parent
      setCategories(
        updatedSelections.map((sel) => ({
          title: sel.category.title,
          slug: sel.category.slug,
        }))
      );
    }
  };

  const handleTypeChange = (index: number, slug: string) => {
    const selectedType = categorySelections[index].category.types.find(
      (type) => type.slug === slug
    );
    if (selectedType) {
      const updatedSelections = [...categorySelections];
      updatedSelections[index].type = selectedType;
      setCategorySelections(updatedSelections);
    }
  };

  const handleAddMoreCategory = () => {
    setCategorySelections([
      ...categorySelections,
      {
        category: {
          _id: "",
          image: "",
          title: "",
          slug: "",
          description: "",
          types: [],
          createdAt: "",
        },
        type: { title: "", slug: "" },
      },
    ]);
  };

  const handleRemoveSelection = (index: number) => {
    const updatedSelections = categorySelections.filter((_, i) => i !== index);
    setCategorySelections(updatedSelections);

    // Update parent state after removal
    setCategories(
      updatedSelections.map((sel) => ({
        title: sel.category.title,
        slug: sel.category.slug,
      }))
    );
  };

  const availableCategories = categoriesCollection.filter(
    (category) =>
      !categorySelections.some(
        (selection) => selection.category.slug === category.slug
      )
  );

  const isAddButtonDisabled = categorySelections.some(
    (selection) => !selection.category.slug || !selection.type.slug
  );

  if (categoriesCollection.length === 0)
    return <h2 className="text-primary">Loading categories...</h2>;

  return (
    <div className="col-span-2 grid grid-cols-1 gap-2">
      <div className="font-semibold">
        Categories and Types<span className="text-[red]">*</span>
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {categorySelections.map((selection, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category<span className="text-[red]">*</span>
              </label>
              {selection.category.slug ? (
                <div className="mt-1 p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                  {selection.category.title}
                </div>
              ) : (
                <select
                  value={selection.category.slug || ""}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                >
                  <option>Select Category</option>
                  {availableCategories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type<span className="text-[red]">*</span>
              </label>
              <div className="flex gap-2">
                {selection.type.slug ? (
                  <div className="mt-1 w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                    {selection.type.title}
                  </div>
                ) : (
                  <select
                    value={selection.type.slug || ""}
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                    className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  >
                    <option>Select Type</option>
                    {selection.category.types.map((type) => (
                      <option key={type.slug} value={type.slug}>
                        {type.title}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSelection(index)}
                  className="w-fit h-fit p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <BsTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="col-span-2">
          <Button
            type="button"
            onClick={handleAddMoreCategory}
            disabled={isAddButtonDisabled}
            className="w-full py-2 mt-2 text-white"
          >
            Add More Category
          </Button>
        </div>
      </div>
    </div>
  );
};
