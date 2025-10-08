import express from "express";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { name, email, password, profilpic } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      ProfilePic: profilpic,
    });
    const token = generateToken(user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      ProfilePic: user.ProfilePic,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password, profilepic } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      ProfilePic: user.ProfilePic,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

router.get('/verify', protect, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,  
  });
});

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default router;
