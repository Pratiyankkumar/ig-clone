require("dotenv").config({ path: "./config/dev.env" });
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const UserRouter = require("./routes/User");
const PostRouter = require("./routes/Post");
require("./db/mongoose");

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors());

// Configure CORS for Socket.IO
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.set("socketio", io);

app.use(express.json());
app.use(bodyParser.json());

app.use(uploadRoutes);
app.use(UserRouter);
app.use(PostRouter);
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server running on port " + process.env.SERVER_PORT);
});
