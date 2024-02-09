import mongoose from "mongoose";

const meetschema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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

meetschema.methods.checkmeetExpiry = async function() {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  if (this.createdAt < twentyFourHoursAgo) {
    await this.model('Meet').deleteOne({ _id: this._id });
  }
};
export default mongoose.model("Meet", meetschema);
