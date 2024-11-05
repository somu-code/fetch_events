import express from "express";
import { fetchEvents } from "./index.js";
import dotenv from "dotenv";

dotenv.config({
  override: true,
});
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.post("/fetch-events", async (req, res) => {
  try {
    const { urlString, isoDate } = req.body;
    const funcRes = await fetchEvents(urlString, isoDate);
    res.json(funcRes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log("app is running");
});
