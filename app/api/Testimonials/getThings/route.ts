import { NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";

export async function GET() {
  try {
    const files = await utapi.listFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
