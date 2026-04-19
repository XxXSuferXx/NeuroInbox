"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Menu,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}
interface ChatInterfaceProps {
  messages: Message[];
  title: string;
  onSendMessage: (content: string) => void;
  onOpenSidebar?: () => void;
  isGenerating?: boolean;
}
export function ChatInterface({
  messages,
  title,
  onSendMessage,
  onOpenSidebar,
  isGenerating = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "0px";
    element.style.height = `${Math.min(element.scrollHeight, 220)}px`;
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSend = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    onSendMessage(trimmed);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="border-b border-border/70  px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {onOpenSidebar ? (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/80 xl:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            ) : null}
            <div className="min-w-0 ">
              <p className="text-sm text-muted-foreground">Active workspace</p>
              <h2 className="text-xl overflow-hidden font-semibold text-foreground">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar px-4 pb-8 pt-6 sm:px-6">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mx-auto max-w-3xl text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-primary/12 text-primary">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
                  What should NeuroInbox help with today?
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Start with a prompt below, or ask the assistant to summarize
                  your inbox, draft replies, or identify priority threads.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-6 pb-10">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "flex w-full",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="flex max-w-4xl gap-4">
                        <div className="p-5">
                          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-8 text-foreground">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-3xl rounded-sm bg-primary px-3 py-1 text-primary-foreground">
                        <p className="text-xs uppercase text-primary-foreground/75">
                          You
                        </p>
                        <p className="whitespace-pre-wrap text-[15px] leading-8">
                          {message.content}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isGenerating ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex max-w-4xl gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="surface-panel flex items-center gap-2 px-5 py-4">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary/70 [animation-delay:120ms]" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary/45 [animation-delay:240ms]" />
                  </div>
                </motion.div>
              ) : null}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto w-full max-w-5xl">

          <div className="surface-panel p-3">
            <div className="flex items-end gap-3">
              <button
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-muted-foreground hover:text-foreground"
                aria-label="Attach context"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NeuroInbox to summarize, triage, draft, or search..."
                rows={1}
                className="max-h-[220px] min-h-[56px] flex-1 resize-none bg-transparent px-1 py-3 text-[15px] leading-7 text-foreground outline-none placeholder:text-muted-foreground"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
