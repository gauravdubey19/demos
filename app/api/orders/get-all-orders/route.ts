import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export const GET = async () => {
  try {
    await connectToDB();
    const orders = await Order.find({});

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};
