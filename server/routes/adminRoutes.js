import express from "express";
import Order from "../models/Order.js";
import adminProtect from "../middleware/adminAuth.js";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();
router.post("/login", loginAdmin);

// Get all orders
router.get("/orders", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status
router.put("/orders/:id/status", adminProtect, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;