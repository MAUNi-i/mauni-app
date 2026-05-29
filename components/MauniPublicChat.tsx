"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_REPLIES = [
  "What is the Collins Window?",
  "What are the 3 Cs and 3 As?",
  "Explain recovery capital",
  "What is HALTS?",
  "How do I make a referral?",
  "What is lived experience in recovery?",
];

function renderMarkdown(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  function renderInline(str: string): React.ReactNode[] {
    // Bold: **text**
    const boldRegex = /\*\*(.+?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match;
    while ((match = boldRegex.exec(str)) !== null) {
      if (match.index > last) parts.push(str.slice(last, match.index));
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      last = match.index + match[0].length;
    }
    if (last < str.length) parts.push(str.slice(last));

    // Linkify within inline parts
    return parts.flatMap((part, pi) => {
      if (typeof part !== "string") return [part];
      const linkParts = part.split(urlRegex);
      return linkParts.map((lp, li) =>
        urlRegex.test(lp) ? (
          <a key={`${pi}-${li}`} href={lp} target="_blank" rel="noopener noreferrer"
            style={{ color: "#E8632A", textDecoration: "underline", wordBreak: "break-all" }}>
            {lp}
          </a>
        ) : lp
      );
    });
  }

  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      elements.push(<br key={`br-${i}`} />);
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(<li key={i} style={{ marginBottom: 2 }}>{renderInline(lines[i].replace(/^\d+\.\s/, ""))}</li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} style={{ paddingLeft: 20, margin: "6px 0" }}>{listItems}</ol>);
      continue;
    } else if (/^[-•]\s/.test(line)) {
      // Bullet list
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^[-•]\s/.test(lines[i])) {
        listItems.push(<li key={i} style={{ marginBottom: 2 }}>{renderInline(lines[i].replace(/^[-•]\s/, ""))}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} style={{ paddingLeft: 20, margin: "6px 0" }}>{listItems}</ul>);
      continue;
    } else {
      elements.push(<p key={i} style={{ margin: "4px 0", lineHeight: 1.6 }}>{renderInline(line)}</p>);
    }
    i++;
  }

  return <>{elements}</>;
}

// Keep for backward compat
function linkify(text: string) {
  return renderMarkdown(text);
}

export default function MauniPublicChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to MAUNi. Ask me about the MAUNi recovery methodology, referrals, coaching pathways, or our programmes." },
  ]);
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const userMessage = text || input;
    if (!userMessage.trim() || loading) return;
    setMessages((c) => [...c, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/assistant-widget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, assistant: "recovery" }),
      });
      const data = await response.json();
      setMessages((c) => [...c, { role: "assistant", content: response.ok ? data.reply : (data.error || "Something went wrong.") }]);
    } catch {
      setMessages((c) => [...c, { role: "assistant", content: "I could not connect right now. Please try again or contact david@uact.co.uk directly." }]);
    } finally {
      setLoading(false);
    }
  }

  const styles: Record<string, React.CSSProperties> = {
    card: { maxWidth: 680, background: "white", border: "0.5px solid #E5E7EB", borderRadius: 12, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", fontFamily: "'Nunito', sans-serif" },
    disclaimer: { fontSize: 12, lineHeight: 1.7, color: "#6B7280", background: "#F8FAFB", border: "0.5px solid #E5E7EB", borderRadius: 8, padding: "10px 14px", marginBottom: 16 },
    quickPrompts: { display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 16 },
    qrBtn: { fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, padding: "6px 12px", border: "0.5px solid #E5E7EB", borderRadius: 20, background: "white", color: "#1A1A2E", cursor: "pointer" },
    chat: { minHeight: 120, maxHeight: 280, overflowY: "auto" as const, marginBottom: 12, display: "flex", flexDirection: "column" as const, gap: 10 },
    msgWrapper: { display: "flex", gap: 10, alignItems: "flex-start" },
    msgWrapperUser: { display: "flex", flexDirection: "row-reverse" as const, gap: 10, alignItems: "flex-start" },
    avatar: { width: 30, height: 30, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center" },
    avatarUser: { width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "#E8632A", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700 },
    bubbleAssistant: { background: "#F8FAFB", border: "1px solid #E5E7EB", borderRadius: "4px 14px 14px 14px", padding: "10px 14px", fontSize: 13, lineHeight: 1.7, color: "#1A1A2E", maxWidth: "82%" },
    bubbleUser: { background: "#1A1A2E", border: "1px solid #1A1A2E", borderRadius: "14px 4px 14px 14px", padding: "10px 14px", fontSize: 13, lineHeight: 1.7, color: "white", maxWidth: "82%" },
    textarea: { width: "100%", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#1A1A2E", border: "0.5px solid #E5E7EB", borderRadius: 8, padding: "10px 12px", resize: "none" as const, outline: "none", background: "#F8FAFB", lineHeight: 1.5, minHeight: 60, marginBottom: 10 },
    sendRow: { display: "flex", flexWrap: "wrap" as const, gap: 8, alignItems: "center" },
    sendBtn: { fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, padding: "8px 14px", border: "0.5px solid #E8632A", borderRadius: 6, background: "#E8632A", color: "white", cursor: "pointer" },
    speakBtn: { fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, padding: "8px 14px", border: "0.5px solid #E5E7EB", borderRadius: 6, background: "white", color: "#1A1A2E", cursor: "pointer" },
  };

  function speakLast() {
    const last = [...messages].reverse().find(m => m.role === "assistant");
    if (!last || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(last.content);
    u.lang = "en-GB";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  return (
    <div style={styles.card}>
      <div style={styles.disclaimer}>
        Please do not enter names, addresses, phone numbers, medical records, or identifiable personal information. This assistant supports learning and reflection. It does not provide medical, legal, clinical, safeguarding, or emergency advice.
      </div>

      <div style={styles.quickPrompts}>
        {QUICK_REPLIES.map((q) => (
          <button key={q} style={styles.qrBtn} onClick={() => sendMessage(q)} disabled={loading}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "#E8632A"; (e.target as HTMLButtonElement).style.color = "#E8632A"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.target as HTMLButtonElement).style.color = "#1A1A2E"; }}>
            {q}
          </button>
        ))}
      </div>

      <div style={styles.chat} ref={msgsRef}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === "user" ? styles.msgWrapperUser : styles.msgWrapper}>
            {msg.role === "assistant" ? (
              <div style={styles.avatar}>
                <img src="https://mauni.app/wp-content/uploads/2023/03/cropped-m-270x270.jpg" alt="MAUNi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ) : (
              <div style={styles.avatarUser}>You</div>
            )}
            <div style={msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}>
              {msg.role === "assistant" ? (
                <><span style={{ color: "#E8632A", fontWeight: 700 }}>MAUNi Recovery Coach: </span>{renderMarkdown(msg.content)}</>
              ) : msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={styles.msgWrapper}>
            <div style={styles.avatar}>
              <img src="https://mauni.app/wp-content/uploads/2023/03/cropped-m-270x270.jpg" alt="MAUNi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={styles.bubbleAssistant}>
              <span style={{ color: "#E8632A", fontWeight: 700 }}>MAUNi Recovery Coach: </span>Thinking...
            </div>
          </div>
        )}
      </div>

      <textarea
        style={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        placeholder="Ask the MAUNi Recovery Coach..."
        rows={2}
      />

      <div style={styles.sendRow}>
        <button style={styles.sendBtn} onClick={() => sendMessage()} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        <button style={styles.speakBtn} onClick={speakLast}>
          Speak
        </button>
      </div>
    </div>
  );
}
