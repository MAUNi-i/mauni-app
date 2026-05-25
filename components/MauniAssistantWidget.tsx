"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MauniAssistantWidget() {
  const [open, setOpen] = useState(false);

  const [assistant, setAssistant] = useState<
    "recovery" | "support"
  >("recovery");

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m MAUNi. How can I support you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/assistant-widget",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            assistant,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              data.error ||
              "Something went wrong.",
          },
        ]);

        return;
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not connect right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-2xl">
          <div className="bg-[#f05a28] px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">
                  MAUNi Assistant
                </p>

                <p className="text-xs text-white/80">
                  Recovery coaching support
                </p>
              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-full bg-white/20 px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="border-b border-[#eadfd5] bg-[#fffaf5] p-3">
            <select
              value={assistant}
              onChange={(e) =>
                setAssistant(
                  e.target.value as
                    | "recovery"
                    | "support"
                )
              }
              className="w-full rounded-xl border border-[#eadfd5] bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="recovery">
                Recovery Assistant
              </option>

              <option value="support">
                Platform Support Assistant
              </option>
            </select>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto bg-[#f8f5ef] p-4">
            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={
                    message.role ===
                    "user"
                      ? "ml-auto max-w-[85%] rounded-2xl bg-[#f05a28] p-3 text-sm leading-6 text-white"
                      : "mr-auto max-w-[85%] rounded-2xl border border-[#eadfd5] bg-white p-3 text-sm leading-6 text-slate-700"
                  }
                >
                  {message.content}
                </div>
              )
            )}

            {loading && (
              <div className="mr-auto max-w-[85%] rounded-2xl border border-[#eadfd5] bg-white p-3 text-sm text-slate-500">
                MAUNi is thinking...
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t border-[#eadfd5] bg-white p-3">
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  sendMessage();
                }
              }}
              placeholder="Ask MAUNi..."
              className="flex-1 rounded-xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#f05a28]"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-xl bg-[#f05a28] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#f05a28] px-6 py-4 font-bold text-white shadow-2xl hover:bg-[#d94e20]"
      >
        MAUNi
      </button>
    </>
  );
}