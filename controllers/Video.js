import { createError } from "../error.js";
import UserModel from "../models/User.js";
import VideoModel from "../models/Video.js";

/////ADD VIDEO
export const addVideo = async (req, res, next) => {
  console.log("video controller");
  const addvid = new VideoModel(req.body);

  try {
    await addvid.save();
    res.status(200).json(addvid);
  } catch (error) {
    next(error);
  }
};

/////GET VIDEO
export const getVideo = async (req, res, next) => {
  console.log("not even getting to the backend to  fetch videos");
  try {
    const getVideo = await VideoModel.findById(req.params.id);

    res.status(200).json(getVideo);
  } catch (error) {
    next(error);
  }
};
/////DELETE VIDEO
export const deleteVideo = async (req, res, next) => {
  ////check if its user video
  const checkVideo = await VideoModel.findById(req.params.id);

  if (!checkVideo) return next(createError(404, "Video not found"));

  if (req.user.id !== checkVideo.userId)
    return next(401, "can only delete your own account");

  try {
    const deletedVid = new VideoModel.findByIdAndDelete(req.params.id);

    await deletedVid.save();

    res.status(200).json(deletedVid);
  } catch (error) {
    next(error);
  }
};
/////UPDATE VIDEO
export const updateVideo = async (req, res, next) => {
  ////check if its user video
  const checkVideo = await VideoModel.findById(req.params.id);

  if (!checkVideo) return next(createError(404, "Video not found"));

  if (req.user.id !== checkVideo.userId)
    return next(401, "can only update your own account");

  const updatedVid = new VideoModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    await updatedVid.save();

    res.status(200).json(updatedVid);
  } catch (error) {
    next(error);
  }
};
/////LIKE  VIDEO
export const likeVideo = async (req, res, next) => {
  console.log("liked page");

  if (req.user.id === req.params.id) {
    try {
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  } else {
    return next(401, "can only update your own account");
  }
};
/////UN VIDEO
export const UnLikeVideo = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  } else {
    return next(401, "can only update your own account");
  }
};

/////addd views

export const updateViews = async (req, res, next) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json("the views has been increase");
  } catch (error) {
    next(error);
  }
};

/////GET RONDOM VIDEOS
export const rondomVideo = async (req, res, next) => {
  try {
    const rondom = await VideoModel.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(rondom);
  } catch (error) {
    next(error);
  }
};

////GET TRENDING VIDEOS

export const trendingVideo = async (req, res, next) => {
  try {
    const trending = await VideoModel.find().sort({ views: -1 });

    res.status(200).json(trending);
  } catch (error) {
    next(error);
  }
};

////GET SUBSCRIBED VIDEOS

export const subVideo = async (req, res, next) => {
  const myInfo = await UserModel.findById(req.user.id);

  const subchannels = myInfo.subscribedUsers;

  try {
    /*     const subVids = await VideoModel.find({userId:})
     */

    const subVideos = await Promise.all(
      subchannels.map((sub) => {
        return VideoModel.find({ userId: sub });
      })
    );
    console.log(subchannels, "array of chanel subbed to");

    res.status(200).json(subVideos.flat());
  } catch (error) {
    next(error);
  }
};

//////////TAGS VIDEOD
export const tagVideos = async (req, res, next) => {
  console.log(req.query.tags, "thats include in tags");

  const tags = req.query.tags.split(",");

  try {
    const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
    console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

/////////SEARCH VIDEOS

export const searchVideo = async (req, res, next) => {
  const include = req.query.include;
  console.log(include);

  try {
    const videos = await VideoModel.find({
      title: { $regex: include, $options: "i" },
    }).limit(20);
    //console.log(videos)
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
