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
import {
  removeFile,
  uploadMultipleNewFiles,
  uploadNewFile,
} from "@/utils/actions/fileUpload.action";

interface ColorOptionValue {
  title: string;
  color: string;
}
interface CategoryValue {
  title: string;
  slug: string;
}
export interface Faq {
  question: string;
  answer: string;
}

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
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
        if (!mainImage) {
          setMainImage(imagesUrl[0]);
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

        if (mainImage === imageToRemove && updatedImages.length > 0) {
          setMainImage(updatedImages[0]);
        } else if (updatedImages.length === 0) {
          setMainImage("");
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
    setLoading(true);
    const fields = {
      mainImage,
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
    };
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
      console.log("fields", fields);

      setLoading(false);
      return toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }

    try {
      console.log("fields", fields);
      // const mainImageFormData = new FormData();
      // mainImageFormData.append("file", mainImage);

      // const mainImageUrl = await uploadNewFile(mainImageFormData);

      // if (!mainImageUrl) {
      //   toast({
      //     title: "Main image upload failed.",
      //     description: "Please try again later...",
      //     variant: "destructive",
      //   });
      //   setLoading(false);
      //   return;
      // }

      // const imagesFormData = new FormData();
      // images.forEach((image) => {
      //   imagesFormData.append("files", image);
      // });

      // const imagesUrl = await uploadMultipleNewFiles(imagesFormData);
      // console.log(imagesUrl);

      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainImage,
          images,
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
      });

      const data = await res.json();

      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you can view the product."
          : "Please try again later...",
        variant: data.error ? "destructive" : "default",
      });

      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        router.push("/admin/all-products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error creating product",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <Button
              type="submit"
              disabled={loading || success}
              className="text-white"
            >
              {loading ? "Saving..." : success ? "Saved" : "Save"}
            </Button>
          </div>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <div className="w-full h-[calc(100vh-140px)] flex gap-2">
            <div className="w-[60%] h-full overflow-hidden">
              <h4>
                Main Image<span className="text-[red]">*</span>
              </h4>
              <div className="relative w-full h-[95%] bg-[#F8F8F8] br flex-center">
                {mainImage ? (
                  <Image
                    src={mainImage}
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
                        onClick={() => setMainImage(image)}
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          title="Remove"
                          className="absolute top-1 right-2 z-10 text-xl text-[red] opacity-0 group-hover:opacity-100 ease-in-out duration-300"
                        >
                          x
                        </button>
                        {image === mainImage && (
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
                  <div className="w-fit h-fit py-1 animate-slide-down">
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
              {/* Country Of Manufacture */}
              {/* <div className="">
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
              </div> */}
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
                setCategories={setCategories}
                types={types}
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

export default AddProduct;

export const ColorOption: React.FC<{
  section?: string;
  colorOptions: ColorOptionValue[];
  setColorOptions: React.Dispatch<React.SetStateAction<ColorOptionValue[]>>;
}> = ({ section = "add", colorOptions, setColorOptions }) => {
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
                type="button"
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
                {section === "add" && <span className="text-[red]">*</span>}
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
                {section === "add" && <span className="text-[red]">*</span>}
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
                {section === "add" && <span className="text-[red]">*</span>}
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
                type="button"
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
              type="button"
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

export const FAQs: React.FC<{
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
                      type="button"
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

interface SelectCategoriesAndTypesProps {
  section?: string;
  categories: CategoryValue[];
  types: string[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryValue[]>>;
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectCategoriesAndTypes: React.FC<
  SelectCategoriesAndTypesProps
> = ({ section = "add", setCategories, setTypes, categories, types }) => {
  const [categoriesCollection, setCategoriesCollection] = useState<
    CategoryCollectionValues[]
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
      const updatedCategories = [...categories];
      updatedCategories[index] = {
        title: selectedCategory.title,
        slug: selectedCategory.slug,
      };

      setCategories(updatedCategories);

      // reseting the corresponding type
      const updatedTypes = [...types];
      updatedTypes[index] = ""; // reseting type for selected category
      setTypes(updatedTypes);
    }
  };

  const handleTypeChange = (index: number, slug: string) => {
    if (!slug) return;

    setTypes((prevTypes) => {
      const updatedTypes = [...prevTypes];
      if (!updatedTypes.includes(slug)) {
        updatedTypes[index] = slug; // setting the type for the respective index
      }
      return updatedTypes;
    });
  };

  const handleAddMoreCategory = () => {
    setCategories([...categories, { title: "", slug: "" }]);
    setTypes([...types, ""]);
  };

  const handleRemoveSelection = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    const updatedTypes = types.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    setTypes(updatedTypes);
  };

  const availableCategories = categoriesCollection.filter(
    (category) =>
      !categories.some(
        (selectedCategory) => selectedCategory.slug === category.slug
      )
  );

  const isAddButtonDisabled = categories.some(
    (category, index) => !category.slug || !types[index]
  );

  if (categoriesCollection.length === 0)
    return <h2 className="text-primary">Loading categories...</h2>;

  // console.log(categories, types);

  return (
    <div className="col-span-2 grid grid-cols-1 gap-2">
      <div className="font-semibold">Categories and Types</div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
                {section === "add" && <span className="text-[red]">*</span>}
              </label>
              {category.slug ? (
                <div className="mt-1 p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                  {category.title}
                </div>
              ) : (
                <select
                  value={category.slug || ""}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                >
                  <option>Select Category</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type{section === "add" && <span className="text-[red]">*</span>}
              </label>
              <div className="flex gap-2">
                {types[index] ? (
                  <div className="mt-1 w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                    {
                      categoriesCollection
                        .find((cat) => cat.slug === category.slug)
                        ?.types.find((type) => type.slug === types[index])
                        ?.title
                    }
                  </div>
                ) : (
                  <select
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                    disabled={!category.slug}
                    className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  >
                    {!category.slug ? (
                      <option value="">Select Category first</option>
                    ) : (
                      <option value="">Select Type</option>
                    )}
                    {categoriesCollection
                      .find((cat) => cat.slug === categories[index]?.slug)
                      ?.types.map((type) => (
                        <option key={type.slug} value={type.slug}>
                          {type.title}
                        </option>
                      ))}
                  </select>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSelection(index)}
                  className="w-fit h-fit p-2 mt-2.5 rounded bg-red-100 hover:bg-red-200 text-red-600"
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

// const SelectCategoriesAndTypes: React.FC<{
//   setCategories: React.Dispatch<React.SetStateAction<CategoryValue[]>>;
//   setTypes: React.Dispatch<React.SetStateAction<string[]>>;
// }> = ({ setCategories, setTypes }) => {
//   const [categoriesCollection, setCategoriesCollection] = useState<
//     CategoryCollectionValues[]
//   >([]);
//   const [categorySelections, setCategorySelections] = useState<
//     { category: CategoryCollectionValues; type: Type }[]
//   >([]);

//   useEffect(() => {
//     const fetchCategoriesCollection = async () => {
//       try {
//         const res = await fetch(`/api/products/read/get-categories`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data = await res.json();
//         setCategoriesCollection(data.categories as CategoryCollectionValues[]);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategoriesCollection();
//   }, []);

//   const handleCategoryChange = (index: number, slug: string) => {
//     const selectedCategory = categoriesCollection.find(
//       (category) => category.slug === slug
//     );
//     if (selectedCategory) {
//       const updatedSelections = [...categorySelections];
//       updatedSelections[index] = {
//         category: selectedCategory,
//         type: updatedSelections[index]?.type || { title: "", slug: "" },
//       };
//       setCategorySelections(updatedSelections);

//       // Update selected categories in parent
//       setCategories(
//         updatedSelections.map((sel) => ({
//           title: sel.category.title,
//           slug: sel.category.slug,
//         }))
//       );
//     }
//   };

//   const handleTypeChange = (index: number, slug: string) => {
//     const selectedType = categorySelections[index].category.types.find(
//       (type) => type.slug === slug
//     );
//     if (selectedType) {
//       const updatedSelections = [...categorySelections];
//       updatedSelections[index].type = selectedType;
//       setCategorySelections(updatedSelections);

//       // Update selected types in parent
//       setTypes(updatedSelections.map((sel) => sel.type.slug));
//     }
//   };

//   const handleAddMoreCategory = () => {
//     setCategorySelections([
//       ...categorySelections,
//       {
//         category: {
//           _id: "",
//           image: "",
//           title: "",
//           slug: "",
//           description: "",
//           types: [],
//           createdAt: "",
//         },
//         type: { title: "", slug: "" },
//       },
//     ]);
//   };

//   const handleRemoveSelection = (index: number) => {
//     const updatedSelections = categorySelections.filter((_, i) => i !== index);
//     setCategorySelections(updatedSelections);

//     // Update parent state after removal
//     setCategories(
//       updatedSelections.map((sel) => ({
//         title: sel.category.title,
//         slug: sel.category.slug,
//       }))
//     );
//     setTypes(updatedSelections.map((sel) => sel.type.slug));
//   };

//   const availableCategories = categoriesCollection.filter(
//     (category) =>
//       !categorySelections.some(
//         (selection) => selection.category.slug === category.slug
//       )
//   );

//   const isAddButtonDisabled = categorySelections.some(
//     (selection) => !selection.category.slug || !selection.type.slug
//   );

//   if (categoriesCollection.length === 0)
//     return <h2 className="text-primary">Loading categories...</h2>;

//   return (
//     <div className="col-span-2 grid grid-cols-1 gap-2">
//       <div className="font-semibold">
//         Categories and Types
//         {section === "add" && <span className="text-[red]">*</span>}
//       </div>
//       <div className="col-span-2 grid grid-cols-2 gap-4">
//         {categorySelections.map((selection, index) => (
//           <div key={index} className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//                 {section === "add" && <span className="text-[red]">*</span>}
//               </label>
//               {selection.category.slug ? (
//                 <div className="mt-1 p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
//                   {selection.category.title}
//                 </div>
//               ) : (
//                 <select
//                   value={selection.category.slug || ""}
//                   onChange={(e) => handleCategoryChange(index, e.target.value)}
//                   className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
//                 >
//                   <option>Select Category</option>
//                   {availableCategories.map((category) => (
//                     <option key={category.slug} value={category.slug}>
//                       {category.title}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Type{section === "add" && <span className="text-[red]">*</span>}
//               </label>
//               <div className="flex-between gap-2">
//                 {selection.type.slug ? (
//                   <div className="mt-1 w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
//                     {selection.type.title}
//                   </div>
//                 ) : (
//                   <select
//                     value={selection.type.slug || ""}
//                     onChange={(e) => handleTypeChange(index, e.target.value)}
//                     className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
//                   >
//                     <option>Select Type</option>
//                     {selection.category.types.map((type) => (
//                       <option key={type.slug} value={type.slug}>
//                         {type.title}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSelection(index)}
//                   className="w-fit h-fit p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
//                 >
//                   <BsTrash size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="col-span-2">
//           <Button
//             type="button"
//             onClick={handleAddMoreCategory}
//             disabled={isAddButtonDisabled}
//             className="w-full py-2 mt-2 text-white"
//           >
//             Add More Category
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
