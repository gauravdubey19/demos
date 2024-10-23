import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { generateSlug } from "@/lib/utils";
import NewProduct from "@/models/NewProduct";

const generateUniqueSlug = async (slug: string) => {
  let uniqueSlug = slug;
  let slugExists = await NewProduct.findOne({ slug: uniqueSlug });

  let counter = 1;
  while (slugExists) {
    uniqueSlug = `${slug}-${counter}`;
    slugExists = await NewProduct.findOne({ slug: uniqueSlug });
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
    title,
    description,
    price,
    sale_price,
    sale_price_effective_date,
    categories,
    product_highlights,
    type,
    material,
    pattern,
    fabric_type,
    care_instructions,
    origin = "India",
    availability = "in_stock",
    availability_date,
    brand = "Chimanlal Suresh Kumar (CSK) Textiles",
    images_collection,
    faqs,
    sell_on_google_quantity,
  }: {
    title: string;
    description: string;
    price: number;
    sale_price?: number;
    sale_price_effective_date?: string;
    categories: { title: string; slug: string }[];
    product_highlights?: string[];
    type?: string[];
    material: string;
    pattern?: string;
    fabric_type?: string;
    care_instructions?: string;
    origin?: string;
    availability?: string;
    availability_date?: Date;
    brand?: string;
    images_collection: {
      image_link: string;
      color: string;
      color_name: string;
      images: string[];
      quantity: { size: string; quantity: number }[];
    }[];
    faqs?: { question: string; answer: string }[];
    sell_on_google_quantity?: number;
  } = await request.json();

  try {
    await connectToDB();

    const existingProduct = await NewProduct.findById(_id);

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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

    if (sale_price && sale_price !== existingProduct.sale_price) {
      updatedFields.push("sale_price");
      existingProduct.sale_price = sale_price;
    }

    if (
      sale_price_effective_date &&
      sale_price_effective_date !== existingProduct.sale_price_effective_date
    ) {
      updatedFields.push("sale_price_effective_date");
      existingProduct.sale_price_effective_date = sale_price_effective_date;
    }

    if (
      categories &&
      JSON.stringify(categories) !== JSON.stringify(existingProduct.categories)
    ) {
      updatedFields.push("categories");
      existingProduct.categories = categories;
    }

    if (
      product_highlights &&
      JSON.stringify(product_highlights) !==
        JSON.stringify(existingProduct.product_highlights)
    ) {
      updatedFields.push("product_highlights");
      existingProduct.product_highlights = product_highlights;
    }

    if (type && JSON.stringify(type) !== JSON.stringify(existingProduct.type)) {
      updatedFields.push("type");
      existingProduct.type = type;
    }

    if (material && material !== existingProduct.material) {
      updatedFields.push("material");
      existingProduct.material = material;
    }

    if (pattern && pattern !== existingProduct.pattern) {
      updatedFields.push("pattern");
      existingProduct.pattern = pattern;
    }

    if (fabric_type && fabric_type !== existingProduct.fabric_type) {
      updatedFields.push("fabric_type");
      existingProduct.fabric_type = fabric_type;
    }

    if (
      care_instructions &&
      care_instructions !== existingProduct.care_instructions
    ) {
      updatedFields.push("care_instructions");
      existingProduct.care_instructions = care_instructions;
    }

    if (origin && origin !== existingProduct.origin) {
      updatedFields.push("origin");
      existingProduct.origin = origin;
    }

    if (availability && availability !== existingProduct.availability) {
      updatedFields.push("availability");
      existingProduct.availability = availability;
    }

    if (
      availability_date &&
      availability_date !== existingProduct.availability_date
    ) {
      updatedFields.push("availability_date");
      existingProduct.availability_date = availability_date;
    }

    if (brand && brand !== existingProduct.brand) {
      updatedFields.push("brand");
      existingProduct.brand = brand;
    }

    if (
      images_collection &&
      JSON.stringify(images_collection) !==
        JSON.stringify(existingProduct.images_collection)
    ) {
      updatedFields.push("images_collection");
      existingProduct.images_collection = images_collection;
    }

    if (faqs && JSON.stringify(faqs) !== JSON.stringify(existingProduct.faqs)) {
      updatedFields.push("faqs");
      existingProduct.faqs = faqs;
    }

    if (
      sell_on_google_quantity !== undefined &&
      sell_on_google_quantity !== existingProduct.sell_on_google_quantity
    ) {
      updatedFields.push("sell_on_google_quantity");
      existingProduct.sell_on_google_quantity = sell_on_google_quantity;
    }

    await existingProduct.save();

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
