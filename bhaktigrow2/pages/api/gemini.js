// pages/api/gemini.js
// Runs on SERVER only — your API key is never exposed to the browser

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { system, user } = req.body;
  if (!user) return res.status(400).json({ error: "Missing prompt" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return res.status(500).json({
      error: "Gemini API key not configured. Please add GEMINI_API_KEY to your Vercel environment variables.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // gemini-1.5-flash — FREE tier: 15 requests/min, 1500 requests/day
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: system || "You are a helpful YouTube growth expert for Indian devotional channels.",
    });

    const result = await model.generateContent(user);
    const text = result.response.text();
    return res.status(200).json({ text });
  } catch (e) {
    const msg = e.message || "Gemini API error";
    // Friendly messages for common errors
    if (msg.includes("API_KEY_INVALID")) return res.status(401).json({ error: "Invalid API key. Check your GEMINI_API_KEY in Vercel settings." });
    if (msg.includes("QUOTA")) return res.status(429).json({ error: "Daily limit reached. Free tier allows 1500 requests/day. Try again tomorrow." });
    return res.status(500).json({ error: msg });
  }
}
