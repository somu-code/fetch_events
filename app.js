import express from "express";
import { fetchEvents } from "./index.js";
import dotenv from "dotenv";

dotenv.config({
  override: true,
});
const PORT = process.env.port || 3000;
const app = express();
app.use(express.json());

app.post("/fetch-events", async (req, res) => {
  try {
    const { urlString, isoDate } = await req.body;
    const funcRes = await fetchEvents(urlString, isoDate);
    console.log(funcRes);
    res.json(funcRes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log("app is running");
});
