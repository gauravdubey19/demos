import { Schema, model, models } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profile?: string;
  dateOfBirth?: Date;
  phone_number?: string;
  gender?: "male" | "female" | "others";
  favProducts?: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      default: "user",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone_number: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profile: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    favProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
