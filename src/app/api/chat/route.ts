import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY; // assuming you're using same env var
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://maheaichatbox.vercel.app/", // 👈 required for OpenRouter
    },
    body: JSON.stringify({
      model: "openrouter/openai/gpt-3.5-turbo", // 👈 use supported model
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No response";

  return NextResponse.json({ reply });
}
