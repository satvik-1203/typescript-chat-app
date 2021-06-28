import express from "express";
import { auth } from "../middleware/index";
export const accountRouter = express.Router();

accountRouter.get("/", auth, (req, res) => {
  try {
    res.send(req.body);
  } catch (err) {
    res.send(err);
  }
});
