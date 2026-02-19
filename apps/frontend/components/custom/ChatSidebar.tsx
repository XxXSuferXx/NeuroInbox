"use client";

import { MessageSquarePlus, Trash2 } from "lucide-react";
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
    return (
        <aside className={cn(
            "h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-200 ease-out",
            isCollapsed ? "w-16" : "w-[20%] min-w-[250px]"
        )}>
            {/* Collapse Button - Desktop Only */}
            {onToggleCollapse && (
                <div className="hidden lg:flex p-3 border-b border-border justify-end">
                    <button
                        onClick={onToggleCollapse}
                        className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={cn("transition-transform duration-200 ease-out", isCollapsed && "rotate-180")}
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                            <path d="m14 9 3 3-3 3" />
                        </svg>
                    </button>
                </div>
            )}

            {/* New Chat Button */}
            {!isCollapsed && (
                <div className="p-3 border-b border-border">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition-colors"
                    >
                        <MessageSquarePlus className="h-5 w-5 shrink-0" />
                        <span className="font-medium">New Chat</span>
                    </button>
                </div>
            )}

            {/* Collapsed New Chat Button */}
            {isCollapsed && (
                <div className="p-2 border-b border-border flex justify-center">
                    <button
                        onClick={onNewChat}
                        className="p-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition-colors"
                        title="New Chat"
                    >
                        <MessageSquarePlus className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Chat History List */}
            <div className="flex-1 overflow-y-auto p-2">
                {chatHistory.length === 0 ? (
                    !isCollapsed && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No chats yet
                        </div>
                    )
                ) : (
                    <div className="flex flex-col gap-1">
                        {chatHistory.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onChatSelect(chat.id)}
                                className={cn(
                                    "group relative flex flex-col gap-1 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                                    currentChatId === chat.id
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
                                    isCollapsed && "px-2 justify-center items-center"
                                )}
                                title={isCollapsed ? chat.title : undefined}
                            >
                                {!isCollapsed ? (
                                    <>
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">
                                                    {chat.title}
                                                </div>
                                                <div className="text-xs opacity-60 truncate">
                                                    {chat.lastMessage}
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteChat(chat.id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-opacity"
                                            >
                                                <Trash2 className="h-3 w-3 text-destructive" />
                                            </button>
                                        </div>
                                        <div className="text-xs opacity-60">
                                            {chat.timestamp}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                                        <span className="text-xs font-semibold">
                                            {chat.title.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* User Profile Section */}
            {!isCollapsed && (
                <div className="p-3 border-t border-border">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/50 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-sidebar-foreground truncate">
                                User Name
                            </div>
                            <div className="text-xs text-sidebar-foreground/60 truncate">
                                user@example.com
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Collapsed User Profile */}
            {isCollapsed && (
                <div className="p-2 border-t border-border flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm cursor-pointer hover:opacity-80 transition-opacity" title="User Name">
                        U
                    </div>
                </div>
            )}
        </aside>
    );
}
