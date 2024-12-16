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

router.post("/user/follow/:userId", authMiddleware, async (req, res) => {
  try {
    const [userFollowed, authedUser] = await Promise.all([
      User.findById(req.params.userId),
      User.findById(req.user._id),
    ]);

    if (!userFollowed || !authedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (
      authedUser.following.some(
        (f) => f.userId.toString() === req.params.userId
      )
    ) {
      throw new Error("You are already following this user");
    }

    authedUser.following.push({ userId: req.params.userId });
    await authedUser.save();

    userFollowed.followers.push({ userId: req.user._id });
    await userFollowed.save();

    res.send({
      message: "Followed successfully",
      following: authedUser.following,
      followers: authedUser.followers,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/user/isfollowing/:userId", authMiddleware, async (req, res) => {
  try {
    const authedUser = await User.findById(req.user._id);

    if (!authedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (
      authedUser.following.some(
        (f) => f.userId.toString() === req.params.userId
      )
    ) {
      return res.send({ following: true });
    }

    res.send({ following: false });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/user/unfollow/:userId", authMiddleware, async (req, res) => {
  try {
    const [userUnfollowed, authedUser] = await Promise.all([
      User.findById(req.params.userId),
      User.findById(req.user._id),
    ]);

    if (!userUnfollowed || !authedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (
      authedUser.following.some(
        (f) => f.userId.toString() !== req.params.userId
      )
    ) {
      throw new Error("You have already unfollowed this user");
    }

    // Update the followers list of the user being unfollowed
    userUnfollowed.followers = userUnfollowed.followers.filter(
      (follower) => follower.userId.toString() !== req.user._id.toString()
    );
    await userUnfollowed.save();

    // Update the following list of the authenticated user
    authedUser.following = authedUser.following.filter(
      (follow) => follow.userId.toString() !== req.params.userId.toString()
    );
    await authedUser.save();

    res.send({
      message: "Unfollowed successfully",
      following: authedUser.following,
      followers: userUnfollowed.followers,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
