// server/config/supabase.js
require("dotenv").config({ path: "./config/dev.env" });

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Replace with your Supabase API Key

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
