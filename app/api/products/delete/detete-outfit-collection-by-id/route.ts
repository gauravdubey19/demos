// import { NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import OutfitCollection from "@/models/OutfitCollection";

// // DELETE an outfit by ID
// export const DELETE = async (request: Request) => {
//     try {
//         await connectToDB();

//         // Extract the ID from the request URL
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get("id");

//         if (!id) {
//             return NextResponse.json(
//                 { error: "Outfit ID is required" },
//                 { status: 400 }
//             );
//         }

//         // Find and delete the outfit by ID
//         const deletedOutfit = await OutfitCollection.findByIdAndDelete(id);

//         if (!deletedOutfit) {
//             return NextResponse.json(
//                 { error: "Outfit not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { message: "Outfit deleted successfully" },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error deleting Outfit Collection:", error);
//         return NextResponse.json(
//             { error: "Failed to delete Outfit Collection" },
//             { status: 500 }
//         );
//     }
// };





import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import OutfitCollection from "@/models/OutfitCollection";

export async function DELETE(request: Request) {
    try {
        await connectToDB();

        // Extract the ID from the request URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Outfit ID is required" },
                { status: 400 }
            );
        }

        // Find and delete the outfit by ID
        const deletedOutfit = await OutfitCollection.findByIdAndDelete(id);

        if (!deletedOutfit) {
            return NextResponse.json(
                { error: "Outfit not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Outfit deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting Outfit Collection:", error);
        return NextResponse.json(
            { error: "Failed to delete Outfit Collection" },
            { status: 500 }
        );
    }
}