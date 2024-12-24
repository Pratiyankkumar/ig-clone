const mongoose = require("mongoose");
require("../db/mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  profilePic: {
    type: String,
    default: "https://superst.ac/_next/image?url=%2FIMG_8692.PNG&w=128&q=75",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  saved: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  followers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  following: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  story: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Adjust to match your user model name
      },
      story: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the timestamp
        expires: 86400, // 24 hours in seconds
      },
      text: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
