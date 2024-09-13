import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";

//creating a review based on productSlug, rating, review_descr
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { productSlug, rating, review_descr,username,userAvatar,userId } = await req.json(); // Extract productSlug, rating, review_descr from the request body

        if (!productSlug || !rating || !review_descr||!username||!userAvatar || !userId) {
            return NextResponse.json({ error: 'productSlug, rating, review_descr,username, userId, userAvatar are required' }, { status: 400 });
        }

        const review = await createReview(productSlug, rating, review_descr,username,userAvatar,userId);
        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error creating' }, { status: 500 });
    }
}

// Create review based on productSlug, rating, review_descr
async function createReview(productSlug: string, rating: number, review_descr: string,username:string,userAvatar:string,userId:string) {
    if (typeof productSlug !== 'string' || typeof rating !== 'number' || typeof review_descr !== 'string' || typeof username !== 'string' || typeof userAvatar !== 'string' || typeof userId !== 'string') {
        throw new Error('Invalid input');
    }

    try {
        const review = await Review.create({ productSlug, rating, review_descr,username,userAvatar,userId });
        return review;
    } catch (error) {
        console.error('Error creating review:', error);
        throw new Error('Error creating review');
    }
}