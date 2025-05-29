import express from "express";
import treasuryService from "../services/treasuryService";

const router = express.Router();

router.get("/yield-curve", async (req, res) => {
  try {
    const yieldData = await treasuryService.fetchYieldCurveData();
    // const yieldData = [{"date":"2025-05-27T00:00:00.000Z","yields":[{"term":1,"yield":4.35,"date":"2025-05-27T00:00:00.000Z"},{"term":3,"yield":4.35,"date":"2025-05-27T00:00:00.000Z"},{"term":12,"yield":4.14,"date":"2025-05-27T00:00:00.000Z"},{"term":24,"yield":3.92,"date":"2025-05-27T00:00:00.000Z"},{"term":60,"yield":4.04,"date":"2025-05-27T00:00:00.000Z"},{"term":120,"yield":4.43,"date":"2025-05-27T00:00:00.000Z"},{"term":360,"yield":4.94,"date":"2025-05-27T00:00:00.000Z"}]}];
    res.json(yieldData);
  } catch (error) {
    console.error("Error fetching yield curve:", error);
    res.status(500).json({ error: "Failed to fetch yield curve data" });
  }
});

export default router;
