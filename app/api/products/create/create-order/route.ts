import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/utils/db";
import Orders from "@/models/Orders";

export const POST = async (request: NextRequest) => {
  try {
    const { addToCartProductData } = await request.json();
    console.log(addToCartProductData);

    const session = await getServerSession();
    console.log(session);

    // await connectToDB();

    // const newCart = new Orders({
    //   title,
    //   slug,
    //   description,
    //   price,
    //   quantity: 1,
    //   image,
    // });

    // const savedCart = await newCart.save();
    // console.log("Saved cart:", savedCart);

    return NextResponse.json(
      { message: "Product added to the cart successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding product to cart" },
      { status: 500 }
    );
  }
};
