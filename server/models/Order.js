import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // e.g. FAB-7X9K2M
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    customHamper: { type: Boolean, default: false },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      phone: String,
      email: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["cod", "razorpay"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "cod_pending"], default: "pending" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    orderStatus: {
  type: String,
  enum: [
    "confirmed",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ],
  default: "confirmed",
}
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
