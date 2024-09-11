import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";

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
      material,
      fabricType,
      careInstructions,
      countryOfManufacture,
      faqs,
    } = await request.json();

    await connectToDB();

    // Generate a unique slug
    const uniqueSlug = await generateUniqueSlug(slug);

    const newProduct = new Products({
      title,
      slug: uniqueSlug,
      description,
      images,
      mainImage,
      price,
      oldPrice,
      availableSizes,
      colorOptions,
      categories,
      material,
      fabricType,
      careInstructions,
      countryOfManufacture,
      faqs,
    });

    const savedProduct = await newProduct.save();
    // console.log("Saved product:", savedProduct);

    return NextResponse.json(
      { message: "Product created successfully!", product: savedProduct },
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
