import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
// import Products from "@/models/Products";
import NewProduct from "@/models/NewProduct";

export const GET = async () => {
  try {
    await connectToDB();

    const products = await NewProduct.find({});

    if (!products) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 }
      );
    }

    return NextResponse.json( products , { status: 200 });
  } catch (error) {
    console.error("Error fetching products :", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
