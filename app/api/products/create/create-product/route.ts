import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";
import { UTFile } from "uploadthing/server";
import { utapi } from "@/server/uploadthing";
import { generateSlug } from "@/lib/utils";

const generateUniqueSlug = async (slug: string) => {
  let uniqueSlug = slug;
  let slugExists = await Products.findOne({ slug: uniqueSlug });

  let counter = 1;
  while (slugExists) {
    uniqueSlug = `${slug}-${counter}`;
    slugExists = await Products.findOne({ slug: uniqueSlug });
    counter++;
  }

  return uniqueSlug;
};

export const POST = async (request: NextRequest) => {
  try {
    const contentType = request.headers.get("Content-Type");

    if (!contentType?.startsWith("multipart/form-data")) {
      throw new Error("Content-Type must be multipart/form-data");
    }

    const formData = await request.formData();
    const mainImage = formData.get("mainImage") as File;
    const images = formData.getAll("images") as File[]; // getting multiple images
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const oldPrice =
      (formData.get("oldPrice") as string) &&
      parseFloat(formData.get("oldPrice") as string);
    const quantityInStock = parseInt(
      formData.get("quantityInStock") as string,
      10
    );
    const availableSizes = JSON.parse(formData.get("availableSizes") as string);
    const colorOptions = JSON.parse(formData.get("colorOptions") as string);
    const categories = JSON.parse(formData.get("categories") as string);
    const type = JSON.parse(formData.get("types") as string);
    const material = formData.get("material") as string;
    const fabricType = formData.get("fabricType") as string;
    const careInstructions = formData.get("careInstructions") as string;
    const origin = (formData.get("origin") as string) || "India";
    const brand = formData.get("brand") as string;
    const faqs = JSON.parse(formData.get("faqs") as string);

    // console.log(images);

    // uploading mainImage using UTApi
    const uploadedMainImage = await utapi.uploadFiles(mainImage);
    const mainImageUrl = uploadedMainImage.data?.url;

    // uploading multiple images using UTApi
    const uploadedImagesUrls = await Promise.all(
      images.map(async (image: File) => {
        const uploadResponse = await utapi.uploadFiles(image);
        return uploadResponse.data?.url;
      })
    );
    if (!uploadedMainImage.data?.key && !uploadedImagesUrls.length) {
      return NextResponse.json(
        {
          error: `Image files aren't able to upload!`,
        },
        { status: 401 }
      );
    }
    console.log(uploadedMainImage.data?.key, "\n", uploadedImagesUrls);

    await connectToDB();

    const slug: string = generateSlug(title as string);
    const uniqueSlug = await generateUniqueSlug(slug as string);

    const newProduct = new Products({
      title,
      slug: uniqueSlug,
      description,
      mainImage: mainImageUrl,
      images: uploadedImagesUrls,
      price,
      oldPrice,
      quantityInStock,
      availableSizes,
      colorOptions,
      categories,
      type,
      material,
      fabricType,
      careInstructions,
      origin,
      brand,
      faqs,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      {
        message: `${savedProduct.title} product created successfully!`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
};
