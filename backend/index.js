import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  "https://react-note-app-1.onrender.com",
  "http://localhost:5173",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Serve static frontend


// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
