// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import { Categories } from "@/models/Categories";

// export const POST = async (request: NextRequest) => {
//   try {
//     const { title, slug, image } = await request.json();

//     await connectToDB();

//     const newCategory = new Categories({ title, slug, image });

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

export const POST = async (request: NextRequest) => {
  try {
    const categories = await request.json();
    console.log("Received categories:", categories);

    await connectToDB();

    const savedCategories = await Promise.all(
      categories.map(
        async (category: {
          title: string;
          slug: string;
          description: string;
          image: string;
          types: any;
        }) => {
          const { title, slug, description, image, types } = category;

          const newCategory = new Categories({
            title,
            slug,
            description,
            image,
            types,
          });

          return newCategory.save();
        }
      )
    );

    return NextResponse.json(
      { message: `${savedCategories.length} categories created successfully!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating categories:", error);
    return NextResponse.json(
      { error: "Failed to create categories" },
      { status: 500 }
    );
  }
};
