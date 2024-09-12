import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";

// Delete review based on reviewId
export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const { reviewId } = await req.json(); // Extract reviewId from the request body

        if (!reviewId) {
            return NextResponse.json({ error: 'reviewId is required' }, { status: 400 });
        }

        const result = await deleteReview(reviewId);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error deleting' }, { status: 500 });
    }
}
//Delete review based on reviewId
async function deleteReview(reviewId: string) {
    if (typeof reviewId !== 'string') {
        throw new Error('Invalid reviewId');
    }

    try {
        const review = await Review.findByIdAndDelete(reviewId);
        return review;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw new Error('Error deleting review');
    }
}