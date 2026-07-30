import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import shortid from "shortid";
import Order from "../models/Order.js";
import protect from "../middleware/auth.js";
import { isDelhiNCRPincode } from "../utils/validators.js";

const router = express.Router();

const getRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

const generateOrderId = () =>
  `FAB-${shortid.generate().toUpperCase().slice(0, 6)}`;

// ==============================
// CREATE RAZORPAY ORDER
// ==============================
router.post("/razorpay/create", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid order amount",
      });
    }

    console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "Secret:",
      process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "NOT FOUND"
    );

    const instance = getRazorpayInstance();

    const razorpayOrder = await instance.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: generateOrderId(),
    });

    res.json(razorpayOrder);
  } catch (err) {
    console.error("RAZORPAY CREATE ERROR");
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ==============================
// VERIFY PAYMENT
// ==============================
router.post("/razorpay/verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    res.json({
      verified: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Payment verification failed",
    });
  }
});

// ==============================
// PLACE ORDER
// ==============================
router.post("/place", protect, async (req, res) => {
  try {
    const {
      items,
      customHamper,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    if (
      !shippingAddress ||
      !isDelhiNCRPincode(shippingAddress.pincode)
    ) {
      return res.status(400).json({
        message:
          "Sorry, Fabliss currently delivers only within Delhi NCR",
      });
    }

    if (!items || !items.length) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    const order = await Order.create({
      orderId: generateOrderId(),
      user: req.userId,
      items,
      customHamper: !!customHamper,
      subtotal,
      shipping: shipping || 0,
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus:
        paymentMethod === "cod"
          ? "cod_pending"
          : "paid",
      razorpayOrderId,
      razorpayPaymentId,
    });

    res.status(201).json({
      orderId: order.orderId,
      order,
    });
  } catch (err) {
  console.error("PLACE ORDER ERROR:");
  console.error(err);

  res.status(500).json({
    message: err.message,
  });
}
});

// ==============================
// ORDER HISTORY
// ==============================
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Could not fetch orders",
    });
  }
});

export default router;