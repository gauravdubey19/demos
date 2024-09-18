import { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
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
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderedProducts: [OrderItemSchema],
    orderInfo: {
      orderStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: Date,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
      shippingDate: {
        type: Date,
        required: true,
      },
      shippingAddress: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
