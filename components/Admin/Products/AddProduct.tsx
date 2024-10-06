"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { calculateDiscount, capitalizeString } from "@/lib/utils";
import { CategoryCollectionValues } from "@/lib/types";
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
} from "@/utils/actions/fileUpload.action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [image_link, setImage_link] = useState<string>("");
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
        setIsUploading(true);
        const imagesFormData = new FormData();
        files.forEach((file) => {
          imagesFormData.append("files", file);
        });

        const imagesUrl = (await uploadMultipleNewFiles(
          imagesFormData
        )) as string[];

        if (!imagesUrl.length) {
          setIsUploading(false);
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
        setIsUploading(false);
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
    };
    if (
      !title ||
      !description ||
      !images.length ||
      !image_link ||
      !price ||
      !quantityInStock ||
      !availableSizes.length ||
      !colorOptions.length ||
      !categories.length ||
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
      // console.log("fields", fields);

      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      <form
        onSubmit={handleSubmit}
        className="w-full h-full select-none overflow-hidden"
      >
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
                {image_link ? (
                  <Image
                    src={image_link}
                    alt="Main Image"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain animate-slide-down"
                  />
                ) : !isUploading ? (
                  <div
                    onClick={handleAddImage}
                    className="cursor-pointer select-none group"
                  >
                    <Image
                      src="/logo.png"
                      alt="Main Image"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain group-hover:scale-110 ease-in-out duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 flex-center text-primary animate-slide-down">
                      Choose a Image
                    </div>
                  </div>
                ) : (
                  <div className="cursor-not-allowed select-none">
                    <Image
                      src="/logo.png"
                      alt="Main Image"
                      width={800}
                      height={800}
                      className="w-full h-full object-contain animate-pulse"
                    />
                    <div className="absolute inset-0 bg-gray-300/70 animate-pulse" />
                    <div className="absolute inset-0 flex-center text-black">
                      Uploading Images...
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[40%] h-full overflow-hidden">
              <h4>
                Images<span className="text-[red]">*</span>
              </h4>
              <div className="w-full h-[95%] bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll">
                <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-2">
                  {!isUploading ? (
                    <div
                      className="w-full h-56 flex-center cursor-pointer select-none group br active:scale-95 ease-in-out duration-300"
                      onClick={handleAddImage}
                    >
                      <div className="w-12 h-12 rounded-full flex-center bg-primary text-2xl md:text-4xl lg:text-5xl text-white p-4 group-hover:scale-110 ease-in-out duration-300">
                        +
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 flex-center cursor-not-allowed select-none animate-pulse bg-gray-300">
                      Uploading Images...
                    </div>
                  )}
                  {/* <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_Preset}
                    options={{ multiple: true, maxFiles: 5 }}
                    onSuccess={(result, { widget }) => {
                      const info = result?.info;
                      console.log(info);

                      const urls: string[] = Array.isArray(info)
                        ? info.map(
                            (file: { secure_url: string }) =>
                              file.secure_url || ""
                          )
                        : [];

                      if (urls.length > 0) {
                        setImages((prevUrls) => [...prevUrls, ...urls]);
                        if (!image_link) {
                          setImage_link(urls[0]);
                        }
                      }
                    }}
                    onQueuesEnd={(result, { widget }) => {
                      widget.close();
                      setIsUploading(false);
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        setImages([]);
                        open();
                        setIsUploading(true);
                      }
                      return (
                        <>
                          {!isUploading ? (
                            <button
                              type="button"
                              onClick={handleOnClick}
                              className="w-full h-56 flex-center cursor-pointer select-none group br active:scale-95 ease-in-out duration-300"
                            >
                              <div className="w-12 h-12 rounded-full flex-center bg-primary text-2xl md:text-4xl lg:text-5xl text-white p-4 group-hover:scale-110 ease-in-out duration-300">
                                +
                              </div>
                            </button>
                          ) : (
                            <div className="w-full h-56 flex-center cursor-not-allowed select-none animate-pulse bg-gray-300">
                              Uploading Images...
                            </div>
                          )}
                        </>
                      );
                    }}
                  </CldUploadWidget> */}
                  {images
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
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
            <>
              {/* Product Title and Description */}
              <InputField
                label="Title"
                value={title}
                onChange={setTitle}
                required
              />
              <TextareaField
                label="Description"
                value={description}
                onChange={setDescription}
                required
              />
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
              <InputField
                label="Material"
                value={material}
                onChange={setMaterial}
                required
              />
              {/* Color Section */}
              <ColorOption
                colorOptions={colorOptions}
                setColorOptions={setColorOptions}
              />

              {/* Available Sizes Section & Quantity In Stock */}
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
              <InputField
                label="Fabric Type"
                value={fabricType}
                onChange={setFabricType}
              />
              <InputField label="Origin" value={origin} onChange={setOrigin} />
              {/* Brand */}
              <InputField
                label="Brand"
                full
                value={brand}
                onChange={setBrand}
              />
              <SelectCategoriesAndTypes
                categories={categories}
                setCategories={setCategories}
                types={types}
                setTypes={setTypes}
              />
              <TextareaField
                label="Care Instructions"
                full
                value={careInstructions}
                onChange={setCareInstructions}
              />
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

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  full?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  required,
  full,
  className = "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]",
}) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-[red]">*</span>}
    </label>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder="Enter"
      className={className}
    />
  </div>
);

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  full?: boolean;
  className?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  required,
  full,
  className = "mt-1 block w-full min-h-[40px] p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]",
}) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-[red]">*</span>}
    </label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder="Enter"
      className={className}
    />
  </div>
);
