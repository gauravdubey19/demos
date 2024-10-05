import { Schema, model, models } from "mongoose";

const OutfitSchema = new Schema(
  {
    outfitTitle: { type: String, required: true },
    outfitSlug: { type: String, required: true, unique: true },
    outfitImage: { type: String, required: true },
    productCollection: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        productId: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const OutfitCollection = models.Outfits || model("Outfits", OutfitSchema);

export default OutfitCollection;
