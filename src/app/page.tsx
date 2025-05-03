"use client";

import React, { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("mistralai/Mixtral-8x7B-Instruct-v0.1");

  const models = [
    { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral-8x7B" },
    { value: "meta-llama/Llama-3-8B-Instruct", label: "LLaMA 3" },
    { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ];

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, model }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 space-y-6 border border-blue-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-700">
          💬 AI Chat
        </h1>

        {/* Dropdown */}
        <div className="flex flex-col items-center">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Select Model
          </label>
          <div className="relative w-full max-w-sm">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              {models.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▼
            </div>
          </div>
        </div>

        {/* Floating Label Textarea */}
        <div className="relative w-full">
          <label
            htmlFor="message"
            className="absolute left-4 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            Type your message...
          </label>
          <br></br>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder=" "
            className="peer w-full rounded-lg border border-gray-300 p-4 pt-5 text-sm text-gray-800 placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end space-x-3 mt-2">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow">
            🚀 Send
          </button>
          <button
            onClick={() => setMessage("")}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            ❌ Clear
          </button>
        </div>

        {/* Response Display */}
        {response && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-800 whitespace-pre-line shadow-inner">
            <strong className="block mb-2 text-blue-600">AI:</strong>
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
