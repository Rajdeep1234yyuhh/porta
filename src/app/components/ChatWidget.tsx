"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm Rajdeep's assistant. I can tell you about his skills, services, or help you get in touch. What would you like to know?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* sync dark mode with root class */
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const saved = localStorage.getItem("theme");
    if (saved) setIsDark(saved === "dark");

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, {
        role: "assistant",
        content: data.content ?? data.error ?? "Something went wrong. Please try again.",
      }]);
    } catch {
      setMessages([...next, {
        role: "assistant",
        content: "Network error. Please try again or email kotoky10@gmail.com directly.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        } ${isDark ? "bg-[#1c1c1e] border-white/10" : "bg-white border-slate-200"}`}
        style={{ height: "460px" }}
      >
        {/* header */}
        <div className={`flex items-center gap-3 px-4 py-3 shrink-0 border-b ${isDark ? "border-white/8 bg-[#141414]" : "border-slate-100 bg-slate-50"}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold leading-none ${isDark ? "text-white" : "text-slate-900"}`}>Rajdeep&apos;s Assistant</p>
            <p className={`text-[10px] mt-0.5 ${isDark ? "text-green-400" : "text-green-600"}`}>● Online</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-slate-200 text-slate-500"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] text-xs leading-relaxed px-3 py-2 rounded-2xl ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-br-sm"
                    : isDark
                    ? "bg-white/8 text-gray-200 rounded-bl-sm"
                    : "bg-slate-100 text-slate-700 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className={`px-3 py-2.5 rounded-2xl rounded-bl-sm ${isDark ? "bg-white/8" : "bg-slate-100"}`}>
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-slate-400"}`}
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className={`shrink-0 flex items-center gap-2 px-3 py-3 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask me anything…"
            className={`flex-1 text-xs rounded-xl px-3 py-2 outline-none border transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50"
                : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-400"
            }`}
            style={{ fontSize: "16px" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* bubble */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Open chat"
      >
        <div className={`transition-all duration-200 ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"}`}>
          {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        </div>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        )}
      </button>
    </>
  );
}
