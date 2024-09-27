import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";
import Order from "@/models/Order";
import User from "@/models/User";

export const GET = async (
  request: NextRequest,
  { params }: { params: { require: string } }
) => {
  if (!params.require) {
    return NextResponse.json(
      { error: "Admin 'require' is required" },
      { status: 400 }
    );
  }
  const require = params.require;
  try {
    await connectToDB();

    if (require === "collections-length") {
      const products = await Products.find();
      const orders = await Order.find();
      const users = await User.find();

      if (!products || !orders || !users) {
        return NextResponse.json(
          {
            error: !products
              ? "Products collection not found"
              : !orders
              ? "Orders collection not found"
              : !users
              ? "Users collection not found"
              : "Collection not found",
          },
          { status: 404 }
        );
      }
      const collectionsLength = {
        products: products.length,
        orders: orders.length,
        users: users.length,
      };
      return NextResponse.json(collectionsLength, { status: 200 });
    }

    if (require === "users") {
      const users = await User.find();

      if (!users) {
        return NextResponse.json(
          { error: "User collection not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(users, { status: 200 });
    }

    // return NextResponse.json("cart.cartItems", { status: 200 });
  } catch (error) {
    console.error("Error fetching cart for user ID:", params.require, error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
};
