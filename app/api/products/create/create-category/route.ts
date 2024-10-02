// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import { utapi } from "@/server/uploadthing";
// import { UTFile } from "uploadthing/server";
// import { Categories } from "@/models/Categories";

// export const POST = async (request: NextRequest) => {
//   try {
//     const contentType = request.headers.get("Content-Type");

//     if (!contentType?.startsWith("multipart/form-data")) {
//       throw new Error("Content-Type must be multipart/form-data");
//     }

//     const formData = await request.formData();

//     const image = formData.get("image") as File;
//     const title = formData.get("title") as string;
//     const slug = formData.get("slug") as string;
//     const description = formData.get("description") as string;
//     const types = JSON.parse(formData.get("types") as string);

//     // console.log(image);

//     // uploading mainImage using UTApi
//     const uploadedImage = await utapi.uploadFiles(image);
//     const imageUrl = uploadedImage.data?.url;

//     console.log(
//       uploadedImage.data?.url,
//       uploadedImage.data?.appUrl,
//       uploadedImage.data?.key,
//       uploadedImage.data?.name
//     );

//     await connectToDB();

//     const newCategory = new Categories({
//       title,
//       slug,
//       image: imageUrl,
//       description,
//       types,
//     });

//     const savedCategory = await newCategory.save();
//     // console.log("Saved category:", savedCategory);

//     return NextResponse.json(
//       { message: "Category created successfully!" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return NextResponse.json(
//       { error: "Failed to create category" },
//       { status: 500 }
//     );
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Categories";
import { CategoryReq } from "@/lib/types";

export const POST = async (request: NextRequest) => {
  try {
    const category: CategoryReq = await request.json();
    console.log("Received category:", category);

    await connectToDB();

    // Check if a category with the same slug already exists
    const existingCategory = await Categories.findOne({ slug: category.slug });

    if (existingCategory) {
      return NextResponse.json(
        { error: `Category with slug "${category.slug}" already exists.` },
        { status: 409 } // 409 Conflict status code
      );
    }

    // Create a new category
    const newCategory = new Categories(category);
    const savedCategory = await newCategory.save();

    console.log("Saved category:", savedCategory);

    return NextResponse.json(
      { message: "Category created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
};
