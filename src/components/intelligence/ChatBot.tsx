/**
 * ChatBot.tsx — Real NLP-style chatbot with visitor intelligence
 */
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2, ChevronDown } from "lucide-react";
import { getGeoGreeting, type VisitorData } from "@/lib/visitor";
import { getDocumentNudge } from "@/lib/intelligence";
import { VisionPartFinder } from "./VisionPartFinder";

interface Message {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What products do you offer?",
  "How can I get a quote?",
  "Tell me about robotic arms",
  "What is your delivery time?",
  "Request a demo",
];

interface ChatBotProps {
  visitorData: VisitorData | null;
}

export function ChatBot({ visitorData }: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial bot greeting (+ #10 Document Contextual Intelligence nudge)
  useEffect(() => {
    if (messages.length === 0) {
      const timeGreeting = getGeoGreeting();
      const nudge = visitorData ? getDocumentNudge(visitorData.documentContext) : null;
      const base = visitorData?.isReturning
        ? `${timeGreeting}! Welcome back for visit #${visitorData.visitCount}. How can I help you today?`
        : `${timeGreeting}! I'm your Indus Robotics assistant. Ask me about our products, pricing, or technical specs! Try a competitor part no. (SGM7S-04) or "high torque small space".`;
      setMessages([{ role: "bot", text: nudge ? `${base}\n\n${nudge}` : base, timestamp: new Date() }]);
    }
  }, [visitorData, messages.length]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, visitorCtx: visitorData }),
      });
      const data = await res.json();
      const botMsg: Message = { role: "bot", text: data.reply || "I'm having trouble right now. Please try again.", timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Connection error. Please try again.", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        id="chatbot-toggle"
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-4 z-50 flex size-14 items-center justify-center border border-signal bg-surface-dark shadow-[0_0_20px_oklch(0.65_0.22_250_/_0.4)] transition-all hover:scale-110 hover:shadow-[0_0_30px_oklch(0.65_0.22_250_/_0.5)] md:right-6"
      >
        {open ? (
          <ChevronDown size={22} className="text-signal" />
        ) : (
          <>
            <Bot size={22} className="text-signal" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-signal text-[10px] font-bold text-signal-foreground">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-80 flex-col border border-signal/40 bg-surface-dark shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 md:right-6 md:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center border border-signal/30 bg-signal/10 text-signal">
                <Bot size={16} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Indus Assistant
                </p>
                <p className="text-[9px] text-signal">● Online — Replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex h-72 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-xs leading-5 ${
                    msg.role === "user"
                      ? "border border-signal/30 bg-signal/10 text-foreground"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {msg.text.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="border border-border bg-card px-3 py-2">
                  <Loader2 size={14} className="animate-spin text-signal" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="border-t border-border px-4 py-2">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="border border-signal/20 bg-signal/5 px-2 py-1 text-[10px] text-signal transition-colors hover:border-signal/50 hover:bg-signal/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <VisionPartFinder compact />
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex border-t border-border">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 bg-card px-3 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-signal/50"
              aria-label="Chat message input"
              id="chatbot-input"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex w-12 items-center justify-center bg-signal text-signal-foreground transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
