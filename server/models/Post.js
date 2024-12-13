const mongoose = require("mongoose");
require("../db/mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: String,
    required: true,
    default: "",
  },
  likes: {
    type: [
      {
        like: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    default: [], // Default value for likes
  },
  comments: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
