import express from "express";
import { UserModel } from "../mongoose/model/User";

export const usersRoute = express.Router();

usersRoute.get("/:name", (req, res) => {
  const userName = req.params.name;
  const userRegex = `${userName}[sS]*.?`;

  UserModel.find(
    { username: { $regex: userRegex, $options: "gim" } },
    (err, docs) => {
      if (err) {
        console.log(err);
      }

      if (docs.length === 0) {
        res.status(404).json("Users with that name doesn't exist");
      } else {
        console.log(docs);
        res.json(docs);
      }
    }
  );
});
