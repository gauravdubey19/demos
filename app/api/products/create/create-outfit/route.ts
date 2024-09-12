import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";

const generateUniqueSlug = async (slug: string): Promise<string> => {
  let uniqueSlug = slug;
  let slugExists = await OutfitCollection.findOne({ outfitSlug: uniqueSlug });

  let counter = 1;
  while (slugExists) {
    uniqueSlug = `${slug}-${counter}`;
    slugExists = await OutfitCollection.findOne({ outfitSlug: uniqueSlug });
    counter++;
  }

  return uniqueSlug;
};

export const POST = async (request: NextRequest) => {
  try {
    const { outfitTitle, outfitSlug, outfitImage, productCollection } =
      await request.json();

    // Validate input
    if (!outfitTitle || !outfitSlug || !outfitImage || !productCollection) {
      return NextResponse.json(
        {
          error:
            "All fields (outfitTitle, outfitSlug, outfitImage, productCollection) are required.",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const uniqueSlug = await generateUniqueSlug(outfitSlug);

    const newOutfit = new OutfitCollection({
      outfitTitle,
      outfitSlug: uniqueSlug,
      outfitImage,
      productCollection,
    });

    const savedOutfit = await newOutfit.save();

    return NextResponse.json(
      { message: "Outfit created successfully!", outfit: savedOutfit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating outfit:", error);

    // Provide a more informative error message
    return NextResponse.json(
      { error: "Failed to create outfit. Please try again later." },
      { status: 500 }
    );
  }
};
