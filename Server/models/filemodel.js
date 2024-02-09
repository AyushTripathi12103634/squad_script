import mongoose from "mongoose";

const fileschema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      access: {
        type: Boolean,
        required: true,
        default: false, 
      },
      access_id:{
        type : Array,
        default: [],
      },
      meetingid:{
        type: String,
        required:true,
        unique : true,
      }
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("files", fileschema);
  