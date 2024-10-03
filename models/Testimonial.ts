import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  personTitle: {
    type: String,
    required: true,
  },
  testimony: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  videoLink: {
    type: String,
    required: false,
  },
});

const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);

export default Testimonial;
