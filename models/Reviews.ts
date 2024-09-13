import { Schema, model, models } from 'mongoose';

// Define the ReviewSchema
const ReviewSchema = new Schema(
  {
    productSlug: {
      type:String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    username:{
      type: String,
      required: true,
    },
    userAvatar:{
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