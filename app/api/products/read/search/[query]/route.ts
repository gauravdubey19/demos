import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";

export const GET = async (
    request: NextRequest,
    { params }: { params: { query: string } }
) => {
    const { query } = params;

    try {
        // Connect to the database
        await connectToDB();

        let products = [];

        if (query) {
            // Perform a text search using regex with case-insensitivity
            products = await Products.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { slug: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ],
            });

        }
        // console.log("Products", products)

        // Return products found in the search
        return NextResponse.json({ products });

    } catch (error) {
        console.error("Error performing text search:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
};
