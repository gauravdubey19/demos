import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Categories";
import Products from "@/models/Products";

export const POST = async (request: NextRequest) => {
  try {
    const products = await request.json();
    console.log("Received products:", products);

    await connectToDB();

    const savedProducts = await Promise.all(
      products.map(
        async (product: {
          title: string;
          slug: string;
          description: string;
          images: string[];
          mainImage: string;
          price: number;
          oldPrice?: number;
          availableSizes: string[];
          colorOptions: { title: string; color: string }[];
          categories: { title: string; slug: string }[];
          type: string[];
          material: string;
          fabricType?: string;
          careInstructions?: string;
          origin?: string;
          quantityInStock: number;
          brand?: string;
          faqs: { question: string; answer: string }[];
        }) => {
          const {
            title,
            slug,
            description,
            images,
            mainImage,
            price,
            oldPrice,
            availableSizes,
            colorOptions,
            categories,
            type,
            material,
            fabricType,
            careInstructions,
            origin,
            quantityInStock,
            brand,
            faqs,
          } = product;

          const newProduct = new Products({
            title,
            slug,
            description,
            images,
            mainImage,
            price,
            oldPrice,
            availableSizes,
            colorOptions,
            categories,
            type,
            material,
            fabricType,
            careInstructions,
            origin,
            quantityInStock,
            brand,
            faqs,
          });

          return newProduct.save();
        }
      )
    );

    return NextResponse.json(
      { message: `${savedProducts.length} products created successfully!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating products:", error);
    return NextResponse.json(
      { error: "Failed to create products" },
      { status: 500 }
    );
  }
};

// export const POST = async (request: NextRequest) => {
//   try {
//     const products = await request.json();
//     console.log("Received products:", products);

//     await connectToDB();

//     const savedProducts = await Promise.all(
//       products.map(
//         async (product: {
//           title: string;
//           slug: string;
//           description: string;
//           images: string[];
//           mainImage: string;
//           price: number;
//           oldPrice?: number;
//           availableSizes: string[];
//           colorOptions: { title: string; color: string }[];
//           categories: string[];
//           type: string[];
//           material: string;
//           fabricType?: string;
//           careInstructions?: string;
//           origin?: string;
//           quantityInStock: number;
//           brand?: string;
//           faqs: { question: string; answer: string }[];
//         }) => {
//           const {
//             title,
//             slug,
//             description,
//             images,
//             mainImage,
//             price,
//             oldPrice,
//             availableSizes,
//             colorOptions,
//             categories: categorySlugs,
//             type,
//             material,
//             fabricType,
//             careInstructions,
//             origin,
//             quantityInStock,
//             brand = "Chimanlal Suresh Kumar (CSK) Textiles",
//             faqs,
//           } = product;

//           const categoryIds = await Promise.all(
//             categorySlugs.map(async (slug) => {
//               const category = await Categories.findOne({ slug });
//               if (!category) {
//                 throw new Error(`Category with slug '${slug}' not found`);
//               }
//               return category._id;
//             })
//           );

//           const newProduct = new Products({
//             title,
//             slug,
//             description,
//             images,
//             mainImage,
//             price,
//             oldPrice,
//             availableSizes,
//             colorOptions,
//             categories: categoryIds,
//             type,
//             material,
//             fabricType,
//             careInstructions,
//             origin,
//             quantityInStock,
//             brand,
//             faqs,
//           });

//           return newProduct.save();
//         }
//       )
//     );

//     return NextResponse.json(
//       { message: `${savedProducts.length} products created successfully!` },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating products:", error);
//     return NextResponse.json(
//       { error: "Failed to create products" },
//       { status: 500 }
//     );
//   }
// };
