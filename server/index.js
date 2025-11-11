import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Base route
app.get("/", (req, res) => {
  res.send("LearnVerse backend running ✅");
});

// ✅ New test route for frontend connection
app.post("/progress", (req, res) => {
  console.log("Received progress data:", req.body);
  res.json({
    success: true,
    message: "Progress received successfully!",
    received: req.body,
  });
});

// Render or local port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`LearnVerse backend listening on ${PORT}`);
});
