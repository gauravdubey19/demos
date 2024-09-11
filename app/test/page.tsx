"use client";

import React, { useState } from "react";

export default function TestPage() {
  const [responseMessage, setResponseMessage] = useState("");

  const createProduct = async () => {
    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sampleProduct),
      });

      const data = await res.json();
      // console.log("res -> ", data);
      setResponseMessage(data.message || "Failed to create product");
    } catch (error) {
      console.error("Error creating product:", error);
      setResponseMessage("Error creating product");
    }
  };

  return (
    <div className="p-10">
      <div className="">Testing - Create Product</div>
      <button
        onClick={createProduct}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Product
      </button>
      <div className="mt-4">Response: {responseMessage}</div>
    </div>
  );
}

const sampleProduct = {
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKt17ghf-_Ch-PAPRYR-HX4sFAMeNms-wJ_teltLQVqpODxd071yo2HXwdC_lHmMtxZs&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8q_D6ppo485V3YbtYs9bNfeP7rTHM4mT_ZWxFJhhV3KV2CfChh5_ma6ftZ_0FwsCNCSE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK_kD1yGyzjoWg14HP9xPzpw1xuPu_wdqpnmFpKWIqizOt04f2aDUP3dh9mrylfi0fN40&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YU05IKMVty8nAoyG7JmTy37wh_V0d4zzAP2RMixyFf0FwZe--sqpsq5UFxBTDk4_i0A&usqp=CAU",
  ],
  mainImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKt17ghf-_Ch-PAPRYR-HX4sFAMeNms-wJ_teltLQVqpODxd071yo2HXwdC_lHmMtxZs&usqp=CAU",
  title: "Floral Summer Dress",
  slug: "floral-summer-dress",
  description:
    "This floral summer dress is light and airy, perfect for warm days out.",
  price: 59.99,
  oldPrice: 69.99,
  discount: 14,
  ratings: 4.7,
  availableSizes: ["S", "M", "L"],
  colorOptions: ["Yellow", "Pink", "White"],
  categories: ["Clothing", "Dresses", "Women's Fashion"],
  material: "Cotton",
  fabricType: "Woven",
  careInstructions: "Machine wash cold, tumble dry low",
  countryOfManufacture: "India",
  origin: "India",
  faqs: [
    {
      question: "Is it see-through?",
      answer: "No, it has a lining to prevent transparency.",
    },
  ],
  reviews: [
    {
      userName: "Lisa Daniels",
      review: "Very comfortable and the design is beautiful!",
    },
  ],
};
