import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }
  const { prompt } = request.body;
  if (!prompt) {
    return response.status(400).json({ error: "Prompt is required" });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response
      .status(500)
      .json({ error: "Server API Key not configured" });
  }
  const genAI = new GoogleGenAI({ apiKey: apiKey });

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        systemInstruction: `
                            You are the official AI assistant for "Game Hub", a website for discovering video games.
                            Your specific rules:
                              1. You ONLY answer questions about video games, gaming hardware, game development, and gaming culture.
                              2. If a user asks about anything else (like math, politics, cooking, or coding unrelated to games), you must POLITELY REFUSE.
                                - Example refusal: "I'm just a gaming bot! I can't help with that, but I can tell you about the latest RPGs."
                              3. Be helpful, enthusiastic, and use emojis.
`,
      },
    });
    const text = result.text;
    response.status(200).json({ answer: text });
  } catch (error) {
    console.error("Gemini error", error);
    response.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to fetch AI response",
    });
  }
}
