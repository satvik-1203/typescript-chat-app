import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
require("dotenv").config();

export default (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined | string[] = req.headers["JWT-TOKEN"];
  if (!token) return console.log("no token");
  if (!process.env["JWT-SIGN"]) return console.log("No sign");
  try {
    if (typeof token === "object") return;
    const payload = jwt.verify(token, process.env["JWT-SIGN"]);
    if (!payload) res.status(400).send("Invalid Token");
    req.body["JWT-payload"] = payload;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};
