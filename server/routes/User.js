const express = require("express");
require("../db/mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).send({ message: "Please add some users first" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user.length === 0) {
      return res.status(404).send({ message: "Please add some users first" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/users/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);

    if (!user) {
      throw new Error({ message: "User not found" });
    }

    if (user.length === 0) {
      return res.status(404).send({ message: "Please add some users first" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/user/save/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error({ message: "User not found" });
    }

    if (user.length === 0) {
      return res.status(404).send({ message: "Please add some users first" });
    }

    const postIndex = user.saved.findIndex(
      (post) => post.postId.toString() === req.params.id.toString()
    );

    if (postIndex === -1) {
      user.saved.push({ postId: req.params.id });
    } else {
      res.status(400).send({ message: "You have already saved the post" });
    }

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/user/saved/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isSaved = user.saved.some(
      (post) => post.postId.toString() === req.params.id.toString()
    );

    if (isSaved) {
      return res.status(200).send({ message: true });
    } else {
      return res.status(404).send({ message: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/user/unsave/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const postIndex = user.saved.findIndex(
      (post) => post.postId.toString() === req.params.id.toString()
    );

    if (postIndex === -1) {
      return res.status(404).send({ message: "Post not found in saved list" });
    }

    // Remove the post from the saved list
    user.saved.splice(postIndex, 1);
    await user.save();

    res.send({ message: "Post unsaved successfully", saved: user.saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
