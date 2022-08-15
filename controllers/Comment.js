import { createError } from "../error.js";
import CommentModel from "../models/Comment.js";
import VideoModel from "../models/Video.js";

/////add comments
export const addComment = async (req, res, next) => {
  const comment = new CommentModel(req.body);
  try {
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

///////DELETE COMMENT

export const deleteComment = async (req, res, next) => {
  const commentInfo = await CommentModel.findById(req.params.id);
  console.log({
    comuser: commentInfo.userId,
    userId: req.user.id,
    paramid: req.params.id,
  });

  if (req.user.id === commentInfo.userId) {
    try {
      await CommentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        messg: "comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(401, "can only delete your own comment"));
  }
};

///////get COMMENTs

export const getComments = async (req, res, next) => {
  console.log("got here");
  try {
    ////get vid id by comment
    const comments = await CommentModel.find({ videoId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
