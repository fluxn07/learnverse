// api.js
// -------------------------------------
// Handles all API calls between frontend and backend
// -------------------------------------

// ✅ Your live backend URL from Render
const API_BASE = "https://learnverse-backend-89ox.onrender.com";

// 🟢 Ping the backend to keep it awake (especially on free Render tier)
export async function pingServer() {
  try {
    await fetch(`${API_BASE}/`);
    console.log("✅ Backend pinged successfully");
  } catch (err) {
    console.log("⚠️ Backend ping failed (might be asleep):", err.message);
  }
}

// 💾 Save user learning progress
export async function saveProgress(
  userId,
  topicId,
  completionPercent,
  correctAnswers,
  totalQuestions,
  timeSpent
) {
  try {
    const res = await fetch(`${API_BASE}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        topicId,
        completionPercent,
        correctAnswers,
        totalQuestions,
        timeSpent,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Error saving progress:", err.message);
    return { success: false, error: err.message };
  }
}
