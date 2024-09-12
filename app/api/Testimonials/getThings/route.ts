// import { NextResponse } from 'next/server';
// import { utapi } from '@/server/uploadthing';

// export async function GET() {
//     try {
//         const files = await utapi.listFiles();
//         return NextResponse.json({ files });
//     } catch (error) {
//         console.error('Error fetching files:', error);
//         return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
//     }
// }

// remove below post code, and please fix this Error: Failed to collect page data for /api/getThings
// - gaurav

import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import Products from "@/models/Products";

export const POST = async (request: NextRequest) => {
  try {
    // await connectToDB();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};
