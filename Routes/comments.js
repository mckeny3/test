import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const commentRoutes = express.Router();

////////GET comments
commentRoutes.get("/:id", getComments);

////////add comments

commentRoutes.post("/add", verifyToken, addComment);

//////////edit comments

//commentRoutes.put('/edit/:id',verifyToken,editComment)

/////////Delete comment
commentRoutes.delete("/:id", verifyToken, deleteComment);

export default commentRoutes;
