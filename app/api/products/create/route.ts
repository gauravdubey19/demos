import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";

export const POST = async (request: { json: () => any }) => {
  try {
    const {
      title,
      slug,
      description,
      images,
      mainImage,
      price,
      oldPrice,
      discount,
      ratings,
      reviews,
      availableSizes,
      colorOptions,
      material,
      fabricType,
      careInstructions,
      countryOfManufacture,
      faqs,
    } = await request.json();

    // console.log("Parsed product data:", {
    //   title,
    //   slug,
    //   description,
    //   images,
    //   mainImage,
    //   price,
    //   oldPrice,
    //   discount,
    //   ratings,
    //   reviews,
    //   availableSizes,
    //   colorOptions,
    //   material,
    //   fabricType,
    //   careInstructions,
    //   countryOfManufacture,
    //   faqs,
    // });

    await connectToDB();

    const newProduct = new Products({
      title,
      slug,
      description,
      images,
      mainImage,
      price,
      oldPrice,
      discount,
      ratings,
      reviews,
      availableSizes,
      colorOptions,
      material,
      fabricType,
      careInstructions,
      countryOfManufacture,
      faqs,
    });

    const savedProduct = await newProduct.save();
    // console.log("Saved product:", savedProduct);

    return NextResponse.json(
      { message: "Product created successfully!" },
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
