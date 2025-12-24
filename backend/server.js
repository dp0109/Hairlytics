// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatbotRoutes from "./routes/chatbotRoutes.js";

import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/products", productRoutes);


// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/haircare_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("🤖 Chatbot route available at /api/chatbot");
});
