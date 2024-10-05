import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";
// import { UTFile } from "uploadthing/server";
// import { utapi } from "@/server/uploadthing";
import { generateSlug } from "@/lib/utils";

const generateUniqueSlug = async (slug: string) => {
  let uniqueSlug = slug;
  let slugExists = await Products.findOne({ slug: uniqueSlug });

  let counter = 1;
  while (slugExists) {
    uniqueSlug = `${slug}-${counter}`;
    slugExists = await Products.findOne({ slug: uniqueSlug });
    counter++;
  }

  return uniqueSlug;
};

export const POST = async (request: NextRequest) => {
  try {
    const {
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
      type,
      material,
      fabricType,
      careInstructions,
      origin,
      brand,
      faqs,
    }: {
      image_link: string;
      images: string[];
      title: string;
      description: string;
      price: number;
      oldPrice: number;
      quantityInStock: number;
      availableSizes: string[];
      colorOptions: {
        title: string;
        color: string;
      }[];
      categories: { title: string; slug: string }[];
      type: string[];
      material: string;
      fabricType: string;
      careInstructions: string;
      origin: string;
      brand: string;
      faqs: {
        question: string;
        answer: string;
      }[];
    } = await request.json();

    // console.log(image_link,
    //   images,
    //   title,
    //   description,
    //   price,
    //   oldPrice,
    //   quantityInStock,
    //   availableSizes,
    //   colorOptions,
    //   categories,
    //   type,
    //   material,
    //   fabricType,
    //   careInstructions,
    //   origin,
    //   brand,
    //   faqs,);

    await connectToDB();

    const slug = generateSlug(title);
    const uniqueSlug = await generateUniqueSlug(slug);

    const newProduct = new Products({
      title,
      slug: uniqueSlug,
      description,
      image_link,
      images,
      price,
      oldPrice,
      quantityInStock,
      availableSizes,
      colorOptions,
      categories,
      type,
      material,
      fabricType,
      careInstructions,
      origin,
      brand,
      faqs,
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
