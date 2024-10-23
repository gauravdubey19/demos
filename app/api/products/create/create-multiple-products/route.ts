import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import NewProduct from "@/models/NewProduct";
import { generateRandomSku, generateSlug } from "@/lib/utils";

export const POST = async (request: NextRequest) => {
  try {
    const products = await request.json();
    // console.log("Received products:", products);

    await connectToDB();

    const savedProducts = await Promise.all(
      products.map(
        async (product: {
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
          ratings?: number;
          reviews_number?: number;
        }) => {
          const {
            title,
            description,
            price,
            material,
            fabric_type,
            care_instructions,
            origin,
            brand,
            categories,
            type,
            faqs,
            sale_price,
            sale_price_effective_date,
            pattern,
            availability,
            availability_date,
            sell_on_google_quantity,
            product_highlights,
            images_collection,
            ratings = 0,
            reviews_number = 0,
          } = product;

          const newProduct = new NewProduct({
            sku: generateRandomSku(),
            title,
            slug: generateSlug(title),
            description,
            price,
            sale_price,
            sale_price_effective_date,
            ratings,
            reviews_number,
            categories,
            product_highlights,
            type,
            material,
            pattern,
            fabric_type,
            care_instructions,
            origin,
            availability,
            availability_date,
            brand,
            images_collection,
            faqs,
            sell_on_google_quantity,
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
