import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({
      email: "admin@fabliss.com",
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      name: "Fabliss Admin",
      email: "admin@fabliss.com",
      password: hashedPassword,
    });

    console.log("Admin Created Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();