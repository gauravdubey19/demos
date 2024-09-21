import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  profile: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  favProducts: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;

// cart: [{
//     type: String,
//     required: true
// }],
// // The following has to be a snapshot of the product
// orders: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Order"
// }]
