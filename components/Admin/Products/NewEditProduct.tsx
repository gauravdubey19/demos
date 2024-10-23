"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { calculateDiscount, reverseSlug } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  CategoryValue,
  Faq,
  FAQs,
  ImageCollections,
  ImageCollectionsValues,
  InputField,
  ProductHighlights,
  SelectCategoriesAndTypes,
  TextareaField,
} from "./NewAddProduct";
import ReactCountUp from "@/components/ui/ReactCountUp";
import Loader from "@/components/ui/Loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export interface ProductDetailValues {
  _id: string;
  title: string;
  description: string;
  price: number;
  material: string;
  fabric_type: string;
  care_instructions: string;
  origin: string;
  brand: string;
  categories: [{ title: string; slug: string }];
  type: string[];
  faqs: [{ question: string; answer: string }];
  sale_price: number;
  sale_price_effective_date: string;
  pattern: string;
  availability: string;
  availability_date: string;
  sell_on_google_quantity: number;
  product_highlights: string[];
  images_collection: [
    {
      image_link: string;
      color: string;
      color_name: string;
      images: string[];
      quantity: [{ size: string; quantity: number }];
    }
  ];
}

const NewEditProduct: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetailValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [changedFields, setChangedFields] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [sale_price, setSale_price] = useState<number | undefined>();
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  console.log(startDateTime, endDateTime);
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
  const [availability_date, setAvailability_date] = useState<Date>(new Date());
  const [fabricType, setFabricType] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [origin, setOrigin] = useState<string>("India");
  const [brand, setBrand] = useState<string>(
    "Chimanlal Suresh Kumar (CSK) Textiles"
  );
  const [product_highlights, setProduct_highlights] = useState<string[]>([]);
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
        toast({
          title: "Error fetching product",
          description: "Please try again later...",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (!product) fetchProductBySlug();
    else {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setSale_price(product.sale_price);
      setStartDateTime(product.sale_price_effective_date.split("/")[0]);
      setEndDateTime(product.sale_price_effective_date.split("/")[1]);
      setPattern(product.pattern);
      setAvailability(product.availability);
      setAvailability_date(new Date(product.availability_date));
      setProduct_highlights(product.product_highlights);
      setColorOptions(product.images_collection);
      setCategories(product.categories);
      setTypes(product.type);
      setMaterial(product.material);
      setFabricType(product.fabric_type);
      setCareInstructions(product.care_instructions);
      setOrigin(product.origin);
      setBrand(product.brand);
      setFaqs(product.faqs);
    }
  }, [product, slug]);

  useEffect(() => {
    const handleFieldChange = () => {
      const hasChanges =
        title !== product?.title ||
        description !== product?.description ||
        price !== product?.price ||
        sale_price !== product?.sale_price ||
        startDateTime !== product?.sale_price_effective_date.split("/")[0] ||
        endDateTime !== product?.sale_price_effective_date.split("/")[1] ||
        JSON.stringify(categories) !== JSON.stringify(product?.categories) ||
        JSON.stringify(types) !== JSON.stringify(product?.type) ||
        material !== product?.material ||
        pattern !== product?.pattern ||
        fabricType !== product?.fabric_type ||
        careInstructions !== product?.care_instructions ||
        origin !== product?.origin ||
        availability !== product?.availability ||
        availability_date.toISOString() !==
          new Date(product?.availability_date).toISOString() ||
        brand !== product?.brand ||
        JSON.stringify(product_highlights) !==
          JSON.stringify(product?.product_highlights) ||
        JSON.stringify(colorOptions) !==
          JSON.stringify(product?.images_collection) ||
        JSON.stringify(faqs) !== JSON.stringify(product?.faqs);

      setChangedFields(hasChanges);
    };
    handleFieldChange();
  }, [
    title,
    description,
    price,
    sale_price,
    startDateTime,
    endDateTime,
    categories,
    types,
    material,
    pattern,
    fabricType,
    careInstructions,
    origin,
    availability,
    availability_date,
    brand,
    product_highlights,
    colorOptions,
    faqs,
    product,
  ]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quantityArr = colorOptions.flatMap((collection) =>
      collection.quantity.map((q) => q.quantity)
    );

    const total_quantity = quantityArr.reduce(
      (sum, quantity) => sum + quantity,
      0
    );

    setLoadingSave(true);

    try {
      const res = await fetch(
        `/api/products/update/admin/edit-product/${product?._id}`,
        {
          method: "PUT",
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
            sell_on_google_quantity: total_quantity,
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
        router.push("/admin/all-products");
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
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
            <>
              {/* Product Title and Description */}
              <InputField label="Title" value={title} onChange={setTitle} />
              <TextareaField
                label="Description"
                value={description}
                onChange={setDescription}
              />
              {/* Price and Sale Price (with date) */}
              <div
                className={`space-y-2 ${
                  price && product?.sale_price && "col-span-2"
                }`}
              >
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

              {/* image collection Section */}
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
                        onSelect={(date: Date | undefined) =>
                          date && setAvailability_date(date)
                        }
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

export default NewEditProduct;
