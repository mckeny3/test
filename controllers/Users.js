import UserModel from "../models/User.js";
import { createError } from "../error.js";
import VideoModel from "../models/Video.js";
import { json } from "express";
// ///GET USERS
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log("success");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};
// ////////DELETE USERS
export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(createError(403, "can only delete your own account"));

  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, "user doesnt exist"));
    }
    console.log("success");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// ///////UPDATE USER
export const updateUser = async (req, res, next) => {
  // ///make sure user updating their onw shit
  if (req.params.id !== req.user.id)
    return next(createError(401, "can only update your own account"));

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("success");
    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(404, "error updating"));
  }
};

// /////////SUBSCRIBE TO USER
export const subscribedUsers = async (req, res, next) => {
  try {
    // /THEN ADD THAT CHANNEL TO THE LIST OF MY CHANNELS IM SB TO

    const addToList = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          subscribedUsers: req.params.id,
        },
      },
      { new: true }
    );

    const updateChanelSub = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          subscribers: 1,
        },
      },
      { new: true }
    );

    console.log("subscribed successfully", req.user.userName);

    res.status(200).json(updateChanelSub);
  } catch (error) {
    next(error.message);
  }
};
// ///////UN SUBSCRIBE
export const unsubscribeUser = async (req, res, next) => {
  try {
    const updateChanelSub = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          subscribers: -1,
        },
      },
      { new: true }
    );

    // /THEN ADD THAT CHANNEL TO THE LIST OF MY CHANNELS IM SB TO
    console.log("un subscribe successfully");

    const removeMyList = await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: {
        subscribedUsers: req.params.id,
      },
    });
    res.status(200).json(updateChanelSub);
  } catch (error) {
    next(createError(404, "something went wrong"));
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const likevid = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user.id },
        $pull: { disLikes: req.user.id },
      },
      { new: true }
    );
    console.log("liked from server", likevid);

    res.status(200).json(likevid);
  } catch (error) {
    next(error);
  }
};

export const unLikeVideo = async (req, res, next) => {
  try {
    const dislikevid = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { disLikes: req.user.id },
        $pull: { likes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json(dislikevid);
  } catch (error) {
    next(error);
  }
};
