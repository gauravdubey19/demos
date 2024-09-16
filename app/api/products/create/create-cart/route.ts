import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/Cart";
import { CartItem } from "@/lib/types";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, newCartItem }: { userId: string; newCartItem: CartItem } =
      await request.json();
    console.log(newCartItem);

    await connectToDB();

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProductIds = cart.cartItems.map((cartItem: CartItem) =>
        cartItem.productId.toString()
      );

      const isProductInCart = existingProductIds.includes(
        newCartItem.productId.toString()
      );

      if (!isProductInCart) {
        cart.cartItems.push(newCartItem);
        await cart.save();
        return NextResponse.json(
          { message: "Item added to the cart successfully!" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Item already exists in the cart." },
          { status: 400 }
        );
      }
    } else {
      // creating a new cart if none exists
      const newCart = new Cart({
        userId,
        cartItems: [newCartItem],
      });

      await newCart.save();
      return NextResponse.json(
        { message: "Cart created and item added successfully!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding product to cart" },
      { status: 500 }
    );
  }
};
