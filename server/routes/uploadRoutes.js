// server/routes/uploadRoute.js

const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadImage, uploadStory } = require("../controllers/uploadController");
const User = require("../models/User");
const Post = require("../models/Post");

const router = express.Router();

// Configure multer to handle file upload
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }).single("file"); // 'file' is the field name in Postman

// Route to handle image upload
router.post("/upload/avatar", authMiddleware, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file; // This will be the file uploaded via Postman
    const publicUrl = await uploadImage(file, "profile-pics"); // Upload to Supabase

    // Log the URL before sending it to the client
    console.log("API Response URL:", publicUrl);

    const user = await User.findById(req.user._id);
    user.profilePic = publicUrl;
    await user.save();

    res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to upload image", details: err.message });
  }
});

router.post("/upload/post", authMiddleware, upload, async (req, res) => {
  const io = req.app.get("socketio");
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file; // This will be the file uploaded via Postman
    const publicUrl = await uploadImage(file, "post"); // Upload to Supabase

    const post = new Post({
      userId: req.user._id,
      caption: req.body.caption,
      post: publicUrl,
    });

    await post.save();

    io.emit("new-upload", { post });

    res.status(201).send(post);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to upload image", details: err.message });
  }
});

router.post("/upload/story", authMiddleware, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const file = req.file;
    const publicUrl = await uploadStory(file, "story");

    const user = await User.findById(req.user._id);

    user.story.push({
      userId: req.user._id,
      story: publicUrl,
      text: req.body.text,
    });

    await user.save();

    res.status(201).send(user.story);
  } catch (err) {
    res.status(500).send({ message: "An error Occured" });
  }
});

module.exports = router;
