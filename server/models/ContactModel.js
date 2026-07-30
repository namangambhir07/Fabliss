import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ["Contact", "Bulk Order"],
      default: "Contact",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: String,
      trim: true,
    },

    occasion: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);