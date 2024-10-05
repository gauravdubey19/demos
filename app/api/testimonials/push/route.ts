import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Testimonial from "@/models/Testimonial";

export const POST = async (request: NextRequest) => {
  try {
    const { fullName, personTitle, testimony, rating, videoLink } =
      await request.json();

    // Validate required fields
    if (!fullName || !personTitle || !testimony || isNaN(rating)) {
      return NextResponse.json(
        { error: "All fields are required except video" },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create new testimonial in database
    const newTestimonial = new Testimonial({
      fullName,
      personTitle,
      testimony,
      rating,
      videoLink,
    });

    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json(
      {
        message: "Testimonial created successfully",
        testimonial: savedTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
};
