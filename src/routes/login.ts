import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../mongoose/model";
import bcrypt from "bcrypt";
require("dotenv").config();

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password))
    return res.status(400).send("Didn't receive appropriate user details");
  const user = await UserModel.findOne({ email: email }).exec();
  if (!user) return res.status(400).send("No user found");
  const match = bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Incorrect password");
  if (!process.env["JWT-SIGN"])
    return res.status(400).send("Unable to make a token");
  const token = jwt.sign(
    { username: user.username, email: user.email },
    process.env["JWT-SIGN"],
    { expiresIn: "1h" }
  );
  res.send({ token });
});
