import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
// import Products from "@/models/Products";
import NewProduct from "@/models/NewProduct";

export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  console.log(params);
  try {
    await connectToDB();

    const product = await NewProduct.findOne({ slug: params.slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};
