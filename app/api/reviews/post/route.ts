import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";

//creating a review based on productId, rating, review_title, review_descr
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { productId, rating, review_title, review_descr } = await req.json(); // Extract productId, rating, review_title, review_descr from the request body

        if (!productId || !rating || !review_title || !review_descr) {
            return NextResponse.json({ error: 'productId, rating, review_title, review_descr are required' }, { status: 400 });
        }

        const review = await createReview(productId, rating, review_title, review_descr);
        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error creating' }, { status: 500 });
    }
}

// Create review based on productId, rating, review_title, review_descr
async function createReview(productId: string, rating: number, review_title: string, review_descr: string) {
    if (typeof productId !== 'string' || typeof rating !== 'number' || typeof review_title !== 'string' || typeof review_descr !== 'string') {
        throw new Error('Invalid input');
    }

    try {
        const review = await Review.create({ productId, rating, review_title, review_descr });
        return review;
    } catch (error) {
        console.error('Error creating review:', error);
        throw new Error('Error creating review');
    }
}