import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// -------------------- Setup --------------------
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- CORS --------------------
const allowedOrigins = [
  "https://react-note-app-1.onrender.com", // frontend deployed
  "http://localhost:5173", // local dev
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// -------------------- Middleware --------------------
app.use(express.json());

// Multer setup for file uploads (if needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------- API Routes --------------------
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// -------------------- Serve React SPA --------------------
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all for React Router routes (Express 5 safe)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next(); // skip API routes
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------------------- Start Server --------------------
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
