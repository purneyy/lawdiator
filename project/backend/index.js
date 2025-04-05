import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import translate from "google-translate-api-x";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing in .env file");
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post("/generate", async (req, res) => {
  try {
    let { scene, language } = req.body;
    if (!scene) {
      return res.status(400).json({ error: "❌ Scene input is required" });
    }

    console.log(`📩 Incoming scene:\n${scene}\n📢 Language: ${language}`);

    // Step 1: Translate to English if scene is in Tamil
    if (language === "ta") {
      try {
        const translated = await translate(scene, { from: "ta", to: "en" });
        scene = translated.text;
        console.log(`🌐 Translated to English:\n${scene}`);
      } catch (e) {
        return res.status(500).json({ error: "❌ Translation to English failed." });
      }
    }

    // Step 2: Build strict prompt
    const prompt = `
You are a legal expert who rewrites fictional, mythological, or historical scenes using real Indian laws and legal consequences.

Given a scene from a movie, epic, or historical moment, generate a realistic re-imagining of what would happen if it took place in modern-day India under Indian laws.

⚠️IMPORTANT: Return ONLY valid JSON without markdown, backticks, or explanation. Format:

{
  "title": "<Short title>",
  "rewrittenScene": "<Rewritten legal version>",
  "applicableLaws": "<Indian laws that apply (IPC, CrPC, IT Act, etc.)>",
  "realLifeOutcome": "<What would happen legally>"
}

Scene: "${scene}"
    `.trim();

    // Step 3: Call Gemini
    const geminiRes = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    let rawText = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Step 4: Clean response
    console.log("🧪 Raw Gemini Response:\n", rawText);

    rawText = rawText.replace(/```json|```/g, "").trim();
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    let parsedOutput = {
      title: "Untitled",
      rewrittenScene: rawText,
      applicableLaws: "Not specified",
      realLifeOutcome: "Not specified"
    };

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        parsedOutput = {
          title: parsed.title || "Untitled",
          rewrittenScene: parsed.rewrittenScene || rawText,
          applicableLaws: parsed.applicableLaws || "Not specified",
          realLifeOutcome: parsed.realLifeOutcome || "Not specified"
        };
      } catch (e) {
        console.error("❌ JSON parsing failed:", e.message);
      }
    } else {
      console.warn("⚠️ No JSON detected in Gemini response.");
    }

    // Step 5: Translate output to Tamil if requested
    let result = { ...parsedOutput };

    if (language === "ta") {
      try {
        const [titleTa, sceneTa, lawsTa, outcomeTa] = await Promise.all([
          translate(result.title, { from: "en", to: "ta" }),
          translate(result.rewrittenScene, { from: "en", to: "ta" }),
          translate(result.applicableLaws, { from: "en", to: "ta" }),
          translate(result.realLifeOutcome, { from: "en", to: "ta" }),
        ]);
        result = {
          title: titleTa.text,
          rewrittenScene: sceneTa.text,
          applicableLaws: lawsTa.text,
          realLifeOutcome: outcomeTa.text,
        };
      } catch (e) {
        return res.status(500).json({ error: "❌ Output translation to Tamil failed." });
      }
    }

    res.json(result);

  } catch (err) {
    console.error("❌ Unexpected error:", err.message || err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 LegalGPT Backend running at http://localhost:${PORT}`);
});