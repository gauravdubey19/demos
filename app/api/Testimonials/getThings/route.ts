import { NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";

export const dynamic = 'force-dynamic'; // Forces the route to be dynamic

export async function GET() {
  try {
    const files = await utapi.listFiles();
    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
