import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";

export const GET = async () => {
  try {
    await connectToDB();
    const outfits = await OutfitCollection.find({});

    return NextResponse.json({ outfits }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Outfit Collection:", error);
    return NextResponse.json(
      { error: "Failed to fetch Outfit Collection" },
      { status: 500 }
    );
  }
};
