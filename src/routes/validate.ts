import express from "express";
import { auth } from "../middleware";
require("dotenv").config();
import jwt from "jsonwebtoken";

export const validateRoute = express.Router();

validateRoute.get("/", auth, (req, res) => {
  const payload = req.body["jwt-payload"];
  if (!process.env["JWT-SIGN"])
    return res.status(400).send("error making the token");
  const token = jwt.sign(
    { username: payload.username, password: payload.email },
    process.env["JWT-SIGN"],
    {
      expiresIn: "1h",
    }
  );
  res.send({ token });
});
