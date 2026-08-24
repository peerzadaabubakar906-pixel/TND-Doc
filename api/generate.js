// Vercel Serverless Function
// Ye function browser se transcript + instructions leta hai,
// Google Gemini ko server-side call karta hai (API key kabhi bhi browser mein nahi jati),
// aur title/description JSON wapas bhejta hai.
// Gemini free hai, koi credit card nahi chahiye: https://aistudio.google.com/apikey

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { instructions, transcript } = req.body || {};

  if (!transcript || !instructions) {
    return res.status(400).json({ error: "instructions aur transcript dono required hain" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server par GEMINI_API_KEY set nahi hai" });
  }

  try {
    const systemPrompt = `${instructions}\n\nRespond ONLY with valid JSON in this exact shape, no markdown fences, no preamble, no extra text: {"title": "...", "description": "..."}`;

    const model = "gemini-3.6-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nTranscript:\n\n${transcript}` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(502).json({ error: "Gemini request failed", details: errText });
    }

    const data = await geminiRes.json();
    const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(textOut);

    return res.status(200).json({
      title: parsed.title || "",
      description: parsed.description || "",
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: String(err) });
  }
}
