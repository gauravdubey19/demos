import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";
import { NextRequest } from "next/server";

interface Params {
    id: string;
}

export const GET = async (request: NextRequest, { params }: { params: {Id:string} }) => {
    try {
        console.log("Received params:", params);
        console.log("Received request URL:", request.url);

        const { Id } = params;
        await connectToDB();

        console.log("Extracted ID:", params.Id);

        if (!Id) {
            console.error("ID is undefined");
            return NextResponse.json(
                { error: "Invalid ID provided" },
                { status: 400 }
            );
        }

        const outfit = await OutfitCollection.findById(params.Id);

        if (!outfit) {
            console.error(`Outfit not found with ID: ${Id}`);
            return NextResponse.json(
                { error: "Outfit not found" },
                { status: 404 }
            );
        }
        console.log("Found outfit:", outfit);

        return NextResponse.json({ outfit }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Outfit Collection by ID:", error);
        return NextResponse.json(
            { error: "Failed to fetch Outfit Collection by ID" },
            { status: 500 }
        );
    }
};