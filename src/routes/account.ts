import express from "express";
import { auth } from "../middleware/index";
export const accountRouter = express.Router();
import mongoose from "mongoose";
import { UserModel } from "../mongoose/model/User";
import IUser from "../interface/IUser";

accountRouter.get("/me", auth, async (req, res) => {
  try {
    const payload = req.body["jwt-payload"];
    const user = await UserModel.findOne({ email: payload.email }).exec();
    if (!user) return res.status(404).send("No user found");
    res.send({ email: user.email, username: user.username, id: user._id });
  } catch (err) {
    res.send(err);
  }
});
