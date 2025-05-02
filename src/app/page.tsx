"use client";

import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Call our API route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't understand that.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 AI Chat</h2>
      <div style={{ marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{
          width: "70%",
          padding: "8px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={sendMessage}
        disabled={loading || !input.trim()}
        style={{
          marginLeft: 10,
          padding: "8px",
          backgroundColor: loading || !input.trim() ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading || !input.trim() ? "not-allowed" : "pointer",
        }}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
