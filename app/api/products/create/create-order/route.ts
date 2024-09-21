import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, orderedProducts, orderInfo } = await request.json();

    if (!userId || !orderedProducts || !orderInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const newOrder = new Order({
      userId,
      orderedProducts,
      orderInfo,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(
      { message: "Order created successfully!", order: savedOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the order" },
      { status: 500 }
    );
  }
};
