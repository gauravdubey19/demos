import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import NewProduct from "@/models/NewProduct";

// GET request to retrieve all products
export const GET = async () => {
  try {
    await connectToDB();
    const products = await NewProduct.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
