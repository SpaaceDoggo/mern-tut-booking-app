import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import userAuth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database: ", process.env.MONGODB_CONNECTION_STRING);
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


app.listen(1000, () => {
  console.log("server is running");
});
