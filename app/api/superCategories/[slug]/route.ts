import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { SuperCategories } from "@/models/SuperCategories";

// Get super category by slug
export const GET = async (request: NextRequest, { params }: { params: { slug: string } }) => {
    const { slug } = params;

    try {
        await connectToDB();

        // Find super category by slug
        const superCategory = await SuperCategories.findOne({ slug });

        if (!superCategory) {
            return NextResponse.json({ message: "Super category not found" }, { status: 404 });
        }

        return NextResponse.json({ superCategory }, { status: 200 });
    } catch (error) {
        console.error("Error fetching super category:", error);
        return NextResponse.json({ error: "Failed to fetch super category" }, { status: 500 });
    }
};
