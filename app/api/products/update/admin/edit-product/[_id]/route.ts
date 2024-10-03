import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Products from "@/models/Products";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  const { _id } = params;
  if (!_id) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }

  const {
    mainImage,
    images,
    title,
    description,
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
  }: {
    mainImage: string;
    images: string[];
    title: string;
    description: string;
    price: number;
    oldPrice: number;
    quantityInStock: number;
    availableSizes: string[];
    colorOptions: {
      title: string;
      color: string;
    }[];
    categories: { title: string; slug: string }[];
    type: string[];
    material: string;
    fabricType: string;
    careInstructions: string;
    origin: string;
    brand: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  } = await request.json();

  console.log(
    mainImage,
    images,
    title,
    description,
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
    faqs
  );

  try {
    await connectToDB();

    const existingProduct = await Products.findById(_id);

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // tracking the fields that have been updated
    const updatedFields: string[] = [];

    if (title && title !== existingProduct.title) {
      const newSlug = await generateUniqueSlug(generateSlug(title));
      updatedFields.push("title");
      existingProduct.title = title;
      existingProduct.slug = newSlug;
    }

    if (description && description !== existingProduct.description) {
      updatedFields.push("description");
      existingProduct.description = description;
    }

    if (price && price !== existingProduct.price) {
      updatedFields.push("price");
      existingProduct.price = price;
    }

    if (oldPrice && oldPrice !== existingProduct.oldPrice) {
      updatedFields.push("oldPrice");
      existingProduct.oldPrice = oldPrice;
    }

    if (
      quantityInStock !== undefined &&
      quantityInStock !== existingProduct.quantityInStock
    ) {
      updatedFields.push("quantityInStock");
      existingProduct.quantityInStock = quantityInStock;
    }

    if (mainImage && mainImage !== existingProduct.mainImage) {
      updatedFields.push("mainImage");
      existingProduct.mainImage = mainImage;
    }

    if (
      images &&
      JSON.stringify(images) !== JSON.stringify(existingProduct.images)
    ) {
      updatedFields.push("images");
      existingProduct.images = images;
    }

    if (
      availableSizes &&
      JSON.stringify(availableSizes) !==
        JSON.stringify(existingProduct.availableSizes)
    ) {
      updatedFields.push("availableSizes");
      existingProduct.availableSizes = availableSizes;
    }

    if (
      colorOptions &&
      JSON.stringify(colorOptions) !==
        JSON.stringify(existingProduct.colorOptions)
    ) {
      updatedFields.push("colorOptions");
      existingProduct.colorOptions = colorOptions;
    }

    if (
      categories &&
      JSON.stringify(categories) !== JSON.stringify(existingProduct.categories)
    ) {
      updatedFields.push("categories");
      existingProduct.categories = categories;
    }

    if (type && JSON.stringify(type) !== JSON.stringify(existingProduct.type)) {
      updatedFields.push("type");
      existingProduct.type = type;
    }

    if (material && material !== existingProduct.material) {
      updatedFields.push("material");
      existingProduct.material = material;
    }

    if (fabricType && fabricType !== existingProduct.fabricType) {
      updatedFields.push("fabricType");
      existingProduct.fabricType = fabricType;
    }

    if (
      careInstructions &&
      careInstructions !== existingProduct.careInstructions
    ) {
      updatedFields.push("careInstructions");
      existingProduct.careInstructions = careInstructions;
    }

    if (origin && origin !== existingProduct.origin) {
      updatedFields.push("origin");
      existingProduct.origin = origin;
    }

    if (brand && brand !== existingProduct.brand) {
      updatedFields.push("brand");
      existingProduct.brand = brand;
    }

    if (faqs && JSON.stringify(faqs) !== JSON.stringify(existingProduct.faqs)) {
      updatedFields.push("faqs");
      existingProduct.faqs = faqs;
    }

    await existingProduct.save();

    // sending a message listing the updated fields
    const updatedFieldsMessage = updatedFields.length
      ? `Updated fields: ${updatedFields.join(", ")}`
      : "No fields were updated";

    return NextResponse.json(
      {
        message: `Product updated successfully! ${updatedFieldsMessage}`,
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
