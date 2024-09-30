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
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
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
      orderID: {
        type: String,
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
      },
      shippingDate: {
        type: Date,
      },
      cancelledDate: {
        type: Date,
      },
      shippingAddress: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
