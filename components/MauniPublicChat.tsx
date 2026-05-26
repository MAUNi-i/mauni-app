"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const PROMPTS = [
  "What is recovery coaching?",
  "How does the CPRC programme work?",
  "What is recovery capital?",
  "Tell me about the Ubuntu methodology",
];

export default function MauniPublicChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm the MAUNi Recovery Coach. I'm available 24/7 to answer questions about recovery, coaching pathways, and our programmes. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const userMessage = text || input;
    if (!userMessage.trim()) return;
    setMessages((current) => [...current, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/assistant-widget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, assistant: "recovery" }),
      });
      const data = await response.json();
      setMessages((current) => [...current, {
        role: "assistant",
        content: response.ok ? data.reply : (data.error || "Something went wrong."),
      }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        content: "I could not connect right now. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#eadfd5] bg-white shadow-sm overflow-hidden">
      <div className="bg-[#f05a28] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-bold text-lg">M</div>
          <div>
            <p className="font-bold text-white">MAUNi Recovery Coach</p>
            <p className="text-xs text-white/80">Available 24/7 · Trained in MAUNi methodology</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs text-white/80">Online</span>
          </div>
        </div>
      </div>
      <div className="border-b border-[#eadfd5] bg-[#fff7f0] px-5 py-3">
        <p className="text-xs text-slate-500 leading-5">This assistant supports learning and reflection. It does not provide medical, legal, clinical, safeguarding, or emergency advice. Do not enter personal or identifiable information.</p>
      </div>
      <div className="h-[380px] overflow-y-auto bg-[#f8f5ef] p-4 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? "ml-auto max-w-[85%] rounded-2xl bg-[#f05a28] p-3 text-sm leading-6 text-white" : "mr-auto max-w-[85%] rounded-2xl border border-[#eadfd5] bg-white p-3 text-sm leading-6 text-slate-700"}>
            {message.role === "assistant" && (
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#f05a28] mb-1">MAUNi Recovery Coach</p>
            )}
            {message.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto max-w-[85%] rounded-2xl border border-[#eadfd5] bg-white p-3 text-sm text-slate-500">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#f05a28] mb-1">MAUNi Recovery Coach</p>
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-[#eadfd5] bg-[#fffaf5] px-4 py-3 flex gap-2 flex-wrap">
        {PROMPTS.map((prompt) => (
          <button key={prompt} onClick={() => sendMessage(prompt)} disabled={loading} className="rounded-full border border-[#eadfd5] bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-[#f05a28] hover:text-[#f05a28] transition-colors disabled:opacity-50">
            {prompt}
          </button>
        ))}
      </div>
      <div className="flex gap-2 border-t border-[#eadfd5] bg-white p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} placeholder="Ask the MAUNi Recovery Coach..." className="flex-1 rounded-xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#f05a28]" />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="rounded-xl bg-[#f05a28] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 hover:bg-[#d94e20]">Send</button>
      </div>
    </div>
  );
}
