import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import Review from "@/models/Review";

export const POST = async (request: NextRequest) => {
  try {
    // await connectToDB();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};
