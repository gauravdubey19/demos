import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import NewProduct from "@/models/NewProduct";
import { generateRandomSku, generateSlug } from "@/lib/utils";

const generateUniqueSlug = async (slug: string) => {
  let uniqueSlug = slug;
  let slugExists = await NewProduct.findOne({ slug: uniqueSlug });

  let counter = 1;
  while (slugExists) {
    uniqueSlug = `${slug}-${counter}`;
    slugExists = await NewProduct.findOne({ slug: uniqueSlug });
    counter++;
  }

  return uniqueSlug;
};

const generateUniqueSku = async (sku: string) => {
  let uniqueSku = sku;
  let skuExists = await NewProduct.findOne({ sku: uniqueSku });

  while (skuExists) {
    uniqueSku = generateRandomSku();
    skuExists = await NewProduct.findOne({ sku: uniqueSku });
  }

  return uniqueSku;
};

export const POST = async (request: NextRequest) => {
  try {
    const {
      title,
      description,
      price,
      sale_price,
      sale_price_effective_date,
      ratings = 0,
      reviews_number = 0,
      categories,
      product_highlights,
      type,
      material,
      pattern,
      fabric_type,
      care_instructions,
      origin = "India",
      availability = "in_stock",
      availability_date,
      brand = "Chimanlal Suresh Kumar (CSK) Textiles",
      images_collection,
      faqs,
      sell_on_google_quantity,
    }: {
      title: string;
      description: string;
      price: number;
      sale_price?: number;
      sale_price_effective_date?: string;
      ratings?: number;
      reviews_number?: number;
      categories: { title: string; slug: string }[];
      product_highlights?: string[];
      type?: string[];
      material: string;
      pattern?: string;
      fabric_type?: string;
      care_instructions?: string;
      origin?: string;
      availability?: string;
      availability_date?: Date;
      brand?: string;
      images_collection: {
        image_link: string;
        color: string;
        color_name: string;
        images: string[];
        quantity: { size: string; quantity: number }[];
      }[];
      faqs?: { question: string; answer: string }[];
      sell_on_google_quantity?: number;
    } = await request.json();

    // console.log({
    //   title,
    //   description,
    //   price,
    //   sale_price,
    //   sale_price_effective_date,
    //   ratings,
    //   reviews_number,
    //   categories,
    //   product_highlights,
    //   type,
    //   material,
    //   pattern,
    //   fabric_type,
    //   care_instructions,
    //   origin,
    //   availability,
    //   availability_date,
    //   brand,
    //   images_collection,
    //   faqs,
    //   sell_on_google_quantity,
    // });

    await connectToDB();

    const slug = generateSlug(title);
    const uniqueSlug = await generateUniqueSlug(slug);

    const sku = generateRandomSku();
    const uniqueSku = await generateUniqueSku(sku);

    const newProduct = new NewProduct({
      sku: uniqueSku,
      title,
      slug: uniqueSlug,
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

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      {
        message: `${savedProduct.title} product created successfully!`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
};
