// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import { scoreProduct } from "../utils/score.js";

const router = express.Router();

// Get all products (optional)
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// ✅ Top matches endpoint
router.post("/top", async (req, res) => {
  const { profile } = req.body;
  if (!profile) return res.status(400).json({ error: "Profile is required" });

  try {
    const products = await Product.find({});
    const scored = products.map(p => ({ product: p, ...scoreProduct(profile, p) }));
    // Sort by score descending, then budget rank ascending
    scored.sort((a, b) => b.score - a.score || a.budgetRank - b.budgetRank);
    res.json({ recommendations: scored.slice(0, 10) }); // top 10
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
