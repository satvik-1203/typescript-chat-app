import { model } from "mongoose";
import { signUpSchema } from "../schema/signUp";
import { IUser } from "../../interface";

export const UserModel = model<IUser>("User", signUpSchema);
