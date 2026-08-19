"use client";

import { useCallback, useRef, useState } from "react";

import ChatWindow from "@/components/chat/chat-window";
import ChatSidebar from "@/components/layouts/sidebar/chat-sidebar";
import { useAuth } from "@/hooks/use-auth";
import type { ChatConversation, ChatMessage } from "@/types/chat";

const MOCK_RESPONSES = [
  "Here's a quick plan for your day: block out your mornings for deep work, reserve 30 minutes after lunch for emails, and leave late afternoon open for meetings.",
  "I found an open 30-minute slot today at 3:30 PM. Want me to schedule a meeting there?",
  "Here's an overview of your week: 12 meetings, 2 focus blocks, and 1 recurring review. Looks like Wednesday is your busiest day.",
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatClient() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const nextResponseRef = useRef(0);

  const activeMessages =
    conversations.find((c) => c.id === activeId)?.messages ?? [];

  const touch = (conversation: ChatConversation): ChatConversation => ({
    ...conversation,
    updatedAt: new Date().toISOString(),
  });

  const newChat = useCallback(() => {
    const id = createId();
    const now = new Date().toISOString();
    const conversation: ChatConversation = {
      id,
      title: "New conversation",
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    setConversations((prev) => [conversation, ...prev]);
    setActiveId(id);
    return id;
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      const targetId = activeId ?? newChat();

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetId
            ? touch({
                ...c,
                title:
                  c.title === "New conversation"
                    ? content.slice(0, 40)
                    : c.title,
                messages: [...c.messages, userMessage],
              })
            : c,
        ),
      );

      setIsStreaming(true);

      const response = MOCK_RESPONSES[nextResponseRef.current]!;
      nextResponseRef.current =
        (nextResponseRef.current + 1) % MOCK_RESPONSES.length;

      window.setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: response,
          createdAt: new Date().toISOString(),
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === targetId
              ? touch({ ...c, messages: [...c.messages, assistantMessage] })
              : c,
          ),
        );
        setIsStreaming(false);
      }, 900);
    },
    [activeId, newChat],
  );

  const sidebarItems = conversations.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar
        conversations={sidebarItems}
        activeConversationId={activeId}
        onNewChat={newChat}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
      />
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={activeMessages}
          isStreaming={isStreaming}
          onSend={sendMessage}
          onPromptClick={(prompt) => sendMessage(prompt)}
          userName={user?.name ?? user?.username ?? undefined}
        />
      </main>
    </div>
  );
}
