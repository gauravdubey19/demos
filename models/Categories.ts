import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: {
      type: String,
      required: true,
      default: "Chimanlal Suresh Kumar (CSK) Textiles product.",
    },
    image: { type: String, required: true },
    types: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Categories = models.Categories || model("Categories", CategorySchema);

export { Categories };
