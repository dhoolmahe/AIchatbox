"use client";

import React, { useState } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("mistralai/Mixtral-8x7B-Instruct-v0.1"); // default model

  const models = [
    { value: "mistralai/Mixtral-8x7B-Instruct-v0.1", label: "Mixtral-8x7B" },
    { value: "meta-llama/Llama-3-8B-Instruct", label: "LLaMA-3" },
    { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo" }, // Optional if you want GPT
  ];

  const handleSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, model }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div>
      <h1>AI Chat</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
      />

      {/* Dropdown to select model */}
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        {models.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Send</button>

      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
