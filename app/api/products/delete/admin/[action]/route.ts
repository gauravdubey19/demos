import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { utapi } from "@/server/uploadthing";
import { extractFileKey } from "@/lib/utils";
import { Categories } from "@/models/Categories";
import Products from "@/models/Products";
import NewProduct from "@/models/NewProduct";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { action: string } }
) => {
  try {
    const { id }: { id: string } = await request.json();
    const { action } = params;

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    if (action === "delete-product") {
      const product = await NewProduct.findById(id);

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      await NewProduct.deleteOne({ _id: id });

      return NextResponse.json(
        { message: "Product deleted successfully!" },
        { status: 200 }
      );
    }

    if (action === "delete-category") {
      const category = await Categories.findById(id);

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      const key = extractFileKey(category?.image);
      // console.log("key:", key, category?.image);

      const res = await utapi.deleteFiles(key);
      // console.log(res);

      if (res.success) {
        await Categories.deleteOne({ _id: id });
        return NextResponse.json(
          {
            message: "Category deleted successfully",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Category Image wasn't able to deleted!" },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error while processing request:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing the request" },
      { status: 500 }
    );
  }
};
