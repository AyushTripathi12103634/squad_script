import mongoose from "mongoose";

const meetschema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
    meeting_members: {
      type: Array,
      default: [],
    },
    meeting_id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Meet", meetschema);
