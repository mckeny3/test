import express from "express";
import {
  getUser,
  deleteUser,
  subscribedUsers,
  unLikeVideo,
  unsubscribeUser,
  likeVideo,
  updateUser,
} from "../controllers/Users.js";
import { verifyToken } from "../verifyToken.js";

const userRoutes = express.Router();

////////GET USERS
userRoutes.get("/find/:id", getUser);

////////UPDATE USER
userRoutes.put("/:id", verifyToken, updateUser);
////////DELETE USER
userRoutes.delete("/:id", verifyToken, deleteUser);
////////SUBSCRIBE A USER
userRoutes.put("/sub/:id", verifyToken, subscribedUsers);
////////UNSUBSCRIBED A USER
userRoutes.put("/unsub/:id", verifyToken, unsubscribeUser);
//////// LIKE A VIDEO
userRoutes.put("/like/:id", verifyToken, likeVideo);
////////DISLIKE A VIDEO
userRoutes.put("/dislike/:id", verifyToken, unLikeVideo);

export default userRoutes;
