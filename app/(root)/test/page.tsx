"use client";

import GridCards from "@/components/HomePage/Grids/GridCards";
import ProductCategorySection from "@/components/HomePage/CategorySection/ProductCategorySection";
import { toast } from "@/hooks/use-toast";
import { generateSlug } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ImageMagnify from "@/components/ui/ImageMagnify";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string>("");

  const createProduct = async () => {
    try {
      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(sampleProduct),
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
    const categoryTypeSlug = generateSlug(categoryType);
    try {
      console.log(
        category,
        categorySlug,
        image,
        categoryType,
        categoryTypeSlug
      );

      // const res = await fetch("/api/products/create/create-category", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title: category,
      //     slug: categorySlug,
      //     image,
      //     typeTitle: categoryType,
      //     typeSlug: categoryTypeSlug,
      //   }),
      // });
      // const data = await res.json();
      // toast({
      //   title: data.message || data.error,
      //   description: data.message
      //     ? "Category created successfully!"
      //     : "Please try again later...",
      //   variant: data.error && "destructive",
      // });
    } catch (error) {
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="mt-[60px] w-full h-screen bg-zinc-200 p-10">
      {/* un-comment this below for creating sample data */}
      {/* <CreateCategories /> */}
      {/* <CreateProducts /> */}
    </div>
  );
}

const CreateCategories = () => {
  const sendCategories = async () => {
    try {
      const res = await fetch("/api/products/create/create-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoriesData),
      });

      const data = await res.json();
      toast({
        title: data.message || data.error,
        description: data.message || "Categories created successfully!",
        variant: data.error ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Error sending categories:", error);
      toast({
        title: "Error sending categories",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1>Create Men Textile Categories</h1>
      <Button onClick={sendCategories}>Send Categories</Button>
    </div>
  );
};

const CreateProducts = () => {
  const sendProducts = async () => {
    try {
      const res = await fetch("/api/products/create/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sampleProducts),
      });

      const data = await res.json();
      toast({
        title: data.message || data.error,
        description: data.message || "Products created successfully!",
        variant: data.error ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Error sending Products:", error);
      toast({
        title: "Error sending Products",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1>Create Men Textile Products</h1>
      <Button onClick={sendProducts}>Send Products</Button>
    </div>
  );
};

const sampleProducts = [
  {
    title: "Cotton Kurta",
    slug: "cotton-kurta",
    description: "A comfortable cotton kurta perfect for casual outings.",
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
      "https://manyavar.scene7.com/is/image/manyavar/I03_IMG_0020+copy+copy_09-10-2021-06-36:650x900",
      "https://ramrajcotton.in/cdn/shop/products/1_aef60397-cbc9-4dee-903b-8d3ed0f9c1e3.jpg?v=1662636401",
      "https://lablerahulsingh.com/wp-content/uploads/2023/09/LONG-KURTA-MEN-64.jpeg",
    ],
    mainImage:
      "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
    price: 29.99,
    oldPrice: 34.99,
    availableSizes: ["S", "M", "L", "XL"],
    colorOptions: [
      { title: "Blue", color: "#0000FF" },
      { title: "White", color: "#FFFFFF" },
    ],
    categories: [
      { title: "Kurta", slug: "kurta" },
      { title: "Sherwani", slug: "sherwani" },
    ],
    type: ["cotton-kurta", "designer-sherwani"],
    material: "Cotton",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 50,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      { question: "Is this kurta machine washable?", answer: "Yes, it is." },
      { question: "What sizes are available?", answer: "S, M, L, XL." },
    ],
  },
  {
    title: "Silk Sherwani",
    slug: "silk-sherwani",
    description: "An elegant silk sherwani for weddings and formal events.",
    images: [
      "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
      "https://vastramay.com/cdn/shop/products/VASMIW105BGnK169RGnPANT002RG_1.jpg?v=1677134434",
      "https://vastramay.com/cdn/shop/products/VASMIW105GNnK169RGnPANT002RG_1.jpg?v=1677134549",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNh2jHXhE-ziLt7Ud6QIXq21KrJD2q494AwNliRuXS3A1EttwL-sD9Dz1Vs-oDwE8f3a0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcT3zGVPQ5qD82aIOvkUmjHIp8F3iQ96ffIehjFcAkxwo3Rol-m6PONC6LVIGBj3YLzE&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCp6FTf_TnqHO9kp6kJzVmjDIvvviNbTnKi75j3UazRgFreY-1c5co4R8eHDYqTRTq_N8&usqp=CAU",
    ],
    mainImage:
      "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
    price: 199.99,
    oldPrice: 249.99,
    availableSizes: ["M", "L", "XL"],
    colorOptions: [
      { title: "Gold", color: "#FFD700" },
      { title: "Red", color: "#FF0000" },
    ],
    categories: [
      { title: "Sherwani", slug: "sherwani" },
      { title: "Pathani Suit", slug: "pathani-suit" },
    ],
    type: ["designer-sherwani", "designer-pathani"],
    material: "Silk",
    fabricType: "Luxury",
    careInstructions: "Dry clean only.",
    origin: "India",
    quantityInStock: 20,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Can I get it custom fitted?",
        answer: "Yes, we offer customization.",
      },
      {
        question: "Is it suitable for summer weddings?",
        answer: "Yes, it's lightweight.",
      },
    ],
  },
  {
    title: "Silk Dhoti",
    slug: "silk-dhoti",
    description: "Traditional silk dhoti for festive occasions.",
    images: [
      "https://paithanistore.com/cdn/shop/collections/Men-Dhoti-Paithanistore-9454.jpg?v=1710223989",
      "https://i.etsystatic.com/19394471/r/il/b3d159/4060423971/il_570xN.4060423971_cy2t.jpg",
      "https://img.perniaspopupshop.com/catalog/product/d/m/DMMC012123_1.jpg?impolicy=detailimageprod",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaNoQ11eOV83k8WGr18mcLoKzFbrWj0-n_gzH-zObAWPQzEukNo-zGHOSQcGIzjqsM8c&usqp=CAU",
    ],
    mainImage:
      "https://paithanistore.com/cdn/shop/collections/Men-Dhoti-Paithanistore-9454.jpg?v=1710223989",
    price: 49.99,
    oldPrice: 59.99,
    availableSizes: ["M", "L"],
    colorOptions: [
      { title: "Cream", color: "#FFFDD0" },
      { title: "Maroon", color: "#800000" },
    ],
    categories: [{ title: "Dhoti", slug: "dhoti" }],
    type: ["silk-dhoti", "cotton-dhoti"],
    material: "Silk",
    fabricType: "Luxury",
    careInstructions: "Dry clean only.",
    origin: "India",
    quantityInStock: 30,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "What occasions is this suitable for?",
        answer: "Festivals and weddings.",
      },
      {
        question: "Is it comfortable to wear?",
        answer: "Yes, it's designed for comfort.",
      },
    ],
  },
  {
    title: "Cotton Pajama",
    slug: "cotton-pajama",
    description: "Soft and breathable cotton pajama for daily wear.",
    images: [
      "https://m.media-amazon.com/images/I/31aDoXnUcKS._AC_UY1100_.jpg",
      "https://m.media-amazon.com/images/I/41BukCw6jbL._AC_UY1100_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/41l2YRF+6VS._AC_SR462,693_.jpg",
    ],
    mainImage:
      "https://m.media-amazon.com/images/I/31aDoXnUcKS._AC_UY1100_.jpg",
    price: 19.99,
    oldPrice: 24.99,
    availableSizes: ["S", "M", "L"],
    colorOptions: [
      { title: "Gray", color: "#808080" },
      { title: "Black", color: "#000000" },
    ],
    categories: [{ title: "Pajama", slug: "pajama" }],
    type: ["cotton-pajama"],
    material: "Cotton",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 100,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Are these pajamas suitable for sleeping?",
        answer: "Yes, they're very comfortable.",
      },
      {
        question: "Do they shrink after washing?",
        answer: "No, we use pre-shrunk fabric.",
      },
    ],
  },
  {
    title: "Denim Jacket",
    slug: "denim-jacket",
    description: "Stylish denim jacket for a casual look.",
    images: [
      "https://www.psychobunny.com/cdn/shop/products/B6J741X1CO-MTS_1.jpg?v=1694617082",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTF2TnB68-o7gc2Gv5g_qxl2Qg29r9tus4RUJczlW1Vhx8kSNSWqbtRA09lvdkSx1_y1s&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDc2yyOrwdBaWw14EZLtXTmvRA00Wji6Ex1_KxVlYNBphH-0SAP9nPsDprPf6aCgzImY&usqp=CAU",
      "https://www.bootlegger.com/dw/image/v2/BKBQ_PRD/on/demandware.static/-/Sites-bootlegger-master/default/dw9d6ea27f/images/bootlegger/men/general_apparel/1016723340130_400_2.jpg?sw=864&sh=1152&sm=fit&q=88",
    ],
    mainImage:
      "https://www.psychobunny.com/cdn/shop/products/B6J741X1CO-MTS_1.jpg?v=1694617082",
    price: 59.99,
    oldPrice: 69.99,
    availableSizes: ["M", "L", "XL"],
    colorOptions: [
      { title: "Blue", color: "#0000FF" },
      { title: "Black", color: "#000000" },
    ],
    categories: [{ title: "Jacket", slug: "jacket" }],
    type: ["denim-jacket"],
    material: "Denim",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 40,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Is it suitable for winter?",
        answer: "Yes, it's a great layering piece.",
      },
      { question: "How should I wash it?", answer: "Machine wash inside out." },
    ],
  },
  {
    title: "Graphic Shirt",
    slug: "graphic-shirt",
    description: "Trendy graphic shirt for casual outings.",
    images: [
      "https://assets.mediamodifier.com/mockups/64c3fb78b5c1b14f5bd1597e/asian-male-model-with-t-shirt-mockup-in-simple-background.jpg",
      "https://assets.mediamodifier.com/mockups/64c2bb6eb5c1b134bbc99abe/t-shirt-psd-mockup-with-young-asian-male-model.jpg",
      "https://assets.mediamodifier.com/mockups/63f5cba3de66f826d40ae702/t-shirt-on-bright-decorated-background-psd-mockup.jpg",
      "https://assets.mediamodifier.com/mockups/63d8c0e7922c616db0a99778/man-wearing-t-shirt-mockup-generator.jpg",
    ],
    mainImage:
      "https://assets.mediamodifier.com/mockups/64c3fb78b5c1b14f5bd1597e/asian-male-model-with-t-shirt-mockup-in-simple-background.jpg",
    price: 29.99,
    oldPrice: 34.99,
    availableSizes: ["S", "M", "L"],
    colorOptions: [
      { title: "White", color: "#FFFFFF" },
      { title: "Black", color: "#000000" },
    ],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["graphic-shirt"],
    material: "Cotton",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 75,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Is this shirt suitable for summer?",
        answer: "Yes, it's lightweight and breathable.",
      },
      {
        question: "Do you have other designs?",
        answer: "Yes, we have various designs available.",
      },
    ],
  },
  {
    title: "Graphic Sweater",
    slug: "graphic-sweater",
    description: "Warm graphic sweater for chilly days.",
    images: [
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/b/q/a/xl-hlsw000092-highlander-original-imagxy37zav8hayg.jpeg?q=90&crop=true",
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/8/x/a/xl-hlsw000092-highlander-original-imagxy37eyarfvm6.jpeg?q=20&crop=true",
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/3/m/u/xl-hlsw000092-highlander-original-imagxy37p6yhvgaz.jpeg?q=90&crop=true",
      "https://rukminim1.flixcart.com/image/300/300/xif0q/sweater/i/w/3/xl-hlsw000091-highlander-original-imagxy37xwmvyvpj.jpeg",
    ],
    mainImage:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/b/q/a/xl-hlsw000092-highlander-original-imagxy37zav8hayg.jpeg?q=90&crop=true",
    price: 39.99,
    oldPrice: 49.99,
    availableSizes: ["M", "L", "XL"],
    colorOptions: [
      { title: "White", color: "#FFFFFF" },
      { title: "Gray", color: "#808080" },
      { title: "Navy", color: "#000080" },
    ],
    categories: [
      { title: "Sweater", slug: "sweater" },
      { title: "Shirt", slug: "shirt" },
    ],
    type: ["graphic-sweater", "graphic-shirt"],
    material: "Acrylic",
    fabricType: "Warm",
    careInstructions: "Hand wash recommended.",
    origin: "India",
    quantityInStock: 25,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Is this sweater machine washable?",
        answer: "We recommend hand washing.",
      },
      {
        question: "Does it come in different colors?",
        answer: "Yes, various colors are available.",
      },
    ],
  },
  {
    title: "Cotton Blazer",
    slug: "cotton-blazer",
    description: "Smart cotton blazer for formal occasions.",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/6/ZU/IA/VA/154385615/mens-suit-741-3-500x500.jpeg",
      "https://5.imimg.com/data5/SELLER/Default/2022/6/CL/OX/ZD/154385615/mens-suit-741-4-500x500.jpeg",
      "https://media.debenhams.com/i/debenhams/m5056611983558_blue_xl_1.jpeg",
      "https://www.makrom.co.uk/cdn/shop/files/Image_3_3_838b802d-7502-4fde-93f8-af6f17d6b8a2.jpg?v=1710514544&width=800",
    ],
    mainImage:
      "https://5.imimg.com/data5/SELLER/Default/2022/6/ZU/IA/VA/154385615/mens-suit-741-3-500x500.jpeg",
    price: 79.99,
    oldPrice: 89.99,
    availableSizes: ["M", "L", "XL"],
    colorOptions: [
      { title: "Black", color: "#000000" },
      { title: "Navy", color: "#000080" },
    ],
    categories: [
      { title: "Blazer", slug: "blazer" },
      { title: "Jacket", slug: "jacket" },
    ],
    type: ["cotton-blazer", "denim-jacket"],
    material: "Cotton",
    fabricType: "Regular",
    careInstructions: "Dry clean only.",
    origin: "India",
    quantityInStock: 15,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Can I wear this blazer casually?",
        answer: "Yes, it can be styled for both formal and casual looks.",
      },
      {
        question: "Is it available in custom sizes?",
        answer: "Yes, we offer custom sizing.",
      },
    ],
  },
  {
    title: "Designer Pathani",
    slug: "designer-pathani",
    description: "Stylish designer pathani suit for festive occasions.",
    images: [
      "https://assets0.mirraw.com/images/5552039/1551_long_webp.webp?1710776131",
      "https://rajubhaihargovindas.com/12198-large_default/grey-pathani-style-premium-cotton-kurta.jpg",
      "https://theethnic.co/cdn/shop/files/3_aa9dc4e1-fbeb-4307-9b8a-8e639e6322ee.jpg?v=1683266657&width=2160",
      "https://5.imimg.com/data5/SU/YU/KE/SELLER-23689159/men-s-pathani-shalwar-kurta-500x500.jpg",
    ],
    mainImage:
      "https://assets0.mirraw.com/images/5552039/1551_long_webp.webp?1710776131",
    price: 89.99,
    oldPrice: 109.99,
    availableSizes: ["M", "L"],
    colorOptions: [
      { title: "Black", color: "#000000" },
      { title: "White", color: "#FFFFFF" },
    ],
    categories: [{ title: "Pathani Suit", slug: "pathani-suit" }],
    type: ["designer-pathani"],
    material: "Cotton",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 20,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "What occasions is this suitable for?",
        answer: "Festivals and special events.",
      },
      {
        question: "Is this suit comfortable?",
        answer: "Yes, it's designed for comfort.",
      },
    ],
  },
  {
    title: "Formal Trousers",
    slug: "formal-trousers",
    description: "Elegant formal trousers for business meetings.",
    images: [
      "https://www.tistabene.com/cdn/shop/products/PNT-0030A_a835537d-95b7-4f50-b692-2ae1accbad94.jpg?v=1658386894&width=1080",
      "https://media.istockphoto.com/id/499232450/photo/confident-elegant-business-man-with-hands-in-pockets.jpg?s=612x612&w=0&k=20&c=NW_j1fdNw5D2lotnGqunwh1CcwWdnbrbeGQV6OdFE2c=",
      "https://5.imimg.com/data5/SELLER/Default/2022/7/WU/NC/IB/157166947/mt230-08-2--500x500.JPG",
      "https://shahzebsaeed.com/cdn/shop/products/CHINOCAMEL29-1.jpg?v=1681122944",
    ],
    mainImage:
      "https://www.tistabene.com/cdn/shop/products/PNT-0030A_a835537d-95b7-4f50-b692-2ae1accbad94.jpg?v=1658386894&width=1080",
    price: 49.99,
    oldPrice: 59.99,
    availableSizes: ["32", "34", "36"],
    colorOptions: [
      { title: "Charcoal", color: "#333333" },
      { title: "Navy", color: "#000080" },
    ],
    categories: [{ title: "Trousers", slug: "trousers" }],
    type: ["formal-trousers"],
    material: "Polyester",
    fabricType: "Regular",
    careInstructions: "Machine wash cold.",
    origin: "India",
    quantityInStock: 60,
    brand: "Chimanlal Suresh Kumar (CSK) Textiles",
    faqs: [
      {
        question: "Are these trousers wrinkle-resistant?",
        answer: "Yes, they are designed to resist wrinkles.",
      },
      {
        question: "Can I wear these to weddings?",
        answer: "Yes, they can be dressed up for events.",
      },
    ],
  },
];

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

const categoriesData = [
  {
    title: "Kurta",
    slug: "kurta",
    description:
      "Traditional and stylish attire, perfect for festive occasions.",
    image:
      "https://csk-demo.netlify.app/assets/img/media_20240710_190937_843411630433170671.png",
    types: [
      { title: "Cotton Kurta", slug: "cotton-kurta" },
      { title: "Silk Kurta", slug: "silk-kurta" },
    ],
  },
  {
    title: "Sherwani",
    slug: "sherwani",
    description: "Elegant and ornate outfit for weddings and special events.",
    image: "https://csk-demo.netlify.app/assets/img/sherwani.png",
    types: [
      { title: "Embroidered Sherwani", slug: "embroidered-sherwani" },
      { title: "Designer Sherwani", slug: "designer-sherwani" },
    ],
  },
  {
    title: "Dhoti",
    slug: "dhoti",
    description: "Comfortable traditional wear that symbolizes Indian culture.",
    image: "https://csk-demo.netlify.app/assets/img/dothi.png",
    types: [
      { title: "Cotton Dhoti", slug: "cotton-dhoti" },
      { title: "Silk Dhoti", slug: "silk-dhoti" },
    ],
  },
  {
    title: "Nehru Jacket",
    slug: "nehru-jacket",
    description:
      "A stylish jacket that adds a touch of sophistication to any outfit.",
    image:
      "https://i.pinimg.com/474x/8f/bf/94/8fbf9487761525ae6e72adc6e65e5977.jpg",
    types: [
      { title: "Cotton Nehru Jacket", slug: "cotton-nehru-jacket" },
      { title: "Silk Nehru Jacket", slug: "silk-nehru-jacket" },
    ],
  },
  {
    title: "Trousers",
    slug: "trousers",
    description: "Versatile and essential bottoms for casual and formal looks.",
    image:
      "https://www.pngall.com/wp-content/uploads/2016/09/Trouser-Free-Download-PNG.png",
    types: [
      { title: "Chinos", slug: "chinos" },
      { title: "Formal Trousers", slug: "formal-trousers" },
    ],
  },
  {
    title: "Pajama",
    slug: "pajama",
    description: "Comfortable and easy-to-wear bottoms, ideal for relaxation.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HOlN6hqIE1qOzbQBdwFYwPR2vm9Llg6s-A&s",
    types: [
      { title: "Cotton Pajama", slug: "cotton-pajama" },
      { title: "Silk Pajama", slug: "silk-pajama" },
    ],
  },
  {
    title: "Pathani Suit",
    slug: "pathani-suit",
    description: "A traditional outfit that combines comfort and style.",
    image:
      "https://img.perniaspopupshop.com/catalog/product/s/t/styc041903_1.jpg",
    types: [
      { title: "Cotton Pathani", slug: "cotton-pathani" },
      { title: "Designer Pathani", slug: "designer-pathani" },
    ],
  },
  {
    title: "Jacket",
    slug: "jacket",
    description: "A versatile outerwear piece for layering in style.",
    image: "https://freepngimg.com/save/13469-jacket-png/496x549",
    types: [
      { title: "Denim Jacket", slug: "denim-jacket" },
      { title: "Cotton Jacket", slug: "cotton-jacket" },
    ],
  },
  {
    title: "Blazer",
    slug: "blazer",
    description: "A formal jacket that enhances any professional outfit.",
    image:
      "https://csk-demo.netlify.app/assets/img/media_20240710_190936_2842665475252130661.png",
    types: [
      { title: "Denim Blazer", slug: "denim-blazer" },
      { title: "Cotton Blazer", slug: "cotton-blazer" },
    ],
  },
  {
    title: "Shirt",
    slug: "shirt",
    description: "A wardrobe staple available in various styles and fabrics.",
    image: "https://csk-demo.netlify.app/assets/img/shirt.png",
    types: [
      { title: "Graphic Shirt", slug: "graphic-shirt" },
      { title: "Plain Shirt", slug: "plain-shirt" },
    ],
  },
  {
    title: "Sweater",
    slug: "sweater",
    description: "Cozy and warm attire, perfect for colder weather.",
    image:
      "https://csk-demo.netlify.app/assets/img/media_20240710_190937_9152305180124524051.png",
    types: [
      { title: "Graphic Sweater", slug: "graphic-sweater" },
      { title: "Plain Sweater", slug: "plain-sweater" },
    ],
  },
];

// const sampleProduct = {
//   images: [
//     "https://www.textale.tech/cdn/shop/files/FRESH_Stain-Repel_Tee_Relaxed_Fit__textale_LR.jpg?v=1698207711&width=720",
//     "https://static.wixstatic.com/media/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg/v1/fill/w_980,h_1225,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg",
//     "https://heyupnow.com/cdn/shop/products/tex_tale_tee_600x.png?v=1679563774",
//     "https://www.textale.tech/cdn/shop/files/Tee_1efc19c3-e426-46c5-a315-e27b9bd9c241.jpg?v=1714473708&width=1200",
//     "https://www.textale.tech/cdn/shop/files/Tee_c4a29b07-e4e0-43b1-a20f-98a57d4dbbdb.jpg?v=1714473708&width=1200",
//   ],
//   mainImage:
//     "https://www.textale.tech/cdn/shop/files/FRESH_Stain-Repel_Tee_Relaxed_Fit__textale_LR.jpg?v=1698207711&width=720",
//   title: "Soft Cotton T-Shirt",
//   slug: "soft-cotton-t-shirt",
//   description: "A soft and comfortable cotton t-shirt perfect for casual wear.",
//   price: 29.99,
//   oldPrice: 24.99,
//   availableSizes: ["S", "M", "L", "XL"],
//   colorOptions: [
//     { title: "White", color: "#FFFFFF" },
//     { title: "Grey", color: "#808080" },
//     { title: "Navy", color: "#000080" },
//   ],
//   categories: [
//     { title: "Clothing", slug: "clothing" },
//     { title: "T-Shirts", slug: "t-shirts" },
//     { title: "WFH Casual Wear", slug: "wfh-casual-wear" },
//   ],
//   material: "Cotton",
//   fabricType: "Single Jersey",
//   careInstructions: "Machine wash cold, tumble dry low",
//   origin: "Bangladesh",
//   quantityInStock: 100, // Required field, update as needed
//   brand: "Chimanlal Suresh Kumar (CSK) Textiles", // Default brand
//   faqs: [
//     {
//       question: "Does this t-shirt shrink in the wash?",
//       answer: "Minimal shrinkage if washed in cold water.",
//     },
//   ],
// };

// price: 24.99,
