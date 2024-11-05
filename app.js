import express from "express";
import { fetchEvents } from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.post("/fetch-events", async (req, res) => {
  const { urlString, isoDate } = req.body;

  if (!urlString || !isoDate) {
    return res.status(400).json({ error: "urlString and isoDate are required" });
  }

  try {
    const funcRes = await fetchEvents(urlString, isoDate);
    res.json(funcRes);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
