import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import meetRoute from './routes/meetRoute.js';
import rapidApiRoute from './routes/rapidApiRoute.js'
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";

// Configuring dotenv
dotenv.config();

connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SERVER_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a new user connected', socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('code', (data) => {
    socket.to(data.room).emit('code', data.text);
  });

  socket.on('message', (data) => {
    socket.to(data.room).emit("broadcast", data.text);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/meet", meetRoute);
app.use("/api/v1/rapidapi", rapidApiRoute);

app.use("/", (req, res) => {
  res.send("<h1>Squad Script</h1>");
});

const PORT = process.env.PORT || 5000; // Assuming a default port of 5000

server.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`.bgGreen.white);
});
