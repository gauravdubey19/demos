import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Review from "@/models/Reviews";

// Get review based on productId

export async function GET(req: NextRequest) {
    try {
      await connectToDB();
      const { searchParams } = new URL(req.url);
      const productId = searchParams.get('productId');
  
      if (!productId) {
        return NextResponse.json({ error: 'productId is required' }, { status: 400 });
      }
  
      const review = await getReview(productId);
      return NextResponse.json({ reviews: review }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'error fetching' }, { status: 500 });
    }
  }

// Fetch review based on productId
async function getReview(productId: string) {
    if (typeof productId !== 'string') {
        throw new Error('Invalid productId');
    }

    try {
        const review = await Review.find({ productSlug: productId });
        return review;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw new Error('Error fetching review');
    }
}