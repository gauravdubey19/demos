import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // if productId already exists in favProducts
    if (user.favProducts.includes(productId)) {
      return NextResponse.json(
        { error: "Product already in wishlist" },
        { status: 400 }
      );
    }

    // else add the productId to favProducts
    user.favProducts.push(productId);
    await user.save();

    return NextResponse.json(
      { message: "Added to wishlist successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding to wishlist:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding to wishlist" },
      { status: 500 }
    );
  }
};
