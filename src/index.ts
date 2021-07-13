console.clear();
import express from "express";
import { mainRouter } from "./express";
import mongoose from "mongoose";
import { Server } from "socket.io";

const io = new Server(3002, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

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

// sockets

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send message", (message: string) => {
    socket.broadcast.emit("receive-message", message);
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
