import express from "express";
import { hampers, customCatalogue } from "../data/products.js";

const router = express.Router();

// GET /api/products/hampers - all 4 fixed occasion hampers
router.get("/hampers", (req, res) => {
  res.json(hampers);
});

// GET /api/products/hampers/:slug - single hamper detail
router.get("/hampers/:slug", (req, res) => {
  const hamper = hampers.find((h) => h.slug === req.params.slug);
  if (!hamper) return res.status(404).json({ message: "Hamper not found" });
  res.json(hamper);
});

// GET /api/products/custom - catalogue used by the "build your own hamper" page
router.get("/custom", (req, res) => {
  res.json(customCatalogue);
});

export default router;
