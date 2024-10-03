import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { Categories } from "@/models/Categories";
import { CategoryCollectionValues } from "@/lib/types";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { action: string } }
) => {
  try {
    const {
      id,
      updatedCategory,
      types,
      typeSlug,
      updatedType,
    }: {
      id: string;
      updatedCategory: CategoryCollectionValues;
      types?: {
        title: string;
        slug: string;
      }[];
      typeSlug?: string;
      updatedType?: {
        title: string;
        slug: string;
      };
    } = await request.json();

    const { action } = params;

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    if (action === "update-category") {
      const category = await Categories.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      // updating the category fields if provided
      category.title = updatedCategory.title || category.title;
      category.slug = updatedCategory.slug || category.slug;
      category.description =
        updatedCategory.description || category.description;
      category.image = updatedCategory.image || category.image;

      await category.save();

      return NextResponse.json(
        { message: "Category updated successfully!" },
        { status: 200 }
      );
    }

    if (action === "add-category-new-types") {
      if (!Array.isArray(types)) {
        return NextResponse.json(
          { error: "Category types should be an array" },
          { status: 400 }
        );
      }

      const category = await Categories.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      types.forEach((newType) => {
        const typeExists = category.types.some(
          (existingType: any) => existingType.slug === newType.slug
        );

        if (!typeExists) {
          category.types.push(newType);
        }
      });

      await category.save();

      return NextResponse.json(
        { message: "Types added successfully!" },
        { status: 201 }
      );
    }

    if (action === "delete-category-type") {
      if (!typeSlug) {
        return NextResponse.json(
          { error: "Category type slug is required" },
          { status: 400 }
        );
      }

      const category = await Categories.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      // Remove the type from the category by slug
      const initialLength = category.types.length;
      category.types = category.types.filter(
        (type: { title: string; slug: string }) => type.slug !== typeSlug
      );

      if (category.types.length === initialLength) {
        return NextResponse.json(
          { error: "Type not found in the category" },
          { status: 404 }
        );
      }

      await category.save();

      return NextResponse.json(
        { message: "Type deleted successfully!" },
        { status: 200 }
      );
    }

    if (action === "update-category-type") {
      if (!updatedType || !typeSlug) {
        return NextResponse.json(
          { error: "Updated Category type is required" },
          { status: 400 }
        );
      }

      const category = await Categories.findById(id);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      // updating the type from the category by slug
      category.types = category.types.map(
        (type: { title: string; slug: string }) =>
          type.slug === typeSlug ? updatedType : type
      );
      // prevTypes.map((existingType) =>
      //   existingType.slug === updateType.slug ? updateType : existingType
      // )

      await category.save();

      return NextResponse.json(
        { message: "Type deleted successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error while processing request:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing the request" },
      { status: 500 }
    );
  }
};
