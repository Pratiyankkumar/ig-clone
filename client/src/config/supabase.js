import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfbtmrgmlxamkjbiccqo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnRtcmdtbHhhbWtqYmljY3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDY3MDUsImV4cCI6MjA0ODg4MjcwNX0.DooSjE6AKQVuQRnUkeFJaDCyh92sg-fb4ezhHaHhIno";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
