import { NextRequest, NextResponse } from "next/server";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No response";

  return NextResponse.json({ reply });
}
