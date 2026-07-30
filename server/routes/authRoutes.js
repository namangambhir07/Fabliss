import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isValidName, isValidEmail, isValidPhone, isValidPassword } from "../utils/validators.js";

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!isValidName(name || ""))
      return res.status(400).json({ message: "Please enter a valid name (letters only, 2-40 characters)" });
    if (!isValidEmail(email || ""))
      return res.status(400).json({ message: "Please enter a valid email address" });
    if (!isValidPhone(phone || ""))
      return res.status(400).json({ message: "Please enter a valid 10-digit Indian mobile number" });
    if (!isValidPassword(password || ""))
      return res.status(400).json({ message: "Password must be at least 8 characters and include a letter and a number" });

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(409).json({ message: "An account with this email or phone already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashed });

    res.status(201).json({
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while creating your account" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isValidEmail(email || ""))
      return res.status(400).json({ message: "Please enter a valid email address" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password || "", user.password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while logging in" });
  }
});

export default router;
