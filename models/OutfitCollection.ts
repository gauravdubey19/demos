import { Schema, model, models } from "mongoose";

const OutfitSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    productCollection: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const OutfitCollection = models.Outfits || model("Outfits", OutfitSchema);

export default OutfitCollection;
