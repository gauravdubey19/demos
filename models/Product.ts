import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescr: {
    type: String,
    required: true,
  },
  productImages: {
    type: [String], // Array of strings for image URLs
    required: true,
  },
  categories: {
    type: [String], // Array of strings for categories
    required: true,
  },
  productMP: {
    type: Number, // Market price
    required: true,
  },
  productSP: {
    type: Number, // Selling price
    required: true,
  },
  varieties: {
    colors: {
      type: [String], // Array of strings for colors
      required: true,
    },
    sizes: {
      type: [String], // Array of strings for sizes
      required: true,
    },
  },
  productFAQs: {
    type: [String], // Array of strings for FAQs
    required: false,
  },
  productDetails: {
    material: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: false,
    },
    fabric: {
      type: String,
      required: false,
    },
    // Add other details as needed
  },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;