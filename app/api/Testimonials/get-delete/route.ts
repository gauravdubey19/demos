import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Testimonial from "@/models/Testimonial";
import { utapi } from "@/server/uploadthing";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const testimonials = await Testimonial.find(); //.sort({ _id: -1 }); // Sort by newest first

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

export const DELETE = async (request: NextRequest) => {
  try {
    const { _id, key }: { _id: string; key: string } = await request.json();
    if (!_id || !key) {
      return NextResponse.json(
        { error: "Missing testimonials ID and key" },
        { status: 400 }
      );
    }

    await connectToDB();

    const testimonials = await Testimonial.findById(_id);
    if (!testimonials) {
      return NextResponse.json(
        { error: "Testimonials not found" },
        { status: 404 }
      );
    }
    const res = await utapi.deleteFiles(key);

    // console.log(res);
    if (res.success) {
      await Testimonial.deleteOne({ _id });
      return NextResponse.json(
        {
          message: "Testimonials deleted successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        error: "Someting went wrong while deleting",
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
