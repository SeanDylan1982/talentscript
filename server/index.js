import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
