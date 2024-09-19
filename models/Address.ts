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
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // typeOfAddress: {
    //   type: String,
    //   enum: ["Home", "Office"],
    //   required: true,
    // },
    // isOfficeOpenWeekends: {
    //   type: Boolean,
    //   required: false,
    // },
    // weekendOpenDays: {
    //   type: String,
    //   enum: ["Saturdays", "Sundays"],
    //   required: true,
    //   default: "Saturdays",
    // },
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
