import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    qty: { type: Number, required: true, default: 1 },
    meta: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // stored as a bcrypt hash
    cart: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
