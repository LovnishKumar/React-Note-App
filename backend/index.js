import express from 'express';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';
import { connectDB } from './db/db.js';
import dotenv from "dotenv";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

const allowedOrigins = [
  "https://react-note-app-1.onrender.com", // your frontend Render URL
  "http://localhost:5173", // local dev (Vite default)
];




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

// ✅ Serve React frontend (Vite build)
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// ✅ Wildcard for React Router (Express 5 fix)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Connect DB & start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
