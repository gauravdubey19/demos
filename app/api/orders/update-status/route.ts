import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";

export async function PUT(req: NextRequest) {
  try {
    const {
      orderId,
      updatedStatus,
    }: { orderId: string; updatedStatus: string } = await req.json();

    if (!orderId || Array.isArray(orderId) || !updatedStatus) {
      console.log("Valid Order ID and updated status are required");
      return NextResponse.json(
        { error: "Valid Order ID and updated status are required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const existingOrder = await Order.findOne({
      "orderInfo.orderID": orderId,
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    // console.log(existingOrder);

    existingOrder.orderInfo.orderStatus = updatedStatus;
    await existingOrder.save();

    return NextResponse.json({
      message: `Updated order ${orderId} status to ${updatedStatus}`,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}
