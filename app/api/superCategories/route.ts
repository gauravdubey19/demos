import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { SuperCategories } from "@/models/SuperCategories";

export const POST = async (request: NextRequest) => {
  try {
    const superCategories = await request.json();
    console.log("Received superCategories:", superCategories);

    await connectToDB();

    const savedSuperCategories = await Promise.all(
      superCategories.map(
        async (superCategory: {
          title: string;
          slug: string;
          categories: { title: string; slug: string }[];
        }) => {
          const { title, slug, categories } = superCategory;

          const newSuperCategory = new SuperCategories({
            title,
            slug,
            categories,
          });

          return newSuperCategory.save();
        }
      )
    );

    return NextResponse.json(
      { message: `${savedSuperCategories.length} superCategories created successfully!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating superCategories:", error);
    return NextResponse.json(
      { error: "Failed to create superCategories" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const superCategories = await SuperCategories.find({});

    return NextResponse.json({ superCategories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching superCategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch superCategories" },
      { status: 500 }
    );
  }
};