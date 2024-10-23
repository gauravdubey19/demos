import { Schema, model, models } from "mongoose";
import Products from "./Products";

const CartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      // unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quantityInStock: {
      type: Number,
      required: true,
    },
    availableSizes: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    selectedSize: {
      type: String,
      required: true,
    },
    colorOptions: [
      {
        title: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    selectedColor: {
      title: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
    categorySlug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
