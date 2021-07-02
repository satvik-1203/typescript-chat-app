import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
require("dotenv").config();

// Has the jwt in the payload

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const token: string | undefined | string[] = req.headers["jwt_token"];
  if (!token) return console.log("no token", req.headers);

  //

  if (!process.env["JWT-SIGN"]) return res.status(500).send("No sign");

  try {
    //
    // verifying the token in this try catch block

    if (typeof token === "object") return;
    const payload = jwt.verify(token, process.env["JWT-SIGN"]);

    if (!payload) res.status(400).send("Invalid Token");
    req.body["jwt-payload"] = payload;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};
