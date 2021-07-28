console.clear();
import express from "express";
import { mainRouter } from "./express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import jwtAuth from "socketio-jwt-auth";

require("dotenv").config();

const app = express();
const server = http.createServer(app);
app.use("/api", mainRouter);

mongoose
  .connect("mongodb://localhost:27017/sdMain", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection to the db...");
  })
  .catch((err) => console.log(err));

// sockets
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// middleware
io.use(
  jwtAuth.authenticate(
    {
      secret: "BLANK", // required, used to verify the token's signature
      algorithm: "HS256", // optional, default to be HS256
      succeedWithoutToken: true,
    },
    (payload: any, done: any) => {
      if (payload && payload.sub) {
        return done(null, payload);
      } else {
        return done();
      }
    }
  )
);

type RoomType = string | null;

io.on("connection", (socket) => {
  socket.emit("success", {
    message: "success logged in",
    data: socket.request,
  });

  let currRoom: RoomType = null;

  socket.on("change-room", (targetRoom: string) => {
    socket.join(targetRoom);
    currRoom = targetRoom;
  });

  socket.on("send-message", (message: string) => {
    if (currRoom) {
      socket.to(currRoom).emit("receive-message", message);
    }
  });
});

server.listen(3001, () => {
  console.log("Listening on port 3001...");
});
