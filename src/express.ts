import express from "express";
import { signUpRoute } from "./routes/index";

export const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send("Connected ");
});

mainRouter.use("/signup", signUpRoute);