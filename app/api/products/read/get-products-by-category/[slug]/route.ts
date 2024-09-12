import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await connectToDB();

    const products = await Products.find({
      "categories.slug": params.slug,
    });
    // console.log(products);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch products by category slug" },
      { status: 500 }
    );
  }
};
