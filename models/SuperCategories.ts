import { Schema, model, models } from "mongoose";

const SuperCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    categories: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const SuperCategories = models.SuperCategories || model("SuperCategories", SuperCategorySchema);

export { SuperCategories };
