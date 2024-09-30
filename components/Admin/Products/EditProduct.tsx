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
  types: {
    _id: string;
    title: string;
    slug: string;
  }[];
  material: string;
  fabricType?: string;
  careInstructions?: string;
  origin: string;
  brand: string;
  faqs: {
    _id: string;
    question: string;
    answer: string;
  }[];
  type: string;
  countryOfManufacture: string;
}

interface ColorOptionValue {
  title: string;
  color: string;
}
interface CategoryAndTypeValue {
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

    // if (!product)
    fetchProductBySlug();
  }, [slug]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>();
  const [oldPrice, setOldPrice] = useState<number>();
  const [quantityInStock, setQuantityInStock] = useState<number>();
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [colorOptions, setColorOptions] = useState<ColorOptionValue[]>([]);
  const [categories, setCategories] = useState<CategoryAndTypeValue[]>([]);
  const [types, setTypes] = useState<CategoryAndTypeValue[]>([]);
  const [material, setMaterial] = useState<string>("");
  const [fabricType, setFabricType] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [brand, setBrand] = useState<string>(
    "Chimanlal Suresh Kumar (CSK) Textiles"
  );
  const [countryOfManufacture, setCountryOfManufacture] = useState<string>("");
  const [faqs, setFaqs] = useState<Faq[]>([]);

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

    // Check for missing fields
    if (
      !title ||
      !description ||
      !images.length ||
      !mainImage ||
      !price ||
      !oldPrice ||
      !quantityInStock ||
      !availableSizes.length ||
      !colorOptions.length ||
      !categories.length ||
      !types.length ||
      !material ||
      !fabricType
    ) {
      return toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }

    const formData = new FormData();

    formData.append("mainImage", mainImage);
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("quantityInStock", quantityInStock.toString());
    formData.append("material", material);
    formData.append("fabricType", fabricType);
    formData.append("careInstructions", careInstructions || "");
    formData.append("origin", origin || "");
    formData.append("brand", brand || "");
    formData.append("countryOfManufacture", countryOfManufacture || "India");
    formData.append("availableSizes", JSON.stringify(availableSizes));
    formData.append("colorOptions", JSON.stringify(colorOptions));
    formData.append("categories", JSON.stringify(categories));
    formData.append("types", JSON.stringify(types));
    formData.append("faqs", JSON.stringify(faqs));

    try {
      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you can view the product."
          : "Please try again later...",
        variant: data.error ? "destructive" : "default",
      });
      router.back();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error creating product",
        description: "Please try again later...",
        variant: "destructive",
      });
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
              onClick={() => router.back()}
              className="bg-red-500 text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-white">
              Save Edit
            </Button>
          </div>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <div className="w-full h-[calc(100vh-140px)] flex gap-2">
            <div className="w-[60%] h-full bg-[#F8F8F8] br">
              {mainImage && (
                <Image
                  src={URL.createObjectURL(mainImage)}
                  alt="Main Image"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="w-[40%] h-full bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll">
              <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  className="w-full h-60 flex-center cursor-pointer select-none br active:scale-95 ease-in-out duration-300"
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
                      className="relative group w-full h-60 br"
                      onClick={() => handleSetMainImage(image)}
                    >
                      <button
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-1 right-2 text-xl text-red opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                      >
                        x
                      </button>
                      <Image
                        src={URL.createObjectURL(image)}
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
                <div className="w-fit h-fit py-1">
                  <label className="animate-slide-up block text-sm font-medium text-gray-700">
                    Discount -{" "}
                    {price && oldPrice && (
                      <ReactCountUp
                        amt={calculateDiscount(price, oldPrice)}
                        duration={1}
                        className="text-md text-green-500 font-medium"
                      >
                        % off
                      </ReactCountUp>
                    )}
                  </label>
                </div>
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
                    Available Sizes
                  </label>
                  <div className="flex space-x-2 mt-1">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
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
              {/* Country Of Manufacture */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Country Of Manufacture
                </label>
                <input
                  type="text"
                  value={countryOfManufacture}
                  onChange={(e) => setCountryOfManufacture(e.target.value)}
                  placeholder="Enter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                />
              </div>
              {/* Brand */}
              <div className="">
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

const ColorOption: React.FC<{
  colorOptions: ColorOptionValue[];
  setColorOptions: React.Dispatch<React.SetStateAction<ColorOptionValue[]>>;
}> = ({ colorOptions, setColorOptions }) => {
  const [newColor, setNewColor] = useState<{
    title: string;
    color: string;
    hex: string;
  }>({
    title: "",
    color: "#ffb433",
    hex: "#ffb433",
  });
  const [isAdding, setIsAdding] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddColor = () => {
    if (!newColor.title || !newColor.color) {
      setError("Title and color are required");
      return;
    }

    // checking for duplicates
    const exists = colorOptions.some(
      (option) =>
        option.title.toLowerCase() === newColor.title.toLowerCase() ||
        option.color === newColor.color
    );

    if (exists) {
      setError("Color title or color already exists.");
      return;
    }

    // adding the new color if it passes checks
    setColorOptions([
      ...colorOptions,
      { title: capitalizeString(newColor.title), color: newColor.color },
    ]);
    setNewColor({ title: "", color: "#ffb433", hex: "#ffb433" });
    setIsAdding(false);
    setError(null);
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = colorOptions.filter((_, i) => i !== index);
    setColorOptions(updatedColors);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    setNewColor((prev) => ({
      ...prev,
      color: colorValue,
      hex: colorValue, // Update hex input to reflect the color picker
    }));
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    setNewColor((prev) => ({
      ...prev,
      hex: hexValue,
      color: hexValue,
    }));
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}{" "}
      {/* Display error if exists */}
      <div className="flex flex-col gap-4">
        {colorOptions.map((option, index) => (
          <div key={index} className="flex-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 border border-gray-300 rounded-full overflow-hidden"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.title}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleRemoveColor(index)}
                className="w-fit h-fit p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
              >
                <BsTrash size={16} />
              </button>
            </div>
          </div>
        ))}

        {isAdding ? (
          <div className="flex-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choose Color
              </label>
              <input
                type="color"
                value={newColor.color}
                onChange={handleColorChange}
                className="mt-1 block w-12 h-12 cursor-pointer border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                HEX Color
              </label>
              <input
                type="text"
                value={newColor.hex}
                onChange={handleHexChange}
                className="mt-1 block w-28 p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                placeholder="Enter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color Title
              </label>
              <input
                type="text"
                value={newColor.title}
                onChange={(e) =>
                  setNewColor({ ...newColor, title: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                placeholder="Enter"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddColor}
                className="w-fit h-fit p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
              >
                <BsPlus size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
            >
              <BsPlus size={16} className="mr-1" />
              Add Color
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SelectCategoriesAndTypes: React.FC<{
  setCategories: React.Dispatch<React.SetStateAction<CategoryAndTypeValue[]>>;
  setTypes: React.Dispatch<React.SetStateAction<CategoryAndTypeValue[]>>;
}> = ({ setCategories, setTypes }) => {
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

      // Update selected types in parent
      setTypes(
        updatedSelections.map((sel) => ({
          title: sel.type.title,
          slug: sel.type.slug,
        }))
      );
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
    setTypes(
      updatedSelections.map((sel) => ({
        title: sel.type.title,
        slug: sel.type.slug,
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
      <span className="font-semibold">Categories and Types</span>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {categorySelections.map((selection, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
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
                Type
              </label>
              <div className="flex-between gap-2">
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

const FAQs: React.FC<{
  faqs: Faq[];
  setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
}> = ({ faqs, setFaqs }) => {
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [showFaqForm, setShowFaqForm] = useState(true);

  const handleFaqChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewFaq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
      setNewFaq({ question: "", answer: "" });
      setShowFaqForm(false);
    }
  };

  const handleAddMoreFaq = () => {
    setShowFaqForm(true);
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prevFaqs) => prevFaqs.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* FAQ Section */}
      <div className="col-span-2">
        <h3 className="text-lg font-medium text-gray-900">FAQ{"'"}s</h3>

        {/* If there are saved FAQs, show them in accordion format */}
        {faqs.length > 0 && (
          <Accordion type="single" collapsible className="w-full mt-1">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                  <div className="w-full flex justify-between items-center">
                    {faq.question || `FAQ Question ${index + 1}`}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFaq(index);
                      }}
                      className="ml-4 w-fit h-fit p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      <BsTrash size={16} />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#F8F8F8] text-sm p-4 rounded-md">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* If the FAQ form should be shown, render the input form */}
        {showFaqForm ? (
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-900">
              Write FAQ about the Product
            </h4>
            <div className="mt-2">
              <input
                type="text"
                name="question"
                value={newFaq.question}
                onChange={handleFaqChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                placeholder="Enter Question"
              />
            </div>
            <div className="mt-2">
              <textarea
                name="answer"
                value={newFaq.answer}
                onChange={handleFaqChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                placeholder="Describe response here..."
              ></textarea>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                onClick={() => setShowFaqForm(false)}
                className="w-fit p-2 text-white bg-red-500 rounded-md"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveFaq}
                className="w-fit p-2 text-white rounded-md"
              >
                Save FAQ
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            onClick={handleAddMoreFaq}
            className="mt-4 w-full p-2 text-white rounded-md"
          >
            <FaPlus className="mr-2" /> Add More FAQ
          </Button>
        )}
      </div>
    </>
  );
};
