import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";
import { UTFile } from "uploadthing/server";
import { utapi } from "@/server/uploadthing";
import { generateSlug } from "@/lib/utils";
// import { generateUniqueSlug } from "@/app/api/products/create/create-product/route";

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

export async function PUT(
  request: Request,
  { params }: { params: { _id: string } }
) {
  const { _id } = params;
  if (!_id) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }

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
    const oldPrice = formData.get("oldPrice")
      ? parseFloat(formData.get("oldPrice") as string)
      : undefined;
    const quantityInStock = parseInt(
      formData.get("quantityInStock") as string,
      10
    );
    const availableSizes = JSON.parse(formData.get("availableSizes") as string);
    const colorOptions = JSON.parse(formData.get("colorOptions") as string);
    const categories = JSON.parse(formData.get("categories") as string);
    const type = formData.get("types")
      ? JSON.parse(formData.get("types") as string)
      : undefined;
    const material = formData.get("material") as string;
    const fabricType = formData.get("fabricType") as string;
    const careInstructions = formData.get("careInstructions") as string;
    const origin = (formData.get("origin") as string) || "India";
    const brand = formData.get("brand") as string;
    const faqs = formData.get("faqs")
      ? JSON.parse(formData.get("faqs") as string)
      : [];

    await connectToDB();

    const existingProduct = await Products.findById(_id);

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Checking and updating the mainImage
    let mainImageUrl = existingProduct.mainImage;
    if (mainImage) {
      // checking if the new mainImage is already uploaded
      if (!existingProduct.mainImage.includes(mainImage.name)) {
        const uploadedMainImage = await utapi.uploadFiles([
          new UTFile([mainImage], mainImage.name),
        ]);
        mainImageUrl = uploadedMainImage[0].data?.url;
      }
    }

    // checking and updating the images
    let updatedImages = existingProduct.images;
    if (images && images.length > 0) {
      // uploading new images only if they aren't already uploaded
      const newImagesUrls = await Promise.all(
        images.map(async (image: File) => {
          if (!existingProduct.images.includes(image.name)) {
            const uploadResponse = await utapi.uploadFiles([
              new UTFile([image], image.name),
            ]);
            return uploadResponse[0].data?.url;
          }
          return image.name; // keeping existing image if it's already there
        })
      );

      // converting Set to Array
      updatedImages = Array.from(new Set([...updatedImages, ...newImagesUrls]));
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      _id,
      {
        title,
        slug:
          existingProduct.slug ||
          (await generateUniqueSlug(generateSlug(title))),
        description,
        mainImage: mainImageUrl,
        images: updatedImages,
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
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: `Product ${updatedProduct.title} updated successfully!`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
