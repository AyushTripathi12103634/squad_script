import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default:false,
    },
    lastVerified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userschema.methods.checkVerification = async function() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  if (this.lastVerified < sixMonthsAgo) {
    this.isVerified = false;
    await this.save();
  }
  if (!this.isVerified && this.lastVerified < oneMonthAgo) {
    await this.model('Users').deleteOne({ _id: this._id });
  }
};

export default mongoose.model("Users", userschema);
