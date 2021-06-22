import express from "express";

export const signUpRoute = express.Router();

signUpRoute.get("/", (req, res) => {
  res.send("Sign Up Route");
});
