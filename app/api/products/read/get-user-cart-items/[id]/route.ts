import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";
import Products from "@/models/Products";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectToDB();

    const cart = await Cart.findOne({ userId: params.id }).populate(
      "cartItems.productId", "price oldPrice"
    );

    console.log(cart);

    if (!cart) {
      return NextResponse.json(
        { error: "User cart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart.cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart for user ID:", params.id, error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
};