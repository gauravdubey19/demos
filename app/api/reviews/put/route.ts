import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";
import Products from "@/models/Products";

// Update a review based on reviewId
export async function PUT(req: NextRequest) {
    try {
        await connectToDB();
        const { reviewId, rating, review_descr } = await req.json();

        if (!reviewId) {
            return NextResponse.json({ error: 'reviewId is required' }, { status: 400 });
        }

        const review = await updateReview(reviewId, rating, review_descr);
        await updateProductSchema(review.productId); // Update the product schema

        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error updating' }, { status: 500 });
    }
}

// Update review based on reviewId
async function updateReview(reviewId: string, rating: number, review_descr: string) {
    if (!reviewId) {
        throw new Error('Review ID is required');
    }

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        review.rating = rating ?? review.rating;
        review.review_descr = review_descr ?? review.review_descr;
        await review.save();
        return review;
    } catch (error) {
        console.error('Error updating review:', error);
        throw new Error('Error updating review');
    }
}

// Update product schema based on productId
async function updateProductSchema(productId: string) {
    try {
        const reviews = await Review.find({ productId });
        const reviewsNumber = reviews.length;
        const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRatings / reviewsNumber;

        await Products.updateOne({ _id: productId }, { reviewsNumber, ratings: averageRating });
    } catch (error) {
        console.error('Error updating product schema:', error);
        throw new Error('Error updating product schema');
    }
}