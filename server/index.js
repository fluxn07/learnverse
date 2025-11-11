import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn("Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// health
app.get("/", (req, res) => res.send("LearnVerse backend running"));

// save/update user progress
app.post("/progress", async (req, res) => {
  try {
    const { userId, topicId, completionPercent, correctAnswers, totalQuestions, timeSpent } = req.body;
    if (!userId || !topicId) return res.status(400).json({ error: "userId and topicId required" });

    const payload = {
      user_id: userId,
      topic_id: topicId,
      completion_percent: completionPercent ?? 0,
      correct_answers: correctAnswers ?? 0,
      total_questions: totalQuestions ?? 0,
      time_spent: timeSpent ?? 0,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from("progress").upsert(payload).select();

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`LearnVerse backend listening on ${PORT}`));
