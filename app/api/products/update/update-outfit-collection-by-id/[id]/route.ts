import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";
import { NextRequest } from "next/server"; // import NextRequest type for correct typing

interface Params {
    id: string;
}

export const PUT = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        const { id } = params;
        const { outfitTitle, outfitImage, productCollection } = await req.json();

        await connectToDB();

        const updatedOutfit = await OutfitCollection.findByIdAndUpdate(
            id,
            { outfitTitle, outfitImage, productCollection },
            { new: true } // Return the updated document
        );

        if (!updatedOutfit) {
            return NextResponse.json(
                { error: "Outfit not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ outfit: updatedOutfit }, { status: 200 });
    } catch (error) {
        console.error("Error updating outfit:", error);
        return NextResponse.json(
            { error: "Failed to update outfit" },
            { status: 500 }
        );
    }
};