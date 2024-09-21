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
    colorOptions: [
      {
        title: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    categories: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
    type: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    fabricType: {
      type: String,
      required: false,
    },
    careInstructions: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: true,
      default: "India",
    },
    quantityInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
      default: "Chimanlal Suresh Kumar (CSK) Textiles",
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

// enum: [
//   "cotton-kurta",
//   "silk-kurta",
//   "embroidered-sherwani",
//   "designer-sherwani",
//   "cotton-dhoti",
//   "silk-dhoti",
//   "cotton-nehru-jacket",
//   "silk-nehru-jacket",
//   "chinos",
//   "formal-trousers",
//   "cotton-pajama",
//   "silk-pajama",
//   "cotton-pathani",
//   "designer-pathani",
//   "denim-jacket",
//   "cotton-jacket",
//   "denim-blazer",
//   "cotton-blazer",
//   "graphic-shirt",
//   "plain-shirt",
//   "graphic-sweater",
//   "plain-sweater",
// ],
