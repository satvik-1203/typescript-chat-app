import express from "express";
import { mainRouter } from "./express";

const app = express();

app.use("/api", mainRouter);

app.listen(3001, () => {
  console.log("Listening on port 3000...");
});
