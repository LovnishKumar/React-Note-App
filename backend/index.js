import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Express 5-safe React Router fallback
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api")) return next();
  // Only serve index.html if the file exists in dist
  res.sendFile(path.join(frontendPath, "index.html"), err => {
    if (err) next(err);
  });
});

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
