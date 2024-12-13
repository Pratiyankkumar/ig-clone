const express = require("express");
const Post = require("../models/Post");
require("../db/mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/posts/user/:id", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });

    if (!posts) {
      throw new Error("An error Occured");
    }

    if (posts.length === 0) {
      return res.status(404).send({ message: "Please add some posts first" });
    }

    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/post/byId/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.length === 0) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (!post) {
      res.status(400).send({ message: "An error Occured" });
    }

    res.send(post);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/posts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).send({ message: "please add some posts first" });
    }

    if (!posts) {
      res.status(400).send({ message: "An error Occured" });
    }

    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/posts/me", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.user._id); // Debug log

    const posts = await Post.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    console.log("Found posts:", posts); // Debug log

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: error.message,
    });
  }
});

router.post("/post/like/:id", authMiddleware, async (req, res) => {
  const io = req.app.get("socketio");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likes.some(
      (like) => like.like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      return res
        .status(400)
        .send({ message: "You have already liked the post" });
    }

    // Add the like
    post.likes.push({ like: req.user._id });

    await post.save();

    io.emit("postLiked", { postId: req.params.id, likesCount: post.likes });

    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/post/unlike/:id", authMiddleware, async (req, res) => {
  const io = req.app.get("socketio");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Check if the user has liked the post
    const likeIndex = post.likes.findIndex(
      (like) => like.like.toString() === req.user._id.toString()
    );

    if (likeIndex === -1) {
      return res.status(400).send({ message: "User has not liked the post" });
    }

    // Remove the like
    post.likes.splice(likeIndex, 1);

    await post.save();

    io.emit("postUnliked", { postId: req.params.id, likesCount: post.likes });

    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/post/isliked/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).send({ message: "No Post found" });
    }

    const isLiked = post.likes.some(
      (like) => like.like.toString() === req.user._id.toString()
    );

    res.send({ isLiked });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/post/comment/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({ comment: req.body.comment, userId: req.user._id });

    if (!post) {
      throw new Error("An error occured");
    }

    if (post.length === 0) {
      res.status(404).send({ message: "Please add some posts first" });
    }

    await post.save();

    res.send(post);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete(
  "/post/deletecomment/:postId/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }

      // Check if the comment exists and belongs to the user
      const comment = post.comments.find(
        (c) => c._id.toString() === req.params.commentId
      );

      if (!comment) {
        return res.status(404).send({ message: "Comment not found" });
      }

      if (comment.userId.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete this comment" });
      }

      // Filter out the comment to delete
      post.comments = post.comments.filter(
        (c) => c._id.toString() !== req.params.commentId
      );

      await post.save();

      res.send({ message: "Comment deleted successfully", post });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
