"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  MessageSquarePlus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useAppSelector } from "@/app/hooks/redux-hook";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  currentChatId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  onDeleteChat: (chatId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ChatSidebar({
  currentChatId,
  onChatSelect,
  onNewChat,
  chatHistory,
  onDeleteChat,
  isCollapsed = false,
  onToggleCollapse,
}: ChatSidebarProps) {
  const { name, emails } = useAppSelector((state) => state.UserAuth);
  const displayName = name || "Workspace User";
  const emailCount = emails.length || 1;

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border/80 bg-sidebar/88 px-3 py-4 backdrop-blur-xl transition-all duration-300",
        isCollapsed ? "w-[96px]" : "w-[320px]",
      )}
    >
      <div className="flex items-center gap-3 px-2 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-accent text-sidebar-foreground shadow-sm">
          <Inbox className="h-5 w-5" />
        </div>
        {!isCollapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              NeuroInbox
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              Focused chat operations
            </p>
          </div>
        ) : null}
        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-sidebar-border/70 bg-card/60 text-sidebar-foreground lg:inline-flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className={cn(
          "flex items-center gap-3 rounded-[22px] border border-sidebar-border/70 bg-sidebar-primary px-4 py-3 text-left text-sidebar-primary-foreground shadow-sm",
          isCollapsed ? "justify-center px-0" : undefined,
        )}
      >
        <MessageSquarePlus className="h-5 w-5 shrink-0" />
        {!isCollapsed ? (
          <span className="text-sm font-semibold">New workspace chat</span>
        ) : null}
      </button>

      {!isCollapsed ? (
        <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-sidebar-border/70 bg-card/60 px-4 py-3 text-sm text-sidebar-foreground/70">
          <Search className="h-4 w-4" />
          <span>Search threads</span>
          <span className="ml-auto rounded-full border border-sidebar-border/70 px-2 py-0.5 font-mono text-[11px]">
            /
          </span>
        </div>
      ) : null}

      <div className="mt-6 flex-1 overflow-y-auto scrollbar pr-1">
        {!isCollapsed ? (
          <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/45">
            Recent chats
          </div>
        ) : null}

        <div className="space-y-2">
          {chatHistory.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
              onClick={() => onChatSelect(chat.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onChatSelect(chat.id);
                }
              }}
              role="button"
              tabIndex={0}
              title={isCollapsed ? chat.title : undefined}
              className={cn(
                "group w-full rounded-[22px] border px-3 py-3 text-left transition-all",
                currentChatId === chat.id
                  ? "border-primary/25 bg-primary/10 text-sidebar-foreground shadow-sm"
                  : "border-transparent bg-transparent text-sidebar-foreground/72 hover:border-sidebar-border/70 hover:bg-sidebar-accent/70",
                isCollapsed ? "flex justify-center px-0" : undefined,
              )}
            >
              {isCollapsed ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-card/70 font-semibold">
                  {chat.title.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-card/70 font-semibold text-sidebar-foreground">
                    {chat.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {chat.title}
                        </p>
                        <p className="truncate text-xs text-sidebar-foreground/55">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="rounded-xl p-2 text-sidebar-foreground/45 opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                        aria-label={`Delete ${chat.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-sidebar-foreground/45">
                      {chat.timestamp}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {!isCollapsed ? (
          <div className="rounded-[24px] border border-sidebar-border/70 bg-card/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-sidebar-foreground">
                  Inbox sync protected
                </p>
                <p className="text-xs text-sidebar-foreground/55">
                  {emailCount} Google account{emailCount > 1 ? "s" : ""}{" "}
                  connected
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "rounded-[24px] border border-sidebar-border/70 bg-card/70 p-3",
            isCollapsed ? "flex justify-center" : undefined,
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed ? "justify-center" : undefined,
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              {displayName.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">
                  {displayName}
                </p>
                <p className="text-xs text-sidebar-foreground/55">
                  Operator workspace
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
