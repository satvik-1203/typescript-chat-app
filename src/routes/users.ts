import express from "express";
import { UserModel } from "../mongoose/model/User";

export const usersRoute = express.Router();

usersRoute.get("/:name", (req, res) => {
  const userName = req.params.name;
  const userRegex = `/${userName}[\s\S]*.?/gm/`;

  UserModel.find({ username: { $regex: userRegex } }, (err, docs) => {
    if (err) {
      console.log(err);
    }

    if (!docs) {
      res.status(404).json("Users with that name dont exist");
    } else {
      console.log(docs);
      res.json(docs);
    }
  });
});
