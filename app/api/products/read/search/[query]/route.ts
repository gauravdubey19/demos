import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";

export const GET = async (
  request: NextRequest,
  { params }: { params: { query: string } }
) => {
  const { query } = params;

  try {
    await connectToDB();

    let products = [];

    if (query) {
      // performing text search using regex with case-insensitivity
      products = await Products.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { slug: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
    }

    // checking if products were found
    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found matching your query." },
        { status: 404 }
      );
    }

    // returning products found in the search
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error performing text search:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
