import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";

// Get review based on reviewId
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const { reviewId } = await req.json(); // Extract reviewId from the request body

        if (!reviewId) {
            return NextResponse.json({ error: 'reviewId is required' }, { status: 400 });
        }

        const review = await getReview(reviewId);
        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error fetching' }, { status: 500 });
    }
}

// Fetch review based on reviewId
async function getReview(reviewId: string) {
    if (typeof reviewId !== 'string') {
        throw new Error('Invalid reviewId');
    }

    try {
        const review = await Review.findById(reviewId);
        return review;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw new Error('Error fetching review');
    }
}