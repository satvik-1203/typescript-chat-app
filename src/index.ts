console.clear();
import express from "express";
import { mainRouter } from "./express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/sdMain", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection to the db...");
  })
  .catch((err) => console.log(err));

const app = express();

app.use("/api", mainRouter);

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
