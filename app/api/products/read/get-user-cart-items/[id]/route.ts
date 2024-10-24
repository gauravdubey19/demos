import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";
import NewProduct from "@/models/NewProduct";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Connect to database
    await connectToDB();
    console.log("user id", params.id);

    // Find the cart for the user and populate the `productId` within each cartItem
    const cart = await Cart.findOne({ userId: params.id }).populate({
      path: "cartItems.productId",
      select: "images_collection price",
    });

    // Handle case where cart is not found
    if (!cart) {
      return NextResponse.json(
        { error: "User cart not found" },
        { status: 404 }
      );
    }

    // Extract product IDs from cart items
    const productIds = cart.cartItems.map((item: any) => item.productId._id);

    // Fetch only the images_collection field for the products
    const products = await NewProduct.find({
      _id: { $in: productIds },
    }).select("images_collection");

    // Return the populated cart items
    return NextResponse.json(cart.cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart for user ID:", params.id, error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
};