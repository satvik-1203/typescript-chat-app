import express from "express";
import { signUpRoute, loginRouter } from "./routes/index";

export const mainRouter = express.Router();

mainRouter.use(express.json());

mainRouter.get("/", (req, res) => {
  res.send("Connected ");
});

mainRouter.use("/signup", signUpRoute);
mainRouter.use("/login", loginRouter);
