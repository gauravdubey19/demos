import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Testimonial from "@/models/Testimonial";
// import { utapi } from "@/server/uploadthing";
import { v2 as cloudinary } from "cloudinary";
import { convertSecureUrlToPublicId } from "@/lib/utils";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const testimonials = await Testimonial.find().sort({ _id: -1 }); // Sort by newest first
    if (!testimonials) {
      return NextResponse.json(
        {
          message: "Dataset Testimonials not found!",
        },
        { status: 400 }
      );
    }
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

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (request: NextRequest) => {
  try {
    const { _id, key }: { _id: string; key: string } = await request.json();
    if (!_id) {
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
    // const public_id = convertSecureUrlToPublicId(testimonials.videoLink);
    // console.log(public_id);
    
    // const res = await cloudinary.uploader.destroy(public_id);

    // console.log(res);
    // const res = await utapi.deleteFiles(key);

    // console.log(res);
    // if (res.result === "ok") {
      await Testimonial.deleteOne({ _id });
      return NextResponse.json(
        {
          message: "Testimonials deleted successfully",
        },
        { status: 200 }
      );
    // }
    
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
};
