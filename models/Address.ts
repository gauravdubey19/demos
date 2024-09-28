import { Schema, model, models } from "mongoose";

const AddressFieldSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    state: {
      code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    city: {
      code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      }
    },
  },
  { timestamps: true }
);

const AddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addresses: [AddressFieldSchema],
  },
  { timestamps: true }
);

const Address = models.Address || model("Address", AddressSchema);
export default Address;
