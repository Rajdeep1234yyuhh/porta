"use client";

import { CONTACT } from "../data/site";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Phone, Mail, ChevronRight } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface Choice {
  label: string;
  navigate?: string;
  tab?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  choices?: Choice[];
  choiceUsed?: boolean;
}

const ACTION_CHOICES: Record<string, Choice[]> = {
  ask_projects: [
    { label: "Tech / AI Projects", navigate: "projects", tab: "tech" },
    { label: "Shopify Stores",      navigate: "projects", tab: "shopify" },
    { label: "No thanks" },
  ],
  show_tech: [
    { label: "View Tech Projects",   navigate: "projects", tab: "tech" },
  ],
  show_shopify: [
    { label: "View Shopify Stores",  navigate: "projects", tab: "shopify" },
  ],
  show_services: [
    { label: "See Services", navigate: "services" },
  ],
  show_contact: [
    { label: "Go to Contact", navigate: "contact" },
  ],
};

// The API only reads this many recent messages, so there is no point sending more.
const MAX_HISTORY = 12;
const MAX_INPUT_CHARS = 1000;

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm Rajdeep's assistant. I can tell you about his skills, services, or help you get in touch. What would you like to know?",
};

export default function ChatWidget() {
  const { playClick } = useSound();
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* sync dark mode */
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

  const navigateTo = (navigate?: string, tab?: string) => {
    if (!navigate) return;
    if (tab) {
      window.dispatchEvent(new CustomEvent("set-project-tab", { detail: tab }));
    }
    // portfolio uses a slide system — trigger HomeClient's goTo via event
    window.dispatchEvent(new CustomEvent("navigate-to-section", { detail: navigate }));
  };

  const handleChoice = (choice: Choice, msgIdx: number) => {
    // mark choices as consumed so buttons disappear
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, choiceUsed: true } : m))
    );
    // echo user selection
    setMessages((prev) => [...prev, { role: "user", content: choice.label }]);
    // navigate if applicable
    if (choice.navigate) {
      navigateTo(choice.navigate, choice.tab);
      setOpen(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    // strip choices from history before sending to API (keep only role+content)
    const history = [...messages, userMsg]
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const content: string = data.content ?? data.error ?? "Something went wrong. Please try again.";
      const action: string | null = data.action ?? null;
      const choices = action && Object.hasOwn(ACTION_CHOICES, action) ? ACTION_CHOICES[action] : undefined;
      setMessages((prev) => [...prev, { role: "assistant", content, choices }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `Network error. Please try again or email ${CONTACT.email} directly.`,
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
        className={`fixed bottom-24 left-4 right-4 sm:left-auto sm:w-96 sm:right-6 z-50 flex flex-col rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        } ${isDark ? "bg-[#1c1c1e] border-white/10" : "bg-white border-slate-200"}`}
        style={{ height: "480px", maxHeight: "calc(100dvh - 6.5rem)" }}
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
            onClick={() => { playClick(); setOpen(false); }}
            aria-label="Close chat"
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-slate-200 text-slate-500"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
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

              {/* choice buttons — only for assistant messages with unused choices */}
              {m.role === "assistant" && m.choices && !m.choiceUsed && (
                <div className="flex flex-wrap gap-1.5 mt-1.5 max-w-[90%]">
                  {m.choices.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => { playClick(); handleChoice(c, i); }}
                      className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border transition-all duration-150 hover:scale-[1.03] active:scale-95 ${
                        c.navigate
                          ? isDark
                            ? "bg-violet-500/15 border-violet-500/30 text-violet-300 hover:bg-violet-500/25"
                            : "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100"
                          : isDark
                          ? "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {c.label}
                      {c.navigate && <ChevronRight className="w-3 h-3 opacity-60" />}
                    </button>
                  ))}
                </div>
              )}
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

        {/* quick-contact buttons */}
        <div className={`shrink-0 flex items-center gap-2 px-3 py-2 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}>
          <a
            href={CONTACT.telHref}
            onClick={playClick}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-95 border ${isDark ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`}
          >
            <Phone className="w-3 h-3" /> Call
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-95 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href={CONTACT.mailtoHref}
            onClick={playClick}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-95 border ${isDark ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`}
          >
            <Mail className="w-3 h-3" /> Email
          </a>
        </div>

        {/* input */}
        <div className={`shrink-0 flex items-center gap-2 px-3 py-3 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            maxLength={MAX_INPUT_CHARS}
            aria-label="Message Rajdeep's assistant"
            placeholder="Ask me anything…"
            className={`flex-1 text-xs rounded-xl px-3 py-2 outline-none border transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50"
                : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-400"
            }`}
            style={{ fontSize: "16px" }}
          />
          <button
            onClick={() => { playClick(); send(); }}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* bubble */}
      <button
        onClick={() => { playClick(); setOpen((p) => !p); }}
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
