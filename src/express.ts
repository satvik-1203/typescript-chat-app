import express from "express";
import {
  signUpRoute,
  loginRouter,
  validateRoute,
  accountRouter,
} from "./routes/index";
import cors from "cors";

export const mainRouter = express.Router();

mainRouter.use(cors({ origin: "http://localhost:3000" }));
mainRouter.use(express.json());

mainRouter.get("/", (req, res) => {
  res.send("Connected With Express");
});

mainRouter.use("/signup", signUpRoute);
mainRouter.use("/login", loginRouter);
mainRouter.use("/account", accountRouter);
mainRouter.use("/validate", validateRoute);
