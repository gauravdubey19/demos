import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    console.log("Received delete request for item ID:", id);

    if (!id) {
        console.error("No item ID provided");
        return NextResponse.json(
            { error: "Cart Item ID is required" },
            { status: 400 }
        );
    }

    try {
        await connectToDB();

        console.log("Connected to DB, attempting to remove item");

        const updatedCart = await Cart.findOneAndUpdate(
            { "cartItems._id": id },
            { $pull: { cartItems: { _id: id } } },
            { new: true }
        );

        if (!updatedCart) {
            console.log("No cart found with the specified item");
            return NextResponse.json(
                { error: "Cart item not found" },
                { status: 404 }
            );
        }

        console.log("Item removed successfully");
        return NextResponse.json(
            { message: "Product removed from cart successfully", cart: updatedCart },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return NextResponse.json(
            { error: "Failed to remove product from cart", details: error },
            { status: 500 }
        );
    }
};