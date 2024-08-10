import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import meetRoute from './routes/meetRoute.js';
import fileRoute from './routes/fileRoute.js';
import rapidApiRoute from './routes/rapidApiRoute.js';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import './cronjob/cronJobs.js';
import Language from "./Languages.json" assert {type: 'json'};


dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://squad-script.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const documents = {};
const userCount = {};

const applyOperation = (doc, operation) => {
  const { index, text, type } = operation;
  console.log(`Operation: ${type} at index ${index} with text "${text}"`);
  if (type === 'insert') {
    doc = doc.slice(0, index) + text + doc.slice(index);
  } else if (type === 'delete') {
    doc = doc.slice(0, index) + doc.slice(index + text.length);
  } else if(type==='replace') {
    const endIndex = index + text.length;
    console.log(doc.slice(0,index),doc.slice(endIndex),text,text.length)
    doc = doc.slice(0, index) + doc.slice(endIndex);
  }
  return doc;
};

io.on('connection', (socket) => {
  console.log('A new user connected', socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);

    if (!documents[room]) {
      documents[room] = { str: Language['C# (Mono 6.6.0.161)'].value, operations: [] };
    }

    if (!userCount[room]) {
      userCount[room] = 0;
    }
    userCount[room]++;

    socket.emit('initialize', documents[room].str);

    socket.on('operation', (operation) => {
      const doc = documents[room];
      doc.str = applyOperation(doc.str, operation);
      doc.operations.push(operation);
      socket.to(room).emit('operation', operation);
    });
  });

  socket.on('message', (data) => {
    console.log('message: ', data.text);
    io.to(data.room).emit('message', { username: data.username, text: data.text });
  });

  socket.on('disconnect', () => {
    for (let room in userCount) {
      if (userCount.hasOwnProperty(room) && socket.rooms.has(room)) {
        userCount[room]--;
        if (userCount[room] === 0) {
          delete documents[room];
          delete userCount[room];
        }
      }
    }
    console.log('User disconnected', socket.id);
  });
});

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/meet", meetRoute);
app.use("/api/v1/rapidapi", rapidApiRoute);
app.use("/api/v1/file", fileRoute);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`.bgGreen.white);
});
