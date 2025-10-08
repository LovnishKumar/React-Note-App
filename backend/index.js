import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';
import { connectDB } from './db/db.js';
import dotenv from "dotenv";
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage });
dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})