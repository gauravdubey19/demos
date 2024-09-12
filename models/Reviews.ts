import { Schema, model, models } from 'mongoose';

// Define the ReviewSchema
const ReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Products', // Reference to the Product model
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review_title: {
      type: String,
      required: true,
    },
    review_descr: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = models.Review || model('Review', ReviewSchema);

export default Review;