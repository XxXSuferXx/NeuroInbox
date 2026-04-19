"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/custom/ChatSidebar";
import { ChatInterface } from "@/components/custom/ChatInterface";
import { cn } from "@/lib/utils";

type Role = "assistant" | "user";

type Message = {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
};

type ChatThread = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
};

const initialChats: ChatThread[] = [
  {
    id: "priority-brief",
    title: "Priority brief",
    lastMessage: "Start with urgent senders and pending approvals.",
    timestamp: "2m ago",
  },
  {
    id: "draft-replies",
    title: "Draft replies",
    lastMessage: "Prepare calm responses for customer escalations.",
    timestamp: "48m ago",
  },
  {
    id: "exec-summary",
    title: "Executive summary",
    lastMessage: "Condense the day into a one-minute readout.",
    timestamp: "Yesterday",
  },
];

const initialMessages: Record<string, Message[]> = {
  "priority-brief": [
   
  ],
  "draft-replies": [
  ],
  "exec-summary": [
  
  ],
};

function buildAssistantReply(content: string) {
  const prompt = content.toLowerCase();

  if (prompt.includes("summary")) {
    return "Inbox summary: three conversations need immediate replies, two can be delegated, and the rest can be grouped into a single afternoon follow-up batch.";
  }

  if (prompt.includes("draft")) {
    return "I drafted responses that acknowledge urgency, confirm next steps, and keep the tone calm and executive-friendly. I can tighten them further if you want a shorter version.";
  }

  if (prompt.includes("action")) {
    return "Action list: follow up with the renewal lead, approve the finance reply, delegate the support escalation, and archive the resolved vendor thread.";
  }

  return "I can help triage that. I’d start by identifying urgency, sender priority, and whether the next step is a reply, a follow-up, or a delegation.";
}

function makeThreadTitle(content: string) {
  const cleaned = content.trim().replace(/\s+/g, " ");

  if (cleaned.length <= 28) {
    return cleaned;
  }

  return `${cleaned.slice(0, 28)}...`;
}

export default function DashboardPage() {
  const [currentChatId, setCurrentChatId] = useState(initialChats[0].id);
  const [chatHistory, setChatHistory] = useState(initialChats);
  const [messagesByChat, setMessagesByChat] =
    useState<Record<string, Message[]>>(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentChat =
    chatHistory.find((chat) => chat.id === currentChatId) ?? chatHistory[0];
  const messages = messagesByChat[currentChatId] ?? [];

  const closeMobileSidebar = () => setIsSidebarOpen(false);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newThread: ChatThread = {
      id: newChatId,
      title: "New workspace chat",
      lastMessage: "Start by asking NeuroInbox what matters most.",
      timestamp: "Just now",
    };

    setChatHistory((previous) => [newThread, ...previous]);
    setMessagesByChat((previous) => ({ ...previous, [newChatId]: [] }));
    setCurrentChatId(newChatId);
    closeMobileSidebar();
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    closeMobileSidebar();
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory((previous) => {
      const nextChats = previous.filter((chat) => chat.id !== chatId);

      if (chatId === currentChatId) {
        setCurrentChatId(nextChats[0]?.id ?? "");
      }

      return nextChats;
    });

    setMessagesByChat((previous) => {
      const nextMessages = { ...previous };
      delete nextMessages[chatId];
      return nextMessages;
    });
  };

  const handleSendMessage = (content: string) => {
    const activeChatId = currentChatId || `chat-${Date.now()}`;
    const chatExists = chatHistory.some((chat) => chat.id === activeChatId);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: "Just now",
    };

    if (!chatExists) {
      setChatHistory((previous) => [
        {
          id: activeChatId,
          title: makeThreadTitle(content),
          lastMessage: content,
          timestamp: "Just now",
        },
        ...previous,
      ]);
      setCurrentChatId(activeChatId);
    }

    setMessagesByChat((previous) => ({
      ...previous,
      [activeChatId]: [...(previous[activeChatId] ?? []), userMessage],
    }));

    if (chatExists) {
      setChatHistory((previous) =>
        previous.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                title:
                  chat.title === "New workspace chat"
                    ? makeThreadTitle(content)
                    : chat.title,
                lastMessage: content,
                timestamp: "Just now",
              }
            : chat,
        ),
      );
    }

    setIsGenerating(true);

    window.setTimeout(() => {
      const assistantReply = buildAssistantReply(content);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: assistantReply,
        timestamp: "Just now",
      };

      setMessagesByChat((previous) => ({
        ...previous,
        [activeChatId]: [...(previous[activeChatId] ?? []), assistantMessage],
      }));

      setChatHistory((previous) =>
        previous.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                lastMessage: assistantReply,
                timestamp: "Just now",
              }
            : chat,
        ),
      );

      setIsGenerating(false);
    }, 950);
  };

  return (
    <div className="dashboard-grid relative overflow-hidden bg-background">
      <div className="ambient-orb ambient-orb--teal left-[-6rem] top-[10rem] h-72 w-72" />
      <div className="ambient-orb ambient-orb--blue right-[-4rem] top-[18rem] h-64 w-64" />

      <div className="relative flex min-h-screen">
        {isSidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/45 xl:hidden"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar overlay"
          />
        ) : null}

        <aside
          className={cn(
            "fixed bottom-4 left-4 top-[112px] z-40 transition-transform duration-300 xl:static xl:bottom-auto xl:left-auto xl:top-auto xl:z-auto xl:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]",
          )}
        >
          <div className="surface-panel h-full overflow-hidden">
            <ChatSidebar
              currentChatId={currentChatId}
              onChatSelect={handleChatSelect}
              onNewChat={handleNewChat}
              chatHistory={chatHistory}
              onDeleteChat={handleDeleteChat}
              isCollapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed((previous) => !previous)}
            />
          </div>
        </aside>
          <div className="bg-secondary flex w-full overflow-hidden">
            <ChatInterface
              title={currentChat?.title || "New workspace chat"}
              messages={messages}
              onSendMessage={handleSendMessage}
              onOpenSidebar={() => setIsSidebarOpen(true)}
              isGenerating={isGenerating}
            />
          </div>
      </div>
    </div>
  );
}
