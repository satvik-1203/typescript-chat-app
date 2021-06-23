import express from "express";
import { UserModel } from "../mongoose/model/index";
import signUpJoiSchema from "../mongoose/joiSchemas/signUp";
import { IUser } from "../interface";
import bcrypt from "bcrypt";

export const signUpRoute = express.Router();

signUpRoute.get("/", async (req, res) => {
  res.send("Sign Up Route");
});

signUpRoute.post("/", async (req, res): Promise<void> => {
  const { username, email, password } = req.body;

  const user: IUser = {
    email,
    username,
    password,
  };

  // will add joi here for validation.
  const { error } = signUpJoiSchema.validate(user);
  const errors: string[] = [];

  if (error?.details) {
    error.details.forEach((msg) => errors.push(msg.message));
    res.status(400).send(errors);
    return;
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  try {
    const result = new UserModel(user);
    await result.save();
    res.send("Saved in the database");
  } catch (err) {
    res.status(400).send(err);
  }
});
