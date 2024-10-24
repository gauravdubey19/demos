import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/Cart";
import { CartItem } from "@/lib/types";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { action: string } }
) => {
  try {
    const { action } = params;
    const { userId, productId, color, size } = await request.json();
    // console.log(userId, productId, color, size, action);
    console.log("PRoduct ID", productId);
    console.log("action: ", action);
    if (
      !["increment", "decrement", "remove", "upd-color", "upd-size"].includes(
        action
      )
    ) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectToDB();

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item: CartItem) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    if (action === "increment") {
      cart.cartItems[itemIndex].quantity += 1;
    } else if (action === "decrement") {
      if (cart.cartItems[itemIndex].quantity > 1) {
        cart.cartItems[itemIndex].quantity -= 1;
      } else {
        return NextResponse.json(
          { error: "Quantity cannot be less than 1" },
          { status: 400 }
        );
      }
    } else if(action==="resetQuantity"){
      console.log("entered resetQuantity")
      cart.cartItems[itemIndex].quantity = 1;
    }
    else if (action === "remove") {
      cart.cartItems.splice(itemIndex, 1);
    } else if (action === "upd-color" && color) {
      cart.cartItems[itemIndex].selectedColor = color;
      cart.cartItems[itemIndex].quantity= 1;
    } else if (action === "upd-size" && size) {
      cart.cartItems[itemIndex].selectedSize = size;
      cart.cartItems[itemIndex].quantity= 1;
    } else {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    await cart.save();

    return NextResponse.json(
      { message: `Item ${action}ed successfully!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Something went wrong while updating cart" },
      { status: 500 }
    );
  }
};
