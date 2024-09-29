import { NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { files } = body;

        if (Array.isArray(files)) {
            await utapi.deleteFiles(files);
        } else if (typeof files === 'string') {
            await utapi.deleteFiles(files);
        } else {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: "Files deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting files:", error);
        return NextResponse.json(
            { error: "Failed to delete files" },
            { status: 500 }
        );
    }
}