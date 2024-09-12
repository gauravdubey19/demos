import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Categories";

export const POST = async (request: NextRequest) => {
  try {
    const { title, slug, image } = await request.json();

    await connectToDB();

    const newCategory = new Categories({ title, slug, image });

    const savedCategory = await newCategory.save();
    // console.log("Saved category:", savedCategory);

    return NextResponse.json(
      { message: "Category created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
};
