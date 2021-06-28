import express from "express";
import { auth } from "../middleware";
require("dotenv").config();
import jwt from "jsonwebtoken";

const validateRoute = express.Router();

validateRoute.get("/", auth, (req, res) => {
  const payload: object = req.body["JWT-payload"];
  if (!process.env["JWT-SIGN"])
    return res.status(400).send("error making the token");
  const token = jwt.sign(payload, process.env["JWT-SIGN"]);
  res.send(token);
});
