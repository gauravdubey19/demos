import { Schema, model, models } from "mongoose";
import { title } from "process";

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "NewProducts",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
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
    image: {
      type: String,
      required: true,
    },
    selectedSize: {
      type: String,
      required: true,
    },
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

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderedProducts: [OrderItemSchema],
    orderInfo: {
      customerName: {
        type: String,
        required: true,
      },
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
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
