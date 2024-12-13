require("dotenv").config({ path: "../../config/dev.env" });
require("../../config/dev.env");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
