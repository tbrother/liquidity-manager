import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import treasuryRoutes from "./routes/treasury";
import orderRoutes from "./routes/orders";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Liquidity Manager API" });
});

app.use("/api/treasury", treasuryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
