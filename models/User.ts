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

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  profile: {
    type: String,
    // default: "/default-profile.png",
  },
  dateOfBirth: {
    type: Date,
  },
  phone_number: {
    type: String,
    minLength: 10,
    maxLength: 10,
    unique: true,
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
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
