"use client";

// const [product, setProduct] = useState({
//   title: "", 💹
//   description: "", 💹
//   price: 0, 💹
//   material: "", 💹
//   fabric_type: "", 💹
//   care_instructions: "", 💹
//   origin: "India", 💹
//   brand: "Chimanlal Suresh Kumar (CSK) Textiles", 💹
//   categories: [{ title: "", slug: "" }], 💹
//   type: [""], 💹
//   faqs: [{ question: "", answer: "" }], 💹
//   sale_price: 0, 💹
//   sale_price_effective_date: "", 💹
//   pattern: "", 💹
//   availability: "in_stock", 💹
//   availability_date: "", 💹
//   sell_on_google_quantity: 0,
//   product_highlights: [""], 💹
//   images_collection: [ 💹
//     {
//       image_link: "",
//       color: "",
//       color_name: "",
//       images: [""],
//       quantity: [{ size: "", quantity: 0 }],
//     },
//   ],
// });

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { calculateDiscount, reverseSlug } from "@/lib/utils";
import { CategoryCollectionValues } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactCountUp from "@/components/ui/ReactCountUp";
import {
  removeFile,
  uploadMultipleNewFiles,
} from "@/utils/actions/fileUpload.action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { LuImageOff, LuImagePlus } from "react-icons/lu";
import { HiOutlineSaveAs } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

interface CategoryValue {
  title: string;
  slug: string;
}
export interface Faq {
  question: string;
  answer: string;
}

interface ImageCollectionsValues {
  image_link: string;
  color: string;
  color_name: string;
  images: string[];
  quantity: { size: string; quantity: number }[];
}

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const NewAddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [sale_price, setSale_price] = useState<number>();
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const sale_price_effective_date = `${startDateTime}/${endDateTime}`;
  const [colorOptions, setColorOptions] = useState<ImageCollectionsValues[]>(
    []
  );
  const [categories, setCategories] = useState<CategoryValue[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [material, setMaterial] = useState<string>("");
  const [pattern, setPattern] = useState<string>("");
  const [availability, setAvailability] = useState<string>("in_stock");
  const availabilityOption = [
    "in_stock",
    "out_of_stock",
    "preorder",
    "backorder",
  ];
  const [availability_date, setAvailability_date] = useState<any>(new Date());
  const [fabricType, setFabricType] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [origin, setOrigin] = useState<string>("India");
  const [brand, setBrand] = useState<string>(
    "Chimanlal Suresh Kumar (CSK) Textiles"
  );
  const [product_highlights, setProduct_highlights] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fields = {
      title,
      description,
      price,
      sale_price,
      sale_price_effective_date,
      categories,
      type: types,
      material,
      pattern,
      fabric_type: fabricType,
      care_instructions: careInstructions,
      origin,
      availability,
      availability_date,
      brand,
      images_collection: colorOptions,
      product_highlights,
      faqs,
      sell_on_google_quantity: 1,
    };
    if (
      !title ||
      !description ||
      !price ||
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

      const res = await fetch("/api/products/create/new-create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          sale_price,
          sale_price_effective_date,
          categories,
          type: types,
          material,
          pattern,
          fabric_type: fabricType,
          care_instructions: careInstructions,
          origin,
          availability,
          availability_date,
          brand,
          images_collection: colorOptions,
          product_highlights,
          faqs,
          sell_on_google_quantity: 1,
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
              {/* Price and Sale Price (with date) */}
              <div
                className={`space-y-2 ${price && sale_price && "col-span-2"}`}
              >
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
                      Sale Price
                    </label>
                    <input
                      type="number"
                      value={sale_price}
                      onChange={(e) =>
                        setSale_price(e.target.value as unknown as number)
                      }
                      placeholder="Enter"
                      className="custom-number-input mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                    />
                  </div>
                  {price && sale_price && (
                    <>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Sale Price Effective Date -{" "}
                          <span className="text-green">Start</span>
                        </label>
                        <input
                          type="datetime-local"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                          className="mt-2 block w-full border border-zinc-300 bg-[#F8F8F8] dark:border-zinc-800 rounded-md p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[red]">
                          End
                        </label>
                        <input
                          type="datetime-local"
                          value={endDateTime}
                          onChange={(e) => setEndDateTime(e.target.value)}
                          className="mt-2 block w-full border border-zinc-300 bg-[#F8F8F8] dark:border-zinc-800 rounded-md p-2"
                        />
                      </div>
                    </>
                  )}
                </div>
                {/* Discount and Available Sizes */}
                {price && sale_price && (
                  <div className="w-full h-fit flex-between py-1 animate-slide-down">
                    <label className="animate-slide-up block text-sm font-medium text-gray-700">
                      Discount -{" "}
                      {price && sale_price && (
                        <ReactCountUp
                          amt={calculateDiscount(sale_price, price)}
                          duration={1}
                          className="text-md text-[#2CD396] font-medium"
                        >
                          % off
                        </ReactCountUp>
                      )}
                    </label>
                    <label className="animate-slide-up block text-sm font-medium text-gray-700">
                      {startDateTime &&
                        endDateTime &&
                        format(startDateTime, "PPP") +
                          " / " +
                          format(endDateTime, "PPP")}
                    </label>
                  </div>
                )}
              </div>

              {/* Material, Pattern & Fabric type */}
              <InputField
                label="Material"
                value={material}
                onChange={setMaterial}
                required
              />
              <InputField
                label="Pattern"
                value={pattern}
                onChange={setPattern}
              />
              <InputField
                label="Fabric Type"
                value={fabricType}
                onChange={setFabricType}
              />

              {/* Color Section */}
              <ImageCollections
                colorOptions={colorOptions}
                setColorOptions={setColorOptions}
              />

              {/* Availability & Date */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Availability<span className="text-[red]">*</span>
                  </label>
                  <select
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  >
                    {availabilityOption?.map((option, index) => (
                      <option value={option} key={index}>
                        {reverseSlug(option)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Availability Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full mt-1 px-2 py-5 bg-[#F8F8F8] border border-zinc-300 dark:border-zinc-800 rounded-md active:translate-y-0"
                      >
                        {availability_date !== new Date() ? (
                          format(availability_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={availability_date}
                        onSelect={setAvailability_date}
                        className="input-style"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/*Origin, Care Instructions */}
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
            <ProductHighlights
              product_highlights={product_highlights}
              setProduct_highlights={setProduct_highlights}
            />
            <FAQs faqs={faqs} setFaqs={setFaqs} />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewAddProduct;

interface ProductHighlightsProps {
  product_highlights: string[];
  setProduct_highlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductHighlights: React.FC<ProductHighlightsProps> = ({
  product_highlights,
  setProduct_highlights,
}) => {
  const [highlight, setHighlight] = useState("");

  const handleAddHighlight = () => {
    if (highlight.trim().length > 0 && highlight.length <= 60) {
      setProduct_highlights([...product_highlights, highlight]);
      setHighlight("");
    } else {
      alert("Highlight must be between 1 and 60 characters.");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    const newHighlights = product_highlights.filter((_, i) => i !== index);
    setProduct_highlights(newHighlights);
  };

  return (
    <div className="col-span-2 flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Product Highlights
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          placeholder="Enter product highlight"
          maxLength={60}
          className="border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8] p-2 flex-1"
        />
        <Button type="button" onClick={handleAddHighlight}>
          + Add
        </Button>
      </div>
      <ul className="list-disc list-inside">
        {product_highlights.map((h, index) => (
          <li key={index} className="flex-between text-gray-700">
            {h}
            <Button
              type="button"
              onClick={() => handleRemoveHighlight(index)}
              className="ml-2 bg-transparent text-red-500 hover:text-red-700"
              title="Remove highlight"
            >
              x
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ImageCollectionsProps {
  section?: string;
  colorOptions: ImageCollectionsValues[];
  setColorOptions: React.Dispatch<
    React.SetStateAction<ImageCollectionsValues[]>
  >;
}

export const ImageCollections: React.FC<ImageCollectionsProps> = ({
  section = "add",
  colorOptions,
  setColorOptions,
}) => {
  const [newColor, setNewColor] = useState<ImageCollectionsValues>({
    image_link: "",
    color: "#ffb433",
    color_name: "",
    images: [],
    quantity: [{ size: "S", quantity: 1 }],
  });
  //   console.log(colorOptions, newColor);

  const [isAdding, setIsAdding] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddColor = () => {
    const { color_name, color, images, quantity } = newColor;
    if (!color_name || !color || !images.length || !quantity.length) {
      setError("All Fields are required!");
      return;
    }

    const exists = colorOptions.some(
      (option) =>
        option.color_name.toLowerCase() === newColor.color_name.toLowerCase() ||
        option.color === newColor.color
    );

    if (exists) {
      setError("Color name or color is already in use.");
      return;
    }

    setColorOptions([...colorOptions, newColor]);
    setNewColor({
      image_link: "",
      color: "#ffb433",
      color_name: "",
      images: [],
      quantity: [{ size: "", quantity: 1 }],
    });
    setIsAdding(false);
    setError(null);
  };

  const handleAddImage = async () => {
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
          return alert("Images upload failed. Please try again later.");
        }

        setNewColor((prev) => ({
          ...prev,
          images: [...prev.images, ...imagesUrl],
          image_link: prev.image_link || imagesUrl[0],
        }));

        setIsUploading(false);
      }
    };

    input.click();
  };

  const handleRemoveImage = async (imageToRemove: string) => {
    const success = await removeFile(imageToRemove);

    if (success) {
      setNewColor((prev) => {
        const updatedImages = prev.images.filter(
          (image) => image !== imageToRemove
        );

        return {
          ...prev,
          images: updatedImages,
          image_link: updatedImages.length ? updatedImages[0] : "",
        };
      });
    } else {
      alert("Image removal failed. Please try again later.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ImageCollectionsValues
  ) => {
    setNewColor((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleQuantityChange = (
    index: number,
    field: "size" | "quantity",
    value: string | number
  ) => {
    const updatedQuantities = [...newColor.quantity];
    updatedQuantities[index] = {
      ...updatedQuantities[index],
      [field]: value,
    };
    setNewColor((prev) => ({ ...prev, quantity: updatedQuantities }));
  };

  const availableSizesForSelect = availableSizes.filter(
    (size) => !newColor.quantity.some((q) => q.size === size)
  );

  const addNewQuantity = () => {
    setNewColor((prev) => ({
      ...prev,
      quantity: [...prev.quantity, { size: "", quantity: 0 }],
    }));
  };

  return (
    <div className="col-span-2">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex flex-col gap-4">
        {colorOptions.map((option, index) => (
          <div key={index} className="flex-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 border border-gray-300 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.color_name}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setColorOptions(colorOptions.filter((_, i) => i !== index))
              }
              className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
            >
              <BsTrash size={16} />
            </button>
          </div>
        ))}

        {isAdding && (
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium">
                Choose Color
                {section === "add" && <span className="text-[red]">*</span>}
              </label>
              <div className="w-10 h-10 mt-2 drop-shadow-md border rounded-full overflow-hidden">
                <input
                  type="color"
                  value={newColor.color}
                  onChange={(e) => handleInputChange(e, "color")}
                  className="w-full h-full rounded-full scale-150"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                HEX Color
                {section === "add" && <span className="text-[red]">*</span>}
              </label>
              <input
                type="text"
                value={newColor.color}
                onChange={(e) => handleInputChange(e, "color")}
                className="mt-1 block w-28 p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                placeholder="Enter"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Color Name
                {section === "add" && <span className="text-[red]">*</span>}
              </label>
              <input
                type="text"
                value={newColor.color_name}
                onChange={(e) => handleInputChange(e, "color_name")}
                placeholder="Enter color name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Size and Quantity
              </label>
              {newColor.quantity.map((q, idx) => (
                <div key={idx} className="flex gap-2 mt-2">
                  <select
                    // value={q.size || ""}
                    // defaultValue={q.size}
                    onChange={(e) =>
                      handleQuantityChange(idx, "size", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  >
                    {/* <option>Select Size</option> */}
                    {availableSizesForSelect.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={q.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        idx,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    placeholder="Quantity"
                    className="p-2 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={addNewQuantity}
                disabled={
                  !newColor.quantity.at(-1)?.size ||
                  !newColor.quantity.at(-1)?.quantity
                }
                variant="link"
                className="mt-2 text-blue-500"
              >
                + Add Size
              </Button>
            </div>

            <div className="w-fit h-full mt-7 flex-center gap-4">
              <Button
                type="button"
                onClick={handleAddImage}
                disabled={isUploading}
                className="w-fit h-fit p-2 text-black cursor-pointer bg-blue-100 hover:bg-blue-200"
              >
                <LuImagePlus size={20} className="mr-1" />
                Add Images
                {isUploading && (
                  <BiLoaderAlt size={20} className="ml-1 animate-spin" />
                )}
              </Button>
              {newColor.images.length > 0 && (
                <div className="w-fit max-w-[10wh] flex gap-2 overflow-x-scroll overflow-y-hidden">
                  {newColor.images.map((img, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Image
                        src={img}
                        alt="Uploaded"
                        width={200}
                        height={200}
                        className="w-14 h-14 object-contain"
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(img)}
                        className="w-fit h-fit p-2 text-black bg-red-100 hover:bg-red-200"
                      >
                        <LuImageOff size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="button"
                onClick={handleAddColor}
                className="w-fit h-fit p-2 rounded text-black bg-yellow-100 hover:bg-yellow-200"
              >
                <HiOutlineSaveAs size={20} className="mr-1" />
                Save
              </Button>
            </div>
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
    (category) => !category.slug //|| !types[index]
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
                Type
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
