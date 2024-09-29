import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
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
    const oldPrice = parseFloat(formData.get("oldPrice") as string);
    const quantityInStock = parseInt(
      formData.get("quantityInStock") as string,
      10
    );
    const availableSizes = JSON.parse(formData.get("availableSizes") as string);
    const colorOptions = JSON.parse(formData.get("colorOptions") as string);
    const categories = JSON.parse(formData.get("categories") as string);
    const types = JSON.parse(formData.get("types") as string);
    const material = formData.get("material") as string;
    const fabricType = formData.get("fabricType") as string;
    const careInstructions = formData.get("careInstructions") as string;
    const origin = formData.get("origin") as string;
    const brand = formData.get("brand") as string;
    const countryOfManufacture =
      (formData.get("countryOfManufacture") as string) || "India";
    const faqs = JSON.parse(formData.get("faqs") as string);

    // console.log(images);

    // uploading mainImage using UTApi
    const uploadedMainImage = await utapi.uploadFiles([
      new UTFile([mainImage], mainImage.name),
    ]);
    const mainImageUrl = uploadedMainImage[0].data?.url;

    // uploading multiple images using UTApi
    const uploadedImagesUrls = await Promise.all(
      images.map(async (image: File) => {
        const uploadResponse = await utapi.uploadFiles([
          new UTFile([image], image.name),
        ]);
        return uploadResponse[0].data?.url;
      })
    );

    await connectToDB();

    const slug = generateSlug(title);
    const uniqueSlug = await generateUniqueSlug(slug);

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
      type: types,
      material,
      fabricType,
      careInstructions,
      origin,
      brand,
      countryOfManufacture,
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
}
