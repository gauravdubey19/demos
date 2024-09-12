import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";

export const POST = async (request: NextRequest) => {
  try {
    const { title, slug, image, productCollection } = await request.json();

    await connectToDB();

    const newOutfit = new OutfitCollection({
      title,
      slug,
      image,
      productCollection,
    });

    const savedOutfit = await newOutfit.save();
    // console.log("Saved outfit:", savedOutfit);

    return NextResponse.json(
      { message: "Outfit created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating outfit:", error);
    return NextResponse.json(
      { error: "Failed to create outfit" },
      { status: 500 }
    );
  }
};
