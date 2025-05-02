import { NextRequest, NextResponse } from "next/server";

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const BASE_URL = "https://api.together.xyz/v1/chat/completions";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // ✅ free and good
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No response";

  return NextResponse.json({ reply });
}
