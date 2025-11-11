// App.jsx
// -------------------------------------
// Frontend UI for testing and connecting with backend
// -------------------------------------

import { useState, useEffect } from "react";
import { saveProgress, pingServer } from "./api";

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // 🟢 Ping backend once when the app loads
  useEffect(() => {
    pingServer();
  }, []);

  // 📤 Send fake progress to test backend connection
  async function handleTest() {
    setLoading(true);
    const result = await saveProgress(
      "testUser",
      "chapter1",
      50,
      5,
      10,
      120
    );
    setResponse(result);
    setLoading(false);
  }

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        color: "white",
        backgroundColor: "#111",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#00ff99" }}>🚀 LearnVerse</h1>
      <p>
        This page tests your connection between <strong>frontend</strong> and{" "}
        <strong>backend</strong>.
      </p>

      <button
        onClick={handleTest}
        disabled={loading}
        style={{
          background: "#00ff99",
          color: "#111",
          border: "none",
          borderRadius: "8px",
          padding: "0.7rem 1.2rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Sending..." : "Test Backend Connection"}
      </button>

      {response && (
        <pre
          style={{
            textAlign: "left",
            background: "#000",
            color: "#0f0",
            padding: "1rem",
            marginTop: "2rem",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "2rem auto",
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}

      <footer style={{ marginTop: "3rem", fontSize: "0.8rem", color: "#666" }}>
        Made with 💚 by Fluxn07
      </footer>
    </div>
  );
}

export default App;
