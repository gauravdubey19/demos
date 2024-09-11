import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Products";

export const GET = async () => {
  try {
    await connectToDB();
    const categories = await Categories.find({});

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};
