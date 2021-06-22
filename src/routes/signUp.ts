import express from "express";
import joi from "joi";
import { UserModel } from "../mongoose/model/index";
import { IUser } from "../interface";

export const signUpRoute = express.Router();

signUpRoute.get("/", (req, res) => {
  res.send("Sign Up Route");
});

signUpRoute.post("/", async (req, res): Promise<void> => {
  const { username, email, password } = req.body;
  const user: IUser = {
    username,
    email,
    password,
  };

  // will add joi here for validation.

  try {
    const result = new UserModel(user);
    await result.save();
    res.send("saved in the database");
  } catch (err) {
    res.status(400).send(err);
  }
});
