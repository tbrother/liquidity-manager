import express from "express";
import Order from "../models/Order";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Create new order
router.post("/", async (req, res) => {
  try {
    const { term, amount } = req.body;

    // Basic validation
    if (!term || !amount || term <= 0 || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Valid term and amount are required" });
    }

    const order = await Order.create({ term, amount });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
