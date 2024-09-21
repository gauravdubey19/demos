import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export const DELETE = async (request: NextRequest) => {
  try {
    const { userId, productId } = await request.json(); // console.log(userId, productId);

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

    // Check if productId exists in favProducts
    if (!user.favProducts.includes(productId)) {
      return NextResponse.json(
        { error: "Product not found in wishlist" },
        { status: 404 }
      );
    }

    // Remove the productId from favProducts
    user.favProducts = user.favProducts.filter(
      (_id: { toString: () => any }) => _id.toString() !== productId
    );
    await user.save();

    return NextResponse.json(
      { message: "Removed from wishlist successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while removing from wishlist:", error);
    return NextResponse.json(
      { error: "Something went wrong while removing from wishlist" },
      { status: 500 }
    );
  }
};
