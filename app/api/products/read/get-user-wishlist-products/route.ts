import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/utils/db";
// import Products from "@/models/Products";
import NewProduct from "@/models/NewProduct";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No valid ids provided" },
        { status: 400 }
      );
    }

    await connectToDB();

    const objectIds = ids.map((id: string) => new ObjectId(id));
    const products = await NewProduct.find({ _id: { $in: objectIds } });

    if (products.length === 0) {
      return NextResponse.json(
        { error: "No products found for the provided ids" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by ids:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
