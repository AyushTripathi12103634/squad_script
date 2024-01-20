import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import meetRoute from './routes/meetRoute.js';
// Configuring dotenv
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/meet", meetRoute);

app.use("/", (req, res) => {
  res.send("<h1>Squad Script</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port number ${PORT}`.bgGreen.white);
});
