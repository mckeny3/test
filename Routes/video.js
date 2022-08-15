import express from "express";
import {
  tagVideos,
  searchVideo,
  addVideo,
  getVideo,
  deleteVideo,
  updateVideo,
  likeVideo,
  UnLikeVideo,
  trendingVideo,
  subVideo,
  updateViews,
  rondomVideo,
} from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";
const videoRoutes = express.Router();

////ADD A VIDEO
videoRoutes.post("/addVideo", verifyToken, addVideo);

/////////delete video

videoRoutes.delete("/:id", verifyToken, deleteVideo);

////update a video

videoRoutes.put(":id", verifyToken, updateVideo);

////update a video

videoRoutes.put("/unlike/:id", verifyToken, UnLikeVideo);

////update a video

videoRoutes.put("like/:id", verifyToken, likeVideo);

///////find video

videoRoutes.get("/find/:id", getVideo);

////trending

videoRoutes.get("/trendingVideo", trendingVideo);

////views

videoRoutes.put("/view/:id", updateViews);

videoRoutes.get("/rondomVideo", rondomVideo);

videoRoutes.get("/subVideos", verifyToken, subVideo);

videoRoutes.get("/tags", tagVideos);
videoRoutes.get("/search", searchVideo);

export default videoRoutes;
