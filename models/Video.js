import mongoose from "mongoose";

const videoShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    userId: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    likes: {
      type: [String],
      //required:true,
    },
    disLikes: {
      type: [String],
      // required:true,
    },
  },
  { timestamps: true }
);
const VideoModel = mongoose.model("VideoModel", videoShema);

export default VideoModel;
