import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: false,
    },
    availableSizes: {
      type: [String],
      required: true,
    },
    colorOptions: {
      type: [String],
      required: true,
    },
    categories: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
    material: { type: String, required: true },
    fabricType: {
      type: String,
      required: false,
    },
    careInstructions: {
      type: String,
      required: false,
    },
    countryOfManufacture: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: false,
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Products = models.Products || model("Products", ProductSchema);

export default Products;

