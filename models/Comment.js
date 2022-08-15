import mongoose from "mongoose";

const CommentShema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    }, 
    videoId:{
        type:String,
        required:true,
    }, 
    comment:{
        type:String,
        required:true,
    }, 
   
   
   
},{timestamps:true})

export default mongoose.model("CommentModel",CommentShema);