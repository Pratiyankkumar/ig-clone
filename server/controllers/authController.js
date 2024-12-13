require("dotenv").config({ path: "./config/dev.env" });
const { createClient } = require("@supabase/supabase-js");
const User = require("../models/User");
require("../db/mongoose");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const signUpUser = async (req, res) => {
  const { email, password, name, userName } = req.body;

  try {
    const exists = await User.exists({ userName });
    if (exists) throw new Error("Username already taken");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const user = new User({
      name,
      userName,
      email,
      tokens: [{ token: data.session.access_token }], // Add the token here
    });

    if (!user) {
      throw new Error("An error Occurred");
    }

    await user.save();

    res.status(201).json({
      message: "User signed up successfully",
      accessToken: data.session?.access_token,
      user: data.user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Find the user and update their tokens
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Add new token to the tokens array
    user.tokens = user.tokens || [];
    user.tokens.push({ token: data.session.access_token });
    await user.save();

    res.status(200).json({
      message: "Logged in successfully",
      accessToken: data.session?.access_token,
      user: data.user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error logging out");
    }

    // If you want to remove the token on logout, you'll need to pass the user's email or ID
    // and the token in the request
    if (req.body.email && req.body.token) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        user.tokens = user.tokens.filter((t) => t.token !== req.body.token);
        await user.save();
      }
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signUpUser, loginUser, logoutUser };
