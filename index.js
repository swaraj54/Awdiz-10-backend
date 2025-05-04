import express from "express";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("combined"));
dotenv.config();
const corsOptions = {
  origin: "https://awdiz-10-react.vercel.app",
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

app.listen(8000, () => console.log("Server is running on port 8000"));
