import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";
import { generateSlug } from "@/lib/utils";

// Get Outfits
export async function GET(req: NextRequest) {
  await connectToDB();

  try {
    const outfits = await OutfitCollection.find();
    return NextResponse.json(outfits, { status: 200 });
  } catch (error) {
    console.error("Error fetching outfits:", error);
    return NextResponse.json(
      { error: "Error fetching outfits" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  await connectToDB();

  const { outfitTitle, outfitImage, productCollection } = await req.json();

  if (!outfitTitle || !outfitImage || !Array.isArray(productCollection)) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Generate initial slug
  let outfitSlug = generateSlug(outfitTitle);

  // Check for uniqueness and append numericals if necessary
  let uniqueSlug = outfitSlug;
  let counter = 1;
  while (await OutfitCollection.findOne({ outfitSlug: uniqueSlug })) {
    uniqueSlug = `${outfitSlug}-${counter}`;
    counter++;
  }
  outfitSlug = uniqueSlug;
  console.log("Generated slug:", outfitSlug);
  try {
    const newOutfit = new OutfitCollection({
      outfitTitle,
      outfitSlug,
      outfitImage,
      productCollection,
    });

    const savedOutfit = await newOutfit.save();
    return NextResponse.json(
      { message: "Outfit added successfully", outfit: savedOutfit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding outfit:", error);
    return NextResponse.json({ error: "Error adding outfit" }, { status: 500 });
  }
}
// Update Outfit
export async function PUT(
  req: NextRequest,
  { params }: { params: { outfitId: string } }
) {
  await connectToDB();

  const { outfitId } = params;
  const { outfitTitle, outfitSlug, outfitImage, productCollection } =
    await req.json();

  if (!outfitId || Array.isArray(outfitId)) {
    return NextResponse.json(
      { error: "Valid Outfit ID is required" },
      { status: 400 }
    );
  }

  try {
    const outfit = await OutfitCollection.findById(outfitId);

    if (!outfit) {
      return NextResponse.json({ error: "Outfit not found" }, { status: 404 });
    }

    outfit.outfitTitle = outfitTitle ?? outfit.outfitTitle;
    outfit.outfitSlug = outfitSlug ?? outfit.outfitSlug;
    outfit.outfitImage = outfitImage ?? outfit.outfitImage;
    outfit.productCollection = productCollection ?? outfit.productCollection;

    const updatedOutfit = await outfit.save();
    return NextResponse.json(
      { message: "Outfit updated successfully", outfit: updatedOutfit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating outfit:", error);
    return NextResponse.json(
      { error: "Error updating outfit" },
      { status: 500 }
    );
  }
}

// Delete Outfit
export async function DELETE(
  req: NextRequest,
  { params }: { params: { outfitId: string } }
) {
  await connectToDB();

  const { outfitId } = params;

  if (!outfitId || Array.isArray(outfitId)) {
    return NextResponse.json(
      { error: "Valid Outfit ID is required" },
      { status: 400 }
    );
  }

  try {
    const outfit = await OutfitCollection.findByIdAndDelete(outfitId);

    if (!outfit) {
      return NextResponse.json({ error: "Outfit not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Outfit deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting outfit:", error);
    return NextResponse.json(
      { error: "Error deleting outfit" },
      { status: 500 }
    );
  }
}
