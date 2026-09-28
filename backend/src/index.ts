import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import userAuth from "./routes/auth.js";
import userHotels from './routes/my-hotel.js';
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {v2 as cloudinary}  from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database: ", process.env.MONGODB_CONNECTION_STRING);
  console.log(process.env.CLOUDINARY_API_KEY)
  console.log(process.env.CLOUDINARY_CLOUD_NAME)
  console.log(process.env.CLOUDINARY_API_SECRET)
});

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.static(path.join(dirname, "../../frontend/dist")));

app.use('/api/auth', userAuth);
app.use('/api/user', userRoute);
app.use('/api/my-hotels', userHotels);

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(dirname, "../../frontend/dist/index.html"));
});


app.listen(1000, () => {
  console.log("server is running");
});
