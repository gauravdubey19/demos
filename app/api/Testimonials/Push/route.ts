import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Testimonial from "@/models/Testimonial";
import { UTFile } from "uploadthing/server";
import { utapi } from "@/server/uploadthing";

export const POST = async (request: NextRequest) => {
    try {
        const contentType = request.headers.get("Content-Type");

        if (!contentType?.startsWith("multipart/form-data")) {
            throw new Error("Content-Type must be multipart/form-data");
        }

        const formData = await request.formData();
        const fullName = formData.get("fullName") as string;
        const personTitle = formData.get("personTitle") as string;
        const testimony = formData.get("testimony") as string;
        const rating = parseInt(formData.get("rating") as string);
        const video = formData.get("video") as File | null;

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

        let videoUrl = "";

        // Upload video to Uploadthing if provided
        if (video) {
            const uploadedVideo = await utapi.uploadFiles([
                new UTFile([video], video.name),
            ]);

            if (!uploadedVideo[0].data?.url) {
                throw new Error("Failed to upload video");
            }

            videoUrl = uploadedVideo[0].data.url;
        }

        await connectToDB();

        // Create new testimonial in database
        const newTestimonial = new Testimonial({
            fullName,
            personTitle,
            testimony,
            rating,
            videoLink: videoUrl || undefined, // Only add if video was uploaded
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