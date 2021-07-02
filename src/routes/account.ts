import express from "express";
import { auth } from "../middleware/index";
export const accountRouter = express.Router();
import mongoose from "mongoose";
import { UserModel } from "../mongoose/model/User";
import IUser from "../interface/IUser";

accountRouter.get("/me", auth, async (req, res) => {
  try {
    const { email, id, username } = req.body["jwt-payload"];

    res.send({ email: email, username: username, id: id });
  } catch (err) {
    res.send(err);
  }
});
