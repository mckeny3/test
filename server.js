import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js";
import commentRoutes from "./Routes/comments.js";
import videoRoutes from "./Routes/video.js";
import cookieParser from "cookie-parser";

import cors from "cors";
import { AppBar } from "@material-ui/core";
const app = express();
const PORT = process.env.PORT;
dotenv.config();
app.use(
  cors({ credentials: true, origin: process.env.REACT_APP_FRONTEND_URL })
);

////////DATABASE CONNNECTION
const CONNECT = async () => {
  await mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => {
      app.listen(process.env.PORT, () =>
        console.log("server running on ", process.env.PORT)
      );
    })
    .catch((e) => {
      console.log({ Error: e });
      return;
    });
};

/////CONNECTING FRONT
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

CONNECT();
//////////
//////MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "somthing went wrong";

  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});
/////////////BASE ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/video", videoRoutes);
