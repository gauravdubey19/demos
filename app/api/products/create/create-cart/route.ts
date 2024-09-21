import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/Cart";
import { CartItem } from "@/lib/types";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, newCartItem }: { userId: string; newCartItem: CartItem } =
      await request.json();
    // console.log(newCartItem);

    await connectToDB();

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    let existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      console.log("existingCart -> ", existingCart);
      // checking if the product with the same slug already exists in the cart
      const isProductInCart = existingCart.cartItems.some(
        (cartItem: CartItem) => cartItem.slug === newCartItem.slug
      );

      if (!isProductInCart) {
        // if not -> add the new item
        existingCart.cartItems.push(newCartItem);
        await existingCart.save();
        return NextResponse.json(
          { message: "Item added to the cart successfully!" },
          { status: 200 }
        );
      } else {
        // else cheching if the product is already in the cart -> return a message
        return NextResponse.json(
          { message: "Item already exists in the cart." },
          { status: 400 }
        );
      }
    } else {
      // if no cart exists for the user -> create a new one and add the item
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
