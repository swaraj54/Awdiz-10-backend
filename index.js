import express from "express";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import User from "./models/user.schema.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    // origin: "https://awdiz-10-react.vercel.app",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// storing locally
export const sellersSockets = new Map(); // {"seller id" : "socket id"}

io.on("connection", (socket) => {
  console.log("Socket Server connected", socket.id);

  socket.on("registerSeller", async (userData) => {
    console.log("registerSeller got");
    const isSellerExist = await User.findById(userData.userId);
    if (isSellerExist) {
      sellersSockets.set(userData.userId, socket.id);
      console.log(userData.userId, socket.id, "set");
      console.log(sellersSockets,"sellersSockets")
    }
  });

  socket.on("send_message", (data) => {
    console.log("Message recevied", data);
    io.emit("receive_message", { data });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected.");
    for (let [sellerId, socketId] of sellersSockets.entries()) {
      if (socketId == socket.id) {
        sellersSockets.delete(sellerId);
        console.log("Connection closed for", sellerId);
        break;
      }
    }
  });
});

app.use(express.json());
app.use(morgan("combined"));
dotenv.config();
const corsOptions = {
  // origin: "https://awdiz-10-react.vercel.app",
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Welcome to backend server.");
});

app.use("/api/v1", AllRoutes);

mongoose.connect(process.env.MONGODBURL).then(() => {
  console.log("MongoDb conected.");
});

server.listen(8000, () => console.log("Server is running on port 8000"));
