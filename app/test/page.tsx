"use client";

import GridCards from "@/components/Grids/GridCards";
import ProductCategorySection from "@/components/HomePage/CategorySection/ProductCategorySection";
import { toast } from "@/hooks/use-toast";
import { generateSlug } from "@/lib/utils";
import React, { useState } from "react";

export default function TestPage() {
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const createProduct = async () => {
    try {
      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sampleProduct),
      });

      const data = await res.json();
      // console.log("res -> ", data);
      // ------------------     take the ref from here for response message       -----------------
      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you view the product"
          : "Please try again later...",
        variant: data.error && "destructive",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };

  const createOutfit = async () => {
    try {
      const res = await fetch("/api/products/create/create-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outfitData),
      });

      const data = await res.json();
      // console.log("res -> ", data);
      // ------------------     take the ref from here for response message       -----------------
      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you view the product"
          : "Please try again later...",
        variant: data.error && "destructive",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };

  const createCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categorySlug = generateSlug(category);
    try {
      // console.log(category, categorySlug, image);

      const res = await fetch("/api/products/create/create-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: category, slug: categorySlug, image }),
      });

      const data = await res.json();
      // console.log("res -> ", data);
      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you view the product"
          : "Please try again later...",
        variant: data.error && "destructive",
      });
    } catch (error) {
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
      console.error("Error creating category:", error);
    }
  };

  const showToast = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      variant: "destructive",
    });
  };
  return (
    <>
      <div className="p-10 space-x-5 space-y-4">
        <div className="">Testing - Create Product</div>
        <button
          onClick={createProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Product
        </button>
        <button
          onClick={createOutfit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Outfit
        </button>

        <form onSubmit={createCategory}>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-transparent border-b"
          />
          <input
            type="text"
            name="image"
            placeholder="Enter Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 bg-transparent border-b"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Category
          </button>
        </form>
        <button
          onClick={showToast}
          className="bg-blue-500 text-white p-2 rounded"
        >
          toast test
        </button>
      </div>
      <ProductCategorySection limit={1} />
      {/* <GridCards /> */}
    </>
  );
}

const sampleProduct = {
  images: [
    "https://www.textale.tech/cdn/shop/files/FRESH_Stain-Repel_Tee_Relaxed_Fit__textale_LR.jpg?v=1698207711&width=720",
    "https://static.wixstatic.com/media/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg/v1/fill/w_980,h_1225,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg",
    "https://heyupnow.com/cdn/shop/products/tex_tale_tee_600x.png?v=1679563774",
    "https://www.textale.tech/cdn/shop/files/Tee_1efc19c3-e426-46c5-a315-e27b9bd9c241.jpg?v=1714473708&width=1200",
    "https://www.textale.tech/cdn/shop/files/Tee_c4a29b07-e4e0-43b1-a20f-98a57d4dbbdb.jpg?v=1714473708&width=1200",
  ],
  mainImage:
    "https://www.textale.tech/cdn/shop/files/FRESH_Stain-Repel_Tee_Relaxed_Fit__textale_LR.jpg?v=1698207711&width=720",
  title: "Soft Cotton T-Shirt",
  slug: "soft-cotton-t-shirt",
  description: "A soft and comfortable cotton t-shirt perfect for casual wear.",
  oldPrice: 29.99,
  availableSizes: ["S", "M", "L", "XL"],
  colorOptions: ["White", "Grey", "Navy"],
  categories: [
    { title: "Clothing", slug: "clothing" },
    { title: "T-Shirts", slug: "t-shirts" },
    { title: "WFH Casual Wear", slug: "wfh-casual-wear" },
  ],
  material: "Cotton",
  fabricType: "Single Jersey",
  careInstructions: "Machine wash cold, tumble dry low",
  countryOfManufacture: "Bangladesh",
  origin: "Bangladesh",
  faqs: [
    {
      question: "Does this t-shirt shrink in the wash?",
      answer: "Minimal shrinkage if washed in cold water.",
    },
  ],
};

// price: 24.99,

const outfitData = {
  outfitTitle: "Casual Summer Vibes",
  outfitSlug: "casual-summer-vibes",
  outfitImage: "/images/3.png",
  productCollection: [
    { title: "Summer Hat", slug: "summer-hat", image: "/images/1.png" },
    { title: "Sunglasses", slug: "sunglasses", image: "/images/2.png" },
    { title: "Light T-shirt", slug: "light-tshirt", image: "/images/5.png" },
    { title: "Shorts", slug: "shorts", image: "/images/4.png" },
  ],
};
