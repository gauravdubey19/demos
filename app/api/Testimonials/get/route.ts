import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Testimonial from "@/models/Testimonial";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    // Fetch all testimonials from the database
    const testimonials = await Testimonial.find({}).sort({ _id: -1 }); // Sort by newest first

    return NextResponse.json(
      {
        message: "Testimonials fetched successfully",
        testimonials: testimonials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
};