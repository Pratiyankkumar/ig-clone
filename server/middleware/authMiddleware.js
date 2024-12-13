require("dotenv").config({ path: "../../config/dev.env" });
const { createClient } = require("@supabase/supabase-js");
const User = require("../models/User");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const user = await User.findOne({ "tokens.token": token });

    req.user = user; // Attach user info to request object
    next();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Authentication failed", details: err.message });
  }
};

module.exports = authMiddleware;
