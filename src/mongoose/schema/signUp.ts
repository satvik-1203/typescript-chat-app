import { Schema } from "mongoose";
import { IUser } from "../../interface";

export const signUpSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
