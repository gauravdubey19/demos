import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Cart from "@/models/Cart";

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { userId: string } }
) => {
    const { userId } = params;

    console.log("Received delete request for user ID:", userId);

    if (!userId) {
        console.error("No user ID provided");
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        await connectToDB();

        console.log("Connected to DB, attempting to remove all items for user");

        // Update the cart for the specified user, removing all items
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            { $set: { cartItems: [] } },  // Clear the cartItems array
            { new: true }
        );

        if (!updatedCart) {
            console.log("No cart found for the specified user");
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }

        console.log("All items removed successfully");
        return NextResponse.json(
            { message: "All items removed from cart successfully", cart: updatedCart },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error removing all items from cart:", error);
        return NextResponse.json(
            { error: "Failed to remove items from cart", details: error },
            { status: 500 }
        );
    }
};
