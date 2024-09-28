import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Categories";

export const GET = async (
  request: NextRequest,
  { params }: { params: { require: string; id: string } }
) => {
  const { require, id } = params;
  // console.log(require, id);
  if (!require || !id) {
    return NextResponse.json(
      { error: "Admin! 'require' & 'id' is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    if (require === "category-detail") {
      const category = await Categories.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(category, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching cart for user ID:", params.require, error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
};
