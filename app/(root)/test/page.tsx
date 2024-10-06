"use client";

import GridCards from "@/components/HomePage/Grids/GridCards";
import ProductCategorySection from "@/components/HomePage/CategorySection/ProductCategorySection";
import { toast } from "@/hooks/use-toast";
import { generateSlug } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ImageMagnify from "@/components/ui/ImageMagnify";
import { Button } from "@/components/ui/button";
import PaymentGateway from "@/components/Payment/PaymentGateway";
import UploadFile from "@/components/ui/UploadsFile";

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
      {/* <PaymentGateway /> */}
      {/* <UploadFilesComoponent /> */}
    </div>
  );
}

interface CloudinaryResult {
  secure_url?: string;
  url?: string;
}

// export const UploadFilesComoponent = () => {
//   const [urls, setUrls] = useState<string[]>([]);
//   console.log(urls);

//   return (
//     <>
//       <UploadFile setUrls={setUrls}>
//         <Button>Upload files</Button>
//       </UploadFile>
//       {urls.length}
//     </>
//   );
// };
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
      const res = await fetch("/api/products/create/create-multiple-products", {
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
      <h1>
        Create Men Textile Products -{" "}
        <span className="text-[red]">
          {sampleProducts[0].categories[0].title}
        </span>
      </h1>
      <Button onClick={sendProducts}>Send Products</Button>
    </div>
  );
};

// Shirt
const sampleProducts = [
  {
    title: "Classic White Plain Shirt",
    slug: "classic-white-plain-shirt",
    description:
      "A timeless Classic White Plain Shirt made from premium cotton, perfect for both formal and casual settings. The sleek design ensures you always look sharp.",
    images: [
      "https://tmlewin.co.uk/cdn/shop/files/SHIRT_15428_052_69754a08-f54a-4819-a6aa-0136192a39fb.jpg?v=1713260799&width=533",
      "https://tmlewin.co.uk/cdn/shop/products/23_01_23_LUXE_CO_TMLEWIN_ECOM0142.jpg?v=1680689902&width=1946",
      "https://5.imimg.com/data5/JO/XY/MY-10245406/white-shirt.jpg",
      "https://www.bombayshirts.com/cdn/shop/collections/1120x1200_collection_Formal-custom-made-white-shirts-men.jpg?v=1653051693",
    ],
    image_link:
      "https://tmlewin.co.uk/cdn/shop/files/SHIRT_15428_052_69754a08-f54a-4819-a6aa-0136192a39fb.jpg?v=1713260799&width=533",
    price: 25.99,
    oldPrice: 29.99,
    quantityInStock: 60,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colorOptions: [{ title: "White", color: "#FFFFFF" }],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["plain-shirt"],
    material: "100% Cotton",
    fabricType: "Non-stretch",
    careInstructions: "Machine wash cold, tumble dry low.",
    origin: "India",
    brand: "Raymond",
    faqs: [
      {
        question: "Is this shirt see-through?",
        answer:
          "No, the shirt is made from thick cotton to prevent transparency.",
      },
    ],
  },
  {
    title: "Bold Black Graphic Shirt",
    slug: "bold-black-graphic-shirt",
    description:
      "Stand out in the Bold Black Graphic Shirt, featuring a striking abstract design. This shirt is perfect for casual outings and making a statement.",
    images: [
      "https://imagescdn.thecollective.in/img/app/product/9/974621-12807976.jpg?w=500&auto=format",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZn6U1sa-jDg_On6TVSInqQ8Gk-oh0T5-HBAyggyVqk4-h20b6v7NK8UvnasGpnC5APuo&usqp=CAU",
      "https://therichero.com/cdn/shop/files/46copy_976efa0b-0090-4ee0-b9d6-8ee88da9c9bd.jpg?v=1717054371",
      "https://therichero.com/cdn/shop/files/22copy_eb67b097-b69a-46aa-b791-a637180db3e3.jpg?v=1707480272&width=3000",
    ],
    image_link:
      "https://imagescdn.thecollective.in/img/app/product/9/974621-12807976.jpg?w=500&auto=format",
    price: 19.99,
    oldPrice: 24.99,
    quantityInStock: 75,
    availableSizes: ["S", "M", "L", "XL"],
    colorOptions: [{ title: "Black", color: "#000000" }],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["graphic-shirt"],
    material: "Poly-Cotton Blend",
    fabricType: "Stretchable",
    careInstructions: "Machine wash cold, do not iron over print.",
    origin: "India",
    brand: "Levi's",
    faqs: [
      {
        question: "Does the print fade after washing?",
        answer:
          "No, the graphic is made with high-quality ink that remains vibrant even after multiple washes.",
      },
    ],
  },
  {
    title: "Blue Oxford Plain Shirt",
    slug: "blue-oxford-plain-shirt",
    description:
      "The Blue Oxford Plain Shirt offers a refined, classic look for both casual and formal wear. Made with high-quality cotton for maximum comfort and durability.",
    images: [
      "https://m.media-amazon.com/images/I/8153JCvMaXL._AC_UY1100_.jpg",
      "https://m.media-amazon.com/images/I/71y05DnGm7L._AC_UY1100_.jpg",
      "https://m.media-amazon.com/images/I/41mrM5R7PoL._AC_UY350_.jpg",
    ],
    image_link:
      "https://m.media-amazon.com/images/I/8153JCvMaXL._AC_UY1100_.jpg",
    price: 30.99,
    oldPrice: 35.99,
    quantityInStock: 40,
    availableSizes: ["M", "L", "XL", "XXL"],
    colorOptions: [{ title: "Blue", color: "#0000FF" }],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["plain-shirt"],
    material: "100% Cotton",
    fabricType: "Non-stretch",
    careInstructions: "Machine wash cold, iron while damp.",
    origin: "India",
    brand: "Zara",
    faqs: [
      {
        question: "Is the shirt wrinkle-resistant?",
        answer:
          "Yes, the fabric is designed to resist wrinkles and maintain a sharp look.",
      },
    ],
  },
  {
    title: "Vintage Graphic Tee",
    slug: "vintage-graphic-tee",
    description:
      "Show your love for retro designs with the Vintage Graphic Tee, featuring a colorful 80s-inspired print. Soft and comfortable, it's perfect for weekend wear.",
    images: [
      "https://images-cdn.ubuy.co.in/633fed1b1380620ed22c0c61-kejinkcsee-vintage-shirts-for-men-2022.jpg",
      "https://m.media-amazon.com/images/I/81V7RqCmppL._AC_UY1100_.jpg",
      "https://m.media-amazon.com/images/I/81UQh1ucfyL._AC_UY1000_.jpg",
    ],
    image_link:
      "https://images-cdn.ubuy.co.in/633fed1b1380620ed22c0c61-kejinkcsee-vintage-shirts-for-men-2022.jpg",
    price: 22.99,
    oldPrice: 27.99,
    quantityInStock: 85,
    availableSizes: ["S", "M", "L", "XL"],
    colorOptions: [
      { title: "Black", color: "#000000" },
      { title: "Gray", color: "#808080" },
    ],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["graphic-shirt"],
    material: "100% Cotton",
    fabricType: "Soft",
    careInstructions: "Machine wash cold, air dry for longevity.",
    origin: "India",
    brand: "Jack & Jones",
    faqs: [
      {
        question: "Does the graphic fade?",
        answer: "No, it stays vibrant even after multiple washes.",
      },
    ],
  },
  {
    title: "Light Grey Linen Plain Shirt",
    slug: "light-grey-linen-plain-shirt",
    description:
      "The Light Grey Linen Plain Shirt is a perfect addition for warm-weather days. This breathable linen shirt offers both style and comfort, ideal for casual and semi-formal settings.",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/8/331760941/CX/BC/ZF/123822951/light-grey-mens-linen-shirt-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2023/8/331760632/RY/NL/FB/123822951/light-grey-mens-linen-shirt.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2023/8/331760910/LP/VI/EW/123822951/light-grey-mens-linen-shirt-500x500.jpg",
    ],
    image_link:
      "https://5.imimg.com/data5/SELLER/Default/2023/8/331760941/CX/BC/ZF/123822951/light-grey-mens-linen-shirt-500x500.jpg",
    price: 34.99,
    oldPrice: 39.99,
    quantityInStock: 50,
    availableSizes: ["S", "M", "L", "XL"],
    colorOptions: [{ title: "Light Grey", color: "#D3D3D3" }],
    categories: [{ title: "Shirt", slug: "shirt" }],
    type: ["plain-shirt"],
    material: "100% Linen",
    fabricType: "Lightweight",
    careInstructions: "Machine wash cold, hang dry for best results.",
    origin: "India",
    brand: "H&M",
    faqs: [
      {
        question: "Is this shirt breathable?",
        answer:
          "Yes, the linen material is perfect for warm weather and provides excellent breathability.",
      },
    ],
  },
];

// Trousers
// const sampleProducts = [
//   {
//     title: "Slim Fit Navy Blue Chinos",
//     slug: "slim-fit-navy-blue-chinos",
//     description:
//       "The Slim Fit Navy Blue Chinos offer a modern look with a comfortable fit. Perfect for casual outings or a smart-casual workday, these chinos are a versatile addition to your wardrobe.",
//     images: [
//       "https://pantproject.com/cdn/shop/products/navy-blue-chinos.jpg?v=1667021431",
//       "https://pantproject.com/cdn/shop/products/best-chinos-for-men_b4c0fcfc-339c-484a-8deb-27a4c23ed674.jpg?v=1667021431",
//       "https://pantproject.com/cdn/shop/products/blue-chinos-for-men_grande.jpg?v=1667021431",
//       "https://pantproject.com/cdn/shop/products/buy-chinos-online_9c7a54b0-5145-46d4-8870-741fc7981101.jpg?v=1667021431",
//     ],
//     image_link: "https://pantproject.com/cdn/shop/products/navy-blue-chinos.jpg?v=1667021431",
//     price: 29.99,
//     oldPrice: 39.99,
//     quantityInStock: 50,
//     availableSizes: ["30", "32", "34", "36", "38"],
//     colorOptions: [{ title: "Navy Blue", color: "#000080" }],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["chinos"],
//     material: "Cotton Blend",
//     fabricType: "Stretchable",
//     careInstructions: "Machine wash cold, tumble dry low.",
//     origin: "India",
//     brand: "Allen Solly",
//     faqs: [
//       {
//         question: "Do these chinos stretch?",
//         answer:
//           "Yes, the fabric contains elastane for added stretch and comfort.",
//       },
//     ],
//   },
//   {
//     title: "Classic Black Formal Trousers",
//     slug: "classic-black-formal-trousers",
//     description:
//       "These Classic Black Formal Trousers offer a timeless look, ideal for office wear and formal events. The tailored fit provides both comfort and elegance.",
//     images: [
//       "https://i.etsystatic.com/21889239/r/il/953825/3936770021/il_570xN.3936770021_9duf.jpg",
//       "https://www.sainly.com/cdn/shop/products/sainly-apparel-accessories-26-men-s-black-formal-pant-for-classical-black-dress-pants-party-wear-trousers-pleated-trousers-dinner-wear-trouser-groomsmen-gift-men-black-formal-pant-men_800x.png?v=1663249871",
//       "https://www.apella.in/cdn/shop/products/MenPlusSizeBlackFormalTrouser_6.jpg?v=1725510348&width=1946",
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/17567918/2022/4/12/01c028b1-7089-4e17-b596-d5ae57ce69471649757969242-Louis-Philippe-Men-Trousers-7381649757968542-1.jpg",
//     ],
//     image_link:
//       "https://i.etsystatic.com/21889239/r/il/953825/3936770021/il_570xN.3936770021_9duf.jpg",
//     price: 49.99,
//     oldPrice: 59.99,
//     quantityInStock: 35,
//     availableSizes: ["30", "32", "34", "36", "38", "40"],
//     colorOptions: [{ title: "Black", color: "#000000" }],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["formal-trousers"],
//     material: "Polyester Blend",
//     fabricType: "Non-stretch",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Raymond",
//     faqs: [
//       {
//         question: "Are these trousers wrinkle-resistant?",
//         answer: "Yes, the fabric is designed to resist wrinkles.",
//       },
//     ],
//   },
//   {
//     title: "Beige Slim Fit Chinos",
//     slug: "beige-slim-fit-chinos",
//     description:
//       "Crafted for comfort and style, these Beige Slim Fit Chinos are perfect for both casual and semi-formal occasions. The neutral color allows for easy pairing with any outfit.",
//     images: [
//       "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021053171_437Wx649H_202402070004391.jpeg",
//       "https://cdn.pixelspray.io/v2/black-bread-289bfa/woTKH5/wrkr/t.resize(h:1000,w:820)/data/Superdry/09feb2024/410409945005_3.jpg",
//       "https://cdn.pixelspray.io/v2/black-bread-289bfa/woTKH5/wrkr/t.resize(h:1000,w:820)/data/Superdry/09feb2024/410409945005_2.jpg",
//       "https://cdn.pixelspray.io/v2/black-bread-289bfa/woTKH5/wrkr/t.resize(h:1000,w:820)/data/Superdry/09feb2024/410409945005_1.jpg",
//     ],
//     image_link: "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021053171_437Wx649H_202402070004391.jpeg",
//     price: 34.99,
//     oldPrice: 44.99,
//     quantityInStock: 42,
//     availableSizes: ["28", "30", "32", "34", "36"],
//     colorOptions: [{ title: "Beige", color: "#F5F5DC" }],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["chinos"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash warm, tumble dry low.",
//     origin: "India",
//     brand: "Levi's",
//     faqs: [
//       {
//         question: "Are these chinos lightweight?",
//         answer:
//           "Yes, they are made from lightweight cotton for maximum comfort.",
//       },
//     ],
//   },
//   {
//     title: "Tailored Grey Formal Trousers",
//     slug: "tailored-grey-formal-trousers",
//     description:
//       "These Tailored Grey Formal Trousers are designed to offer a sharp, professional look. Perfect for business meetings or formal events, they offer a sleek and sophisticated fit.",
//     images: [
//       "https://imagescdn.louisphilippe.com/img/app/product/8/809683-9636529.jpg",
//       "https://media-us.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/lifestyle/1000013499508-Grey-Charcoal-1000013499508_01-2100.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0Ew3Y2Y3tpSHnUZZcP5F4j_44d2QbnV3Sw&s",
//     ],
//     image_link:
//       "https://imagescdn.louisphilippe.com/img/app/product/8/809683-9636529.jpg",
//     price: 59.99,
//     oldPrice: 69.99,
//     quantityInStock: 20,
//     availableSizes: ["30", "32", "34", "36", "38", "40", "42"],
//     colorOptions: [{ title: "Grey", color: "#808080" }],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["formal-trousers"],
//     material: "Wool Blend",
//     fabricType: "Non-stretch",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Van Heusen",
//     faqs: [
//       {
//         question: "Are these trousers suitable for winter?",
//         answer: "Yes, the wool blend makes them ideal for cooler weather.",
//       },
//     ],
//   },
//   {
//     title: "Olive Green Stretch Chinos",
//     slug: "olive-green-stretch-chinos",
//     description:
//       "The Olive Green Stretch Chinos provide a comfortable fit with added stretch for ease of movement. These chinos are perfect for casual wear and weekend outings.",
//     images: [
//       "https://pantproject.com/cdn/shop/products/herb-olive-stretch-chinos.jpg?v=1667389594",
//       "https://pantproject.com/cdn/shop/products/green-chinos-for-men.jpg?v=1667389594",
//       "https://pantproject.com/cdn/shop/products/chino-pants-for-men_b40039d5-269c-477c-941c-9eea72572291.jpg?v=1667389594",
//       "https://pantproject.com/cdn/shop/products/chino-trousers_3169e786-967a-4703-a2dc-1aeb09314381.jpg?v=1667389593",
//     ],
//     image_link: "https://pantproject.com/cdn/shop/products/herb-olive-stretch-chinos.jpg?v=1667389594",
//     price: 32.99,
//     oldPrice: 39.99,
//     quantityInStock: 45,
//     availableSizes: ["30", "32", "34", "36", "38"],
//     colorOptions: [{ title: "Olive Green", color: "#808000" }],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["chinos"],
//     material: "Cotton with Elastane",
//     fabricType: "Stretch",
//     careInstructions: "Machine wash cold, tumble dry low.",
//     origin: "India",
//     brand: "H&M",
//     faqs: [
//       {
//         question: "Do these chinos shrink after washing?",
//         answer: "No, they are pre-shrunk for a consistent fit.",
//       },
//     ],
//   },
// ];

// Pajama
// const sampleProducts = [
//   {
//     title: "Elegant Silk Pajama with Golden Borders",
//     slug: "elegant-silk-pajama-golden-borders",
//     description:
//       "This Elegant Silk Pajama with Golden Borders is crafted from premium silk, offering luxurious comfort and an elegant design ideal for festive occasions.",
//     images: [
//       "https://images.meesho.com/images/products/256847699/rp7xd_512.webp",
//       "https://images.meesho.com/images/products/256847699/rp7xd_512.webp",
//       "https://images.jdmagicbox.com/quickquotes/images_main/readymade-embroidery-mens-dhoti-white-id112-2217459308-lwpbomfh.jpg",
//     ],
//     image_link:
//       "https://images.meesho.com/images/products/256847699/rp7xd_512.webp",
//     price: 49.99,
//     oldPrice: 59.99,
//     quantityInStock: 12,
//     availableSizes: ["M", "L", "XL", "XXL"],
//     colorOptions: [{ title: "Beige with Golden Borders", color: "#F5F5DC" }],
//     categories: [{ title: "Pajama", slug: "pajama" }],
//     type: ["silk-pajama"],
//     material: "Silk",
//     fabricType: "Smooth",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Manyavar",
//     faqs: [
//       {
//         question: "Is this pajama suitable for weddings?",
//         answer: "Yes, it's perfect for festive events and weddings.",
//       },
//     ],
//   },
//   {
//     title: "Printed Cotton Pajama with Drawstring",
//     slug: "printed-cotton-pajama-drawstring",
//     description:
//       "This Printed Cotton Pajama comes with a convenient drawstring for an adjustable fit. The soft cotton fabric ensures comfort during leisure time.",
//     images: [
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/15558672/2021/12/8/1f52895d-0753-460b-836f-c5eb321803731638957453346-Van-Heusen-Men-Brown-Printed-Pure-Cotton-Lounge-Pants-339163-1.jpg",
//       "https://assets.ajio.com/medias/sys_master/root/20230608/vnV9/6480e1a6d55b7d0c6357e78c/-473Wx593H-466250698-beige-MODEL.jpg",
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2020/9/25/30a1c9ec-5fc3-47a7-829a-0556b1554cba1600986907745-1.jpg",
//     ],
//     image_link:
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/15558672/2021/12/8/1f52895d-0753-460b-836f-c5eb321803731638957453346-Van-Heusen-Men-Brown-Printed-Pure-Cotton-Lounge-Pants-339163-1.jpg",
//     price: 17.99,
//     oldPrice: 22.99,
//     quantityInStock: 30,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [{ title: "Blue with White Print", color: "#0000FF" }],
//     categories: [{ title: "Pajama", slug: "pajama" }],
//     type: ["cotton-pajama"],
//     material: "Cotton",
//     fabricType: "Printed",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Peter England",
//     faqs: [
//       {
//         question: "Does the pajama shrink after washing?",
//         answer: "No, the fabric is pre-shrunk for a reliable fit.",
//       },
//     ],
//   },
//   {
//     title: "Ivory Silk Pajama for Festive Wear",
//     slug: "ivory-silk-pajama-festive-wear",
//     description:
//       "Crafted from the finest silk, the Ivory Silk Pajama is designed for festive occasions. Its elegant look makes it a perfect addition to your traditional wardrobe.",
//     images: [
//       "https://shreeman.in/cdn/shop/files/1J8A0785.jpg?v=1697715683&width=3600",
//       "https://sslimages.shoppersstop.com/sys-master/images/hba/hda/17513460957214/A21SULJKPSET-03_CREAM_alt1.jpg_2000Wx3000H",
//     ],
//     image_link:
//       "https://shreeman.in/cdn/shop/files/1J8A0785.jpg?v=1697715683&width=3600",
//     price: 54.99,
//     oldPrice: 64.99,
//     quantityInStock: 10,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [{ title: "Ivory", color: "#FFFFF0" }],
//     categories: [{ title: "Pajama", slug: "pajama" }],
//     type: ["silk-pajama"],
//     material: "Silk",
//     fabricType: "Glossy",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Utsav Fashion",
//     faqs: [
//       {
//         question: "Is this pajama suitable for hot weather?",
//         answer:
//           "Yes, the light silk fabric provides comfort even in warm conditions.",
//       },
//     ],
//   },
//   {
//     title: "Casual Cotton Pajama with Side Pockets",
//     slug: "casual-cotton-pajama-side-pockets",
//     description:
//       "This Casual Cotton Pajama with side pockets offers both convenience and style. The soft, breathable fabric makes it perfect for relaxed days at home.",
//     images: [
//       "https://m.media-amazon.com/images/I/51p0hDe+zJL._AC_UY1100_.jpg",
//       "https://m.media-amazon.com/images/I/71Wp4GxJKvL._AC_AC_SY350_QL15_.jpg",
//       "https://m.media-amazon.com/images/I/51EJEB8NiIL._AC_UY1100_.jpg",
//     ],
//     image_link:
//       "https://m.media-amazon.com/images/I/51p0hDe+zJL._AC_UY1100_.jpg",
//     price: 15.99,
//     oldPrice: 19.99,
//     quantityInStock: 40,
//     availableSizes: ["M", "L", "XL", "XXL"],
//     colorOptions: [{ title: "Grey", color: "#808080" }],
//     categories: [{ title: "Pajama", slug: "pajama" }],
//     type: ["cotton-pajama"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "FabIndia",
//     faqs: [
//       {
//         question: "Are the pockets deep enough for a phone?",
//         answer: "Yes, the side pockets are deep enough to hold a smartphone.",
//       },
//     ],
//   },
// ];

// Dhoti
// const sampleProducts = [
//   {
//     title: "Golden Border Silk Dhoti",
//     slug: "golden-border-silk-dhoti",
//     description:
//       "Elevate your traditional look with the Golden Border Silk Dhoti. Perfect for weddings and formal occasions, this dhoti adds a touch of elegance and luxury.",
//     images: [
//       "https://pothysdress.s3.ap-south-1.amazonaws.com/149740_img0.jpg",
//       "https://pothysdress.s3.ap-south-1.amazonaws.com/149586_img2.jpg",
//       "https://pothysdress.s3.ap-south-1.amazonaws.com/149586_img2.jpg",
//     ],
//     image_link:
//       "https://pothysdress.s3.ap-south-1.amazonaws.com/149740_img0.jpg",
//     price: 59.99,
//     oldPrice: 69.99,
//     quantityInStock: 8,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [{ title: "White with Golden Border", color: "#FFFFFF" }],
//     categories: [{ title: "Dhoti", slug: "dhoti" }],
//     type: ["silk-dhoti"],
//     material: "Silk",
//     fabricType: "Smooth",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Manyavar",
//     faqs: [
//       {
//         question: "Is this suitable for weddings?",
//         answer:
//           "Yes, this silk dhoti is perfect for weddings and other formal events.",
//       },
//     ],
//   },
//   {
//     title: "Off-White Cotton Dhoti with Maroon Border",
//     slug: "off-white-cotton-dhoti-maroon-border",
//     description:
//       "This Off-White Cotton Dhoti with a Maroon Border is an excellent choice for traditional festivals and celebrations. Made from breathable cotton, it ensures comfort throughout the day.",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9PSDW1EEd5nrjg8zniv6dj6azBxK-vgLqhQ&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3CYGN5HIO92WlscXVE4Z_rUZ8k2POVPAEg&s",
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/dhoti/p/h/v/free-maroon-border-mcr-original-imag2b7hzvyvhvyj-bb.jpeg?q=90&crop=false",
//     ],
//     image_link:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9PSDW1EEd5nrjg8zniv6dj6azBxK-vgLqhQ&s",
//     price: 24.99,
//     oldPrice: 29.99,
//     quantityInStock: 15,
//     availableSizes: ["M", "L", "XL", "XXL"],
//     colorOptions: [{ title: "Off-White with Maroon Border", color: "#F5F5DC" }],
//     categories: [{ title: "Dhoti", slug: "dhoti" }],
//     type: ["cotton-dhoti"],
//     material: "Cotton",
//     fabricType: "Lightweight",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Peter England",
//     faqs: [
//       {
//         question: "Does this dhoti shrink after washing?",
//         answer:
//           "No, the fabric is pre-shrunk and maintains its size after washing.",
//       },
//     ],
//   },
//   {
//     title: "Festive Yellow Silk Dhoti",
//     slug: "festive-yellow-silk-dhoti",
//     description:
//       "The Festive Yellow Silk Dhoti is perfect for adding a splash of color to your traditional attire. Its vibrant hue and luxurious silk fabric make it a standout choice for special occasions.",
//     images: [
//       "https://ramrajcotton.in/cdn/shop/files/240809_ramraj_ecom2258.jpg?v=1724754890",
//       "https://ramrajcotton.in/cdn/shop/files/1_279d7cfc-3b30-4527-82df-8ae435e83555.jpg?v=1698493657",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvf56os59h4RKw2VfAKLowgqQ8_SBAd3VDqA&s",
//     ],
//     image_link:
//       "https://ramrajcotton.in/cdn/shop/files/240809_ramraj_ecom2258.jpg?v=1724754890",
//     price: 64.99,
//     oldPrice: 74.99,
//     quantityInStock: 6,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [{ title: "Yellow", color: "#FFD700" }],
//     categories: [{ title: "Dhoti", slug: "dhoti" }],
//     type: ["silk-dhoti"],
//     material: "Silk",
//     fabricType: "Glossy",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Utsav Fashion",
//     faqs: [
//       {
//         question: "Is this dhoti suitable for summer?",
//         answer:
//           "Yes, despite its rich look, the lightweight silk fabric makes it comfortable in warmer weather.",
//       },
//     ],
//   },
//   {
//     title: "Ivory Cotton Dhoti with Green Border",
//     slug: "ivory-cotton-dhoti-green-border",
//     description:
//       "The Ivory Cotton Dhoti with a Green Border is a subtle yet elegant choice for traditional events. Made from soft cotton, it offers a combination of style and comfort.",
//     images: [
//       "https://www.jiomart.com/images/product/original/rvefky051t/ramraj-men-cotton-matching-border-adjustable-dhoti-with-full-sleeve-light-green-shirt-38-light-green-product-images-rvefky051t-0-202304241153.jpg?im=Resize=(1000,1000)",
//       "https://www.jiomart.com/images/product/original/rvxeka3ktc/ramraj-men-cotton-matching-border-adjustable-dhoti-with-half-sleeve-green-shirt-40-green-product-images-rvxeka3ktc-0-202304241256.jpg?im=Resize=(330,410)",
//       "https://ramrajcotton.in/cdn/shop/products/Untitled-1_0073_DSC05495_1024x.jpg?v=1641449222",
//     ],
//     image_link:
//       "https://www.jiomart.com/images/product/original/rvefky051t/ramraj-men-cotton-matching-border-adjustable-dhoti-with-full-sleeve-light-green-shirt-38-light-green-product-images-rvefky051t-0-202304241153.jpg?im=Resize=(1000,1000)",
//     price: 21.99,
//     oldPrice: 26.99,
//     quantityInStock: 18,
//     availableSizes: ["M", "L", "XL", "XXL"],
//     colorOptions: [{ title: "Ivory with Green Border", color: "#FFFFF0" }],
//     categories: [{ title: "Dhoti", slug: "dhoti" }],
//     type: ["cotton-dhoti"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "FabIndia",
//     faqs: [
//       {
//         question: "Can this dhoti be worn for temple visits?",
//         answer:
//           "Yes, its simple and traditional design makes it ideal for religious occasions.",
//       },
//     ],
//   },
// ];

// Nehru Jacket
// const sampleProducts = [
//   {
//     title: "Classic White Cotton Nehru Jacket",
//     slug: "classic-white-cotton-nehru-jacket",
//     description:
//       "The Classic White Cotton Nehru Jacket is a timeless piece, perfect for layering over kurtas or shirts. Its lightweight fabric and traditional design make it ideal for both formal and casual events.",
//     images: [
//       "https://assets.ajio.com/medias/sys_master/root/20230620/KKqw/649203f8d55b7d0c637e7324/-473Wx593H-463165466-white-MODEL2.jpg",
//       "https://www.yellwithus.com/cdn/shop/products/IMG_0379_1200x1800_15747325-647c-40dc-a702-5dc01693ebc8_800x.jpg?v=1622520065",
//       "https://frenchcrown.in/cdn/shop/products/WC2546_1.jpg?v=1713352154&width=3600",
//     ],
//     image_link:
//       "https://assets.ajio.com/medias/sys_master/root/20230620/KKqw/649203f8d55b7d0c637e7324/-473Wx593H-463165466-white-MODEL2.jpg",
//     price: 39.99,
//     oldPrice: 49.99,
//     quantityInStock: 12,
//     availableSizes: ["S", "M", "L", "XL", "XXL"],
//     colorOptions: [
//       { title: "White", color: "#FFFFFF" },
//       { title: "Beige", color: "#F5F5DC" },
//     ],
//     categories: [{ title: "Nehru Jacket", slug: "nehru-jacket" }],
//     type: ["cotton-nehru-jacket"],
//     material: "Cotton",
//     fabricType: "Lightweight",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Raymond",
//     faqs: [
//       {
//         question: "Can it be worn over a formal shirt?",
//         answer: "Yes, it's versatile enough for both shirts and kurtas.",
//       },
//     ],
//   },
//   {
//     title: "Regal Black Silk Nehru Jacket",
//     slug: "regal-black-silk-nehru-jacket",
//     description:
//       "Elevate your style with the Regal Black Silk Nehru Jacket. Crafted from luxurious silk, this jacket is perfect for weddings and formal occasions, adding a sophisticated touch to your attire.",
//     images: [
//       "https://apisap.fabindia.com/medias/10528439-1.jpg?context=bWFzdGVyfGltYWdlc3wxMDIxNjB8aW1hZ2UvanBlZ3xhR001TDJneVlTODVNVGcxTVRnd01USXpNVFkyTHpFd05USTRORE01WHpFdWFuQm58NTE1OGMwOGE4ZmUyYmE4MWM1OTljN2U2ZTNkYjM3ZjNmMGZiMzg4ODQxNDk5ZmNlOGVlMzUxODUyMTczMDUyZg",
//       "https://apisap.fabindia.com/medias/10528439-5.jpg?context=bWFzdGVyfGltYWdlc3wyNDA4OTN8aW1hZ2UvanBlZ3xhR1UwTDJnME5TODVNVGcxTVRnd09UQTVOVGs0THpFd05USTRORE01WHpVdWFuQm58OGM5YmI4YTNlYjRmNDZhNTYwODYxZWRmNGYwNjIzYTgyMjE0N2RmYjgxNWY5YzBhYjFkZGVkN2YwMjg4M2U3Mw",
//       "https://apisap.fabindia.com/medias/10528439-4.jpg?context=bWFzdGVyfGltYWdlc3w2MDI4OHxpbWFnZS9qcGVnfGFEZGxMMmd6Wmk4NU1UZzFNVGd3TnpRMU56VTRMekV3TlRJNE5ETTVYelF1YW5Cbnw5MzMwYmI1MDNiN2M3MzJlNDgzMTJkOTk3YTRiMzgzYTgxODU5MTYxNWY2YjI1NjAwNTlhYTc5MzZiODIyODY1",
//     ],
//     image_link:
//       "https://apisap.fabindia.com/medias/10528439-1.jpg?context=bWFzdGVyfGltYWdlc3wxMDIxNjB8aW1hZ2UvanBlZ3xhR001TDJneVlTODVNVGcxTVRnd01USXpNVFkyTHpFd05USTRORE01WHpFdWFuQm58NTE1OGMwOGE4ZmUyYmE4MWM1OTljN2U2ZTNkYjM3ZjNmMGZiMzg4ODQxNDk5ZmNlOGVlMzUxODUyMTczMDUyZg",
//     price: 89.99,
//     oldPrice: 99.99,
//     quantityInStock: 7,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Black", color: "#000000" },
//       { title: "Silver", color: "#C0C0C0" },
//     ],
//     categories: [{ title: "Nehru Jacket", slug: "nehru-jacket" }],
//     type: ["silk-nehru-jacket"],
//     material: "Silk",
//     fabricType: "Smooth",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Manyavar",
//     faqs: [
//       {
//         question: "Is this jacket suitable for formal occasions?",
//         answer: "Yes, it's ideal for weddings and formal events.",
//       },
//     ],
//   },
//   {
//     title: "Royal Blue Cotton Nehru Jacket",
//     slug: "royal-blue-cotton-nehru-jacket",
//     description:
//       "The Royal Blue Cotton Nehru Jacket is a vibrant and comfortable choice, made from high-quality cotton. Pair it with a plain kurta for a sharp and modern look.",
//     images: [
//       "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MW-18-05_2_480x480.webp?v=1701239183",
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/21564592/2023/1/16/75f78e8d-5bf8-414b-88ca-2eef1b7679fe1673859696834HangupMensFormalNehruJacketMultiBlendRegular103APrintedNehru1.jpg",
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/24701798/2023/10/9/028716bc-fb78-4fad-9493-6e3dff44d5161696854517825-Manu-BLUE-VELVET-Self-design-Mandarin-Collar-Jacket-38116968-1.jpg",
//     ],
//     image_link:
//       "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MW-18-05_2_480x480.webp?v=1701239183",
//     price: 34.99,
//     oldPrice: 44.99,
//     quantityInStock: 14,
//     availableSizes: ["S", "M", "L", "XL"],
//     colorOptions: [
//       { title: "Blue", color: "#0000FF" },
//       { title: "Navy", color: "#000080" },
//     ],
//     categories: [{ title: "Nehru Jacket", slug: "nehru-jacket" }],
//     type: ["cotton-nehru-jacket"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Peter England",
//     faqs: [
//       {
//         question: "Can it be worn in summer?",
//         answer:
//           "Yes, the cotton material is breathable and perfect for summer.",
//       },
//     ],
//   },
//   {
//     title: "Golden Silk Nehru Jacket",
//     slug: "golden-silk-nehru-jacket",
//     description:
//       "Shine bright with the Golden Silk Nehru Jacket. Ideal for festive occasions and weddings, this jacket adds a touch of luxury and elegance to your outfit.",
//     images: [
//       "https://images-static.nykaa.com/media/catalog/product/a/8/a8c1cf1TMDA346_3.jpg?tr=w-500",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_yB8VYYeLP16208YofOC68shC8Jbv9GYIKzt-yml3BuPUwGUl0mMIwZihPZ1xrrFvzU&usqp=CAU",
//       "https://assets.ajio.com/medias/sys_master/root/20240612/4nnR/666b03786f60443f311881a5/-473Wx593H-464040907-yellow-MODEL.jpg",
//     ],
//     image_link:
//       "https://example.com/nehru-jackets/golden-silk-nehru-jacket1.jpg",
//     price: 79.99,
//     oldPrice: 89.99,
//     quantityInStock: 5,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Gold", color: "#FFD700" },
//       { title: "Ivory", color: "#FFFFF0" },
//     ],
//     categories: [{ title: "Nehru Jacket", slug: "nehru-jacket" }],
//     type: ["silk-nehru-jacket"],
//     material: "Silk",
//     fabricType: "Glossy",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Utsav Fashion",
//     faqs: [
//       {
//         question: "Is the jacket lightweight?",
//         answer:
//           "Yes, despite its rich look, it is lightweight and comfortable.",
//       },
//     ],
//   },
//   {
//     title: "Charcoal Grey Cotton Nehru Jacket",
//     slug: "charcoal-grey-cotton-nehru-jacket",
//     description:
//       "The Charcoal Grey Cotton Nehru Jacket offers a sleek and modern look with a traditional silhouette. Perfect for both work and leisure, this jacket complements a variety of outfits.",
//     images: [
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/6811370/2018/11/9/b2f22c60-ba65-4b2a-b2b4-09122571cd571541760758980-Melange-by-Lifestyle-Men-Charcoal-Grey-Self-Design-Nehru-Jacket-4831541760758847-5.jpg",
//       "https://5.imimg.com/data5/SELLER/Default/2024/7/433825718/ZE/DK/OS/41887076/dark-grey-cotton-nehru-jacket-500x500.png",
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2412744/2018/2/19/11519021363647-True-Blue-Charcoal-Grey-Nehru-Jacket-8651519021363447-1.jpg",
//     ],
//     image_link:
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/6811370/2018/11/9/b2f22c60-ba65-4b2a-b2b4-09122571cd571541760758980-Melange-by-Lifestyle-Men-Charcoal-Grey-Self-Design-Nehru-Jacket-4831541760758847-5.jpg",
//     price: 42.99,
//     oldPrice: 52.99,
//     quantityInStock: 10,
//     availableSizes: ["S", "M", "L", "XL", "XXL"],
//     colorOptions: [
//       { title: "Grey", color: "#808080" },
//       { title: "Black", color: "#000000" },
//     ],
//     categories: [{ title: "Nehru Jacket", slug: "nehru-jacket" }],
//     type: ["cotton-nehru-jacket"],
//     material: "Cotton",
//     fabricType: "Durable",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "FabIndia",
//     faqs: [
//       {
//         question: "Does this jacket wrinkle easily?",
//         answer: "No, the fabric is designed to be wrinkle-resistant.",
//       },
//     ],
//   },
// ];

// kurta
// const sampleProducts = [
//   {
//     title: "Blue Ocean Cotton Kurta",
//     slug: "blue-ocean-cotton-kurta",
//     description:
//       "Crafted from premium cotton, this Blue Ocean Kurta offers a blend of comfort and style for everyday wear. Perfect for both casual outings and semi-formal gatherings.",
//     images: [
//       "https://manyavar.scene7.com/is/image/manyavar/m32673_27-03-2014-22-50-2:650x900",
//       "https://manyavar.scene7.com/is/image/manyavar/ML12114_339.2593_18-07-2023-15-44?wid=1244",
//       "https://manyavar.scene7.com/is/image/manyavar/SDES569_306-BLUE.10450_17-07-2023-11-41:650x900",
//     ],
//     image_link:
//       "https://manyavar.scene7.com/is/image/manyavar/m32673_27-03-2014-22-50-2:650x900",
//     price: 24.99,
//     oldPrice: 29.99,
//     quantityInStock: 6,
//     availableSizes: ["S", "M", "L", "XL", "XXL"],
//     colorOptions: [
//       { title: "Blue", color: "#0000FF" },
//       { title: "White", color: "#FFFFFF" },
//     ],
//     categories: [{ title: "Kurta", slug: "kurta" }],
//     type: ["cotton-kurta"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Manyavar",
//     faqs: [
//       {
//         question: "Is it suitable for summers?",
//         answer: "Yes, it's perfect for hot weather.",
//       },
//     ],
//   },
//   {
//     title: "Royal Red Silk Kurta",
//     slug: "royal-red-silk-kurta",
//     description:
//       "The Royal Red Silk Kurta is an epitome of elegance and tradition, perfect for weddings and special occasions. Made from 100% silk, it adds a royal touch to your attire.",
//     images: [
//       "https://www.kalaniketan.com/media/catalog/product/cache/a21c1d38413de64f1250fbeb2309e062/r/a/rangbaazv25_2513.jpg",
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/kurta/d/t/e/l-men-lk-onlu-kurta-galaxy-zone-original-imagsyw8gxsvrghj.jpeg?q=20&crop=false",
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-kurta/j/l/u/xxl-spsy-plain-only-new-river-view-creation-original-imagt88cnwrrghbx.jpeg?q=90&crop=true",
//     ],
//     image_link:
//       "https://www.kalaniketan.com/media/catalog/product/cache/a21c1d38413de64f1250fbeb2309e062/r/a/rangbaazv25_2513.jpg",
//     price: 49.99,
//     oldPrice: 59.99,
//     quantityInStock: 2,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Red", color: "#FF0000" },
//       { title: "Gold", color: "#FFD700" },
//     ],
//     categories: [{ title: "Kurta", slug: "kurta" }],
//     type: ["silk-kurta"],
//     material: "Silk",
//     fabricType: "Smooth",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "FabIndia",
//     faqs: [
//       {
//         question: "Is the silk pure?",
//         answer: "Yes, it is made from 100% pure silk.",
//       },
//     ],
//   },
//   {
//     title: "Evergreen Cotton Kurta",
//     slug: "evergreen-cotton-kurta",
//     description:
//       "Stay cool and comfortable with the Evergreen Cotton Kurta, designed for those who love a touch of nature in their wardrobe. A must-have for casual outings.",
//     images: [
//       "https://www.tistabene.com/cdn/shop/files/KRT-0397I.jpg?v=1722580002&width=1080",
//       "https://www.tistabene.com/cdn/shop/files/KRT-0397D.jpg?v=1722580003&width=1080",
//       "https://www.tistabene.com/cdn/shop/files/KRT-0397G.jpg?v=1722580003&width=1080",
//     ],
//     image_link:
//       "https://www.tistabene.com/cdn/shop/files/KRT-0397I.jpg?v=1722580002&width=1080",
//     price: 19.99,
//     oldPrice: 24.99,
//     quantityInStock: 3,
//     availableSizes: ["S", "M", "L"],
//     colorOptions: [
//       { title: "Green", color: "#008000" },
//       { title: "White", color: "#FFFFFF" },
//     ],
//     categories: [{ title: "Kurta", slug: "kurta" }],
//     type: ["cotton-kurta"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Hand wash preferred.",
//     origin: "India",
//     brand: "Peter England",
//     faqs: [
//       {
//         question: "Does it shrink after wash?",
//         answer: "Minimal shrinkage with proper care.",
//       },
//     ],
//   },
//   {
//     title: "Midnight Black Silk Kurta",
//     slug: "midnight-black-silk-kurta",
//     description:
//       "The Midnight Black Silk Kurta adds an air of sophistication and elegance to your wardrobe. A perfect choice for evening events and formal occasions.",
//     images: [
//       "https://manyavar.scene7.com/is/image/manyavar/SDES1009_310-Black_401.0426_28-07-2024-22-12:650x900",
//       "https://manyavar.scene7.com/is/image/manyavar/SDES1009_310-Black_101.0437_28-07-2024-22-13:650x900",
//       "https://manyavar.scene7.com/is/image/manyavar/SDES872_310-Black.6521_02-12-2023-18-02:650x900",
//       "https://manyavar.scene7.com/is/image/manyavar/S952521_310-Black.7112_02-12-2023-19-57:650x900",
//     ],
//     image_link:
//       "https://manyavar.scene7.com/is/image/manyavar/SDES1009_310-Black_401.0426_28-07-2024-22-12:650x900",
//     price: 59.99,
//     oldPrice: 64.99,
//     quantityInStock: 5,
//     availableSizes: ["L", "XL", "XXL"],
//     colorOptions: [
//       { title: "Black", color: "#000000" },
//       { title: "Silver", color: "#C0C0C0" },
//     ],
//     categories: [{ title: "Kurta", slug: "kurta" }],
//     type: ["silk-kurta"],
//     material: "Silk",
//     fabricType: "Lustrous",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     brand: "Raymond",
//     faqs: [
//       {
//         question: "Is this suitable for weddings?",
//         answer: "Yes, it is perfect for weddings and formal functions.",
//       },
//     ],
//   },
//   {
//     title: "Sunshine Yellow Cotton Kurta",
//     slug: "sunshine-yellow-cotton-kurta",
//     description:
//       "Brighten up your day with the Sunshine Yellow Cotton Kurta. Ideal for festive occasions or daytime events, this kurta brings warmth and vibrancy to your look.",
//     images: [
//       "https://img2.junaroad.com/uiproducts/19147700/std_300_3-1673332676.jpg",
//       "https://istor.pk/cdn/shop/files/IST-133YELLOW_1.jpg?v=1686815456",
//       "https://istor.pk/cdn/shop/files/IST-133YELLOW_3_copy.jpg?v=1686815456",
//     ],
//     image_link:
//       "https://img2.junaroad.com/uiproducts/19147700/std_300_3-1673332676.jpg",
//     price: 22.99,
//     oldPrice: 27.99,
//     quantityInStock: 8,
//     availableSizes: ["M", "L", "XL", "XXL"],
//     colorOptions: [
//       { title: "Yellow", color: "#FFFF00" },
//       { title: "White", color: "#FFFFFF" },
//     ],
//     categories: [{ title: "Kurta", slug: "kurta" }],
//     type: ["cotton-kurta"],
//     material: "Cotton",
//     fabricType: "Soft",
//     careInstructions: "Machine wash warm.",
//     origin: "India",
//     brand: "Utsav Fashion",
//     faqs: [
//       {
//         question: "Is this kurta lightweight?",
//         answer: "Yes, it's designed to be light and airy.",
//       },
//     ],
//   },
// ];

// const sampleProducts = [
//   {
//     title: "Cotton Kurta",
//     slug: "cotton-kurta",
//     description: "A comfortable cotton kurta perfect for casual outings.",
//     images: [
//       "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
//       "https://manyavar.scene7.com/is/image/manyavar/I03_IMG_0020+copy+copy_09-10-2021-06-36:650x900",
//       "https://ramrajcotton.in/cdn/shop/products/1_aef60397-cbc9-4dee-903b-8d3ed0f9c1e3.jpg?v=1662636401",
//       "https://lablerahulsingh.com/wp-content/uploads/2023/09/LONG-KURTA-MEN-64.jpeg",
//     ],
//     image_link:
//       "https://manyavar.scene7.com/is/image/manyavar/I07_IMGL5556+copy_11-10-2021-06-01:650x900",
//     price: 29.99,
//     oldPrice: 34.99,
//     quantityInStock: 10,
//     availableSizes: ["S", "M", "L", "XL", "XXL"],
//     colorOptions: [
//       { title: "Blue", color: "#0000FF" },
//       { title: "White", color: "#FFFFFF" },
//     ],
//     categories: [
//       { title: "Kurta", slug: "kurta" },
//       { title: "Sherwani", slug: "sherwani" },
//     ],
//     type: ["cotton-kurta", "designer-sherwani"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       { question: "Is this kurta machine washable?", answer: "Yes, it is." },
//       { question: "What sizes are available?", answer: "S, M, L, XL." },
//     ],
//   },
//   {
//     title: "Silk Sherwani",
//     slug: "silk-sherwani",
//     description: "An elegant silk sherwani for weddings and formal events.",
//     images: [
//       "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
//       "https://vastramay.com/cdn/shop/products/VASMIW105BGnK169RGnPANT002RG_1.jpg?v=1677134434",
//       "https://vastramay.com/cdn/shop/products/VASMIW105GNnK169RGnPANT002RG_1.jpg?v=1677134549",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNh2jHXhE-ziLt7Ud6QIXq21KrJD2q494AwNliRuXS3A1EttwL-sD9Dz1Vs-oDwE8f3a0&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcT3zGVPQ5qD82aIOvkUmjHIp8F3iQ96ffIehjFcAkxwo3Rol-m6PONC6LVIGBj3YLzE&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCp6FTf_TnqHO9kp6kJzVmjDIvvviNbTnKi75j3UazRgFreY-1c5co4R8eHDYqTRTq_N8&usqp=CAU",
//     ],
//     image_link:
//       "https://absolutelydesi.com/wp-content/uploads/2023/08/VASTRAMAY-Men-s-Multicolor-Base-Blue-Silk-Blend-Sherwani-With-Kurta-Pant-Set-1.jpg",
//     price: 199.99,
//     oldPrice: 249.99,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Gold", color: "#FFD700" },
//       { title: "Red", color: "#FF0000" },
//     ],
//     categories: [
//       { title: "Sherwani", slug: "sherwani" },
//       { title: "Pathani Suit", slug: "pathani-suit" },
//     ],
//     type: ["designer-sherwani", "designer-pathani"],
//     material: "Silk",
//     fabricType: "Luxury",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     quantityInStock: 20,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Can I get it custom fitted?",
//         answer: "Yes, we offer customization.",
//       },
//       {
//         question: "Is it suitable for summer weddings?",
//         answer: "Yes, it's lightweight.",
//       },
//     ],
//   },
//   {
//     title: "Silk Dhoti",
//     slug: "silk-dhoti",
//     description: "Traditional silk dhoti for festive occasions.",
//     images: [
//       "https://paithanistore.com/cdn/shop/collections/Men-Dhoti-Paithanistore-9454.jpg?v=1710223989",
//       "https://i.etsystatic.com/19394471/r/il/b3d159/4060423971/il_570xN.4060423971_cy2t.jpg",
//       "https://img.perniaspopupshop.com/catalog/product/d/m/DMMC012123_1.jpg?impolicy=detailimageprod",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaNoQ11eOV83k8WGr18mcLoKzFbrWj0-n_gzH-zObAWPQzEukNo-zGHOSQcGIzjqsM8c&usqp=CAU",
//     ],
//     image_link:
//       "https://paithanistore.com/cdn/shop/collections/Men-Dhoti-Paithanistore-9454.jpg?v=1710223989",
//     price: 49.99,
//     oldPrice: 59.99,
//     availableSizes: ["M", "L"],
//     colorOptions: [
//       { title: "Cream", color: "#FFFDD0" },
//       { title: "Maroon", color: "#800000" },
//     ],
//     categories: [{ title: "Dhoti", slug: "dhoti" }],
//     type: ["silk-dhoti", "cotton-dhoti"],
//     material: "Silk",
//     fabricType: "Luxury",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     quantityInStock: 30,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "What occasions is this suitable for?",
//         answer: "Festivals and weddings.",
//       },
//       {
//         question: "Is it comfortable to wear?",
//         answer: "Yes, it's designed for comfort.",
//       },
//     ],
//   },
//   {
//     title: "Cotton Pajama",
//     slug: "cotton-pajama",
//     description: "Soft and breathable cotton pajama for daily wear.",
//     images: [
//       "https://m.media-amazon.com/images/I/31aDoXnUcKS._AC_UY1100_.jpg",
//       "https://m.media-amazon.com/images/I/41BukCw6jbL._AC_UY1100_.jpg",
//       "https://images-eu.ssl-images-amazon.com/images/I/41l2YRF+6VS._AC_SR462,693_.jpg",
//     ],
//     image_link:
//       "https://m.media-amazon.com/images/I/31aDoXnUcKS._AC_UY1100_.jpg",
//     price: 19.99,
//     oldPrice: 24.99,
//     availableSizes: ["S", "M", "L"],
//     colorOptions: [
//       { title: "Gray", color: "#808080" },
//       { title: "Black", color: "#000000" },
//     ],
//     categories: [{ title: "Pajama", slug: "pajama" }],
//     type: ["cotton-pajama"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     quantityInStock: 100,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Are these pajamas suitable for sleeping?",
//         answer: "Yes, they're very comfortable.",
//       },
//       {
//         question: "Do they shrink after washing?",
//         answer: "No, we use pre-shrunk fabric.",
//       },
//     ],
//   },
//   {
//     title: "Denim Jacket",
//     slug: "denim-jacket",
//     description: "Stylish denim jacket for a casual look.",
//     images: [
//       "https://www.psychobunny.com/cdn/shop/products/B6J741X1CO-MTS_1.jpg?v=1694617082",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTF2TnB68-o7gc2Gv5g_qxl2Qg29r9tus4RUJczlW1Vhx8kSNSWqbtRA09lvdkSx1_y1s&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDc2yyOrwdBaWw14EZLtXTmvRA00Wji6Ex1_KxVlYNBphH-0SAP9nPsDprPf6aCgzImY&usqp=CAU",
//       "https://www.bootlegger.com/dw/image/v2/BKBQ_PRD/on/demandware.static/-/Sites-bootlegger-master/default/dw9d6ea27f/images/bootlegger/men/general_apparel/1016723340130_400_2.jpg?sw=864&sh=1152&sm=fit&q=88",
//     ],
//     image_link:
//       "https://www.psychobunny.com/cdn/shop/products/B6J741X1CO-MTS_1.jpg?v=1694617082",
//     price: 59.99,
//     oldPrice: 69.99,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Blue", color: "#0000FF" },
//       { title: "Black", color: "#000000" },
//     ],
//     categories: [{ title: "Jacket", slug: "jacket" }],
//     type: ["denim-jacket"],
//     material: "Denim",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     quantityInStock: 40,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Is it suitable for winter?",
//         answer: "Yes, it's a great layering piece.",
//       },
//       { question: "How should I wash it?", answer: "Machine wash inside out." },
//     ],
//   },
//   {
//     title: "Graphic Shirt",
//     slug: "graphic-shirt",
//     description: "Trendy graphic shirt for casual outings.",
//     images: [
//       "https://assets.mediamodifier.com/mockups/64c3fb78b5c1b14f5bd1597e/asian-male-model-with-t-shirt-mockup-in-simple-background.jpg",
//       "https://assets.mediamodifier.com/mockups/64c2bb6eb5c1b134bbc99abe/t-shirt-psd-mockup-with-young-asian-male-model.jpg",
//       "https://assets.mediamodifier.com/mockups/63f5cba3de66f826d40ae702/t-shirt-on-bright-decorated-background-psd-mockup.jpg",
//       "https://assets.mediamodifier.com/mockups/63d8c0e7922c616db0a99778/man-wearing-t-shirt-mockup-generator.jpg",
//     ],
//     image_link:
//       "https://assets.mediamodifier.com/mockups/64c3fb78b5c1b14f5bd1597e/asian-male-model-with-t-shirt-mockup-in-simple-background.jpg",
//     price: 29.99,
//     oldPrice: 34.99,
//     availableSizes: ["S", "M", "L"],
//     colorOptions: [
//       { title: "White", color: "#FFFFFF" },
//       { title: "Black", color: "#000000" },
//     ],
//     categories: [{ title: "Shirt", slug: "shirt" }],
//     type: ["graphic-shirt"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     quantityInStock: 75,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Is this shirt suitable for summer?",
//         answer: "Yes, it's lightweight and breathable.",
//       },
//       {
//         question: "Do you have other designs?",
//         answer: "Yes, we have various designs available.",
//       },
//     ],
//   },
//   {
//     title: "Graphic Sweater",
//     slug: "graphic-sweater",
//     description: "Warm graphic sweater for chilly days.",
//     images: [
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/b/q/a/xl-hlsw000092-highlander-original-imagxy37zav8hayg.jpeg?q=90&crop=true",
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/8/x/a/xl-hlsw000092-highlander-original-imagxy37eyarfvm6.jpeg?q=20&crop=true",
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/3/m/u/xl-hlsw000092-highlander-original-imagxy37p6yhvgaz.jpeg?q=90&crop=true",
//       "https://rukminim1.flixcart.com/image/300/300/xif0q/sweater/i/w/3/xl-hlsw000091-highlander-original-imagxy37xwmvyvpj.jpeg",
//     ],
//     image_link:
//       "https://rukminim2.flixcart.com/image/850/1000/xif0q/sweater/b/q/a/xl-hlsw000092-highlander-original-imagxy37zav8hayg.jpeg?q=90&crop=true",
//     price: 39.99,
//     oldPrice: 49.99,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "White", color: "#FFFFFF" },
//       { title: "Gray", color: "#808080" },
//       { title: "Navy", color: "#000080" },
//     ],
//     categories: [
//       { title: "Sweater", slug: "sweater" },
//       { title: "Shirt", slug: "shirt" },
//     ],
//     type: ["graphic-sweater", "graphic-shirt"],
//     material: "Acrylic",
//     fabricType: "Warm",
//     careInstructions: "Hand wash recommended.",
//     origin: "India",
//     quantityInStock: 25,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Is this sweater machine washable?",
//         answer: "We recommend hand washing.",
//       },
//       {
//         question: "Does it come in different colors?",
//         answer: "Yes, various colors are available.",
//       },
//     ],
//   },
//   {
//     title: "Cotton Blazer",
//     slug: "cotton-blazer",
//     description: "Smart cotton blazer for formal occasions.",
//     images: [
//       "https://5.imimg.com/data5/SELLER/Default/2022/6/ZU/IA/VA/154385615/mens-suit-741-3-500x500.jpeg",
//       "https://5.imimg.com/data5/SELLER/Default/2022/6/CL/OX/ZD/154385615/mens-suit-741-4-500x500.jpeg",
//       "https://media.debenhams.com/i/debenhams/m5056611983558_blue_xl_1.jpeg",
//       "https://www.makrom.co.uk/cdn/shop/files/Image_3_3_838b802d-7502-4fde-93f8-af6f17d6b8a2.jpg?v=1710514544&width=800",
//     ],
//     image_link:
//       "https://5.imimg.com/data5/SELLER/Default/2022/6/ZU/IA/VA/154385615/mens-suit-741-3-500x500.jpeg",
//     price: 79.99,
//     oldPrice: 89.99,
//     availableSizes: ["M", "L", "XL"],
//     colorOptions: [
//       { title: "Black", color: "#000000" },
//       { title: "Navy", color: "#000080" },
//     ],
//     categories: [
//       { title: "Blazer", slug: "blazer" },
//       { title: "Jacket", slug: "jacket" },
//     ],
//     type: ["cotton-blazer", "denim-jacket"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Dry clean only.",
//     origin: "India",
//     quantityInStock: 15,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Can I wear this blazer casually?",
//         answer: "Yes, it can be styled for both formal and casual looks.",
//       },
//       {
//         question: "Is it available in custom sizes?",
//         answer: "Yes, we offer custom sizing.",
//       },
//     ],
//   },
//   {
//     title: "Designer Pathani",
//     slug: "designer-pathani",
//     description: "Stylish designer pathani suit for festive occasions.",
//     images: [
//       "https://assets0.mirraw.com/images/5552039/1551_long_webp.webp?1710776131",
//       "https://rajubhaihargovindas.com/12198-large_default/grey-pathani-style-premium-cotton-kurta.jpg",
//       "https://theethnic.co/cdn/shop/files/3_aa9dc4e1-fbeb-4307-9b8a-8e639e6322ee.jpg?v=1683266657&width=2160",
//       "https://5.imimg.com/data5/SU/YU/KE/SELLER-23689159/men-s-pathani-shalwar-kurta-500x500.jpg",
//     ],
//     image_link:
//       "https://assets0.mirraw.com/images/5552039/1551_long_webp.webp?1710776131",
//     price: 89.99,
//     oldPrice: 109.99,
//     availableSizes: ["M", "L"],
//     colorOptions: [
//       { title: "Black", color: "#000000" },
//       { title: "White", color: "#FFFFFF" },
//     ],
//     categories: [{ title: "Pathani Suit", slug: "pathani-suit" }],
//     type: ["designer-pathani"],
//     material: "Cotton",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     quantityInStock: 20,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "What occasions is this suitable for?",
//         answer: "Festivals and special events.",
//       },
//       {
//         question: "Is this suit comfortable?",
//         answer: "Yes, it's designed for comfort.",
//       },
//     ],
//   },
//   {
//     title: "Formal Trousers",
//     slug: "formal-trousers",
//     description: "Elegant formal trousers for business meetings.",
//     images: [
//       "https://www.tistabene.com/cdn/shop/products/PNT-0030A_a835537d-95b7-4f50-b692-2ae1accbad94.jpg?v=1658386894&width=1080",
//       "https://media.istockphoto.com/id/499232450/photo/confident-elegant-business-man-with-hands-in-pockets.jpg?s=612x612&w=0&k=20&c=NW_j1fdNw5D2lotnGqunwh1CcwWdnbrbeGQV6OdFE2c=",
//       "https://5.imimg.com/data5/SELLER/Default/2022/7/WU/NC/IB/157166947/mt230-08-2--500x500.JPG",
//       "https://shahzebsaeed.com/cdn/shop/products/CHINOCAMEL29-1.jpg?v=1681122944",
//     ],
//     image_link:
//       "https://www.tistabene.com/cdn/shop/products/PNT-0030A_a835537d-95b7-4f50-b692-2ae1accbad94.jpg?v=1658386894&width=1080",
//     price: 49.99,
//     oldPrice: 59.99,
//     availableSizes: ["32", "34", "36"],
//     colorOptions: [
//       { title: "Charcoal", color: "#333333" },
//       { title: "Navy", color: "#000080" },
//     ],
//     categories: [{ title: "Trousers", slug: "trousers" }],
//     type: ["formal-trousers"],
//     material: "Polyester",
//     fabricType: "Regular",
//     careInstructions: "Machine wash cold.",
//     origin: "India",
//     quantityInStock: 60,
//     brand: "Chimanlal Suresh Kumar (CSK) Textiles",
//     faqs: [
//       {
//         question: "Are these trousers wrinkle-resistant?",
//         answer: "Yes, they are designed to resist wrinkles.",
//       },
//       {
//         question: "Can I wear these to weddings?",
//         answer: "Yes, they can be dressed up for events.",
//       },
//     ],
//   },
// ];

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
//   image_link:
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
