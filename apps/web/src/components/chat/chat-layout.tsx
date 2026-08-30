"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { skipToken } from "@tanstack/react-query";

import {
  useChatControllerGetConversation,
  useChatControllerListConversations,
  type ChatConversationListResponse,
  type ChatConversationResponse,
  type ChatMessage,
} from "@repo/services/web";

import ChatWindow from "@/components/chat/chat-window";
import ChatSidebar from "@/components/layouts/sidebar/chat-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useChatActions } from "@/hooks/use-chat-actions";
import { useChatStore } from "@/zustand/chat";

const NO_MESSAGES: ChatMessage[] = [];

type ChatLayoutProps = {
  data?: ChatConversationListResponse;
  conversationId?: string;
  initialConversation?: ChatConversationResponse;
};

export default function ChatLayout({
  data,
  conversationId,
  initialConversation,
}: ChatLayoutProps) {
  const { user } = useAuth();
  const router = useRouter();

  const conversationsQuery = useChatControllerListConversations(
    {},
    { initialData: data },
  );
  const conversations = useMemo(
    () => conversationsQuery.data?.data ?? [],
    [conversationsQuery.data],
  );

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === conversationId) ?? null,
    [conversations, conversationId],
  );

  const { data: conversationData } = useChatControllerGetConversation(
    conversationId ? { pathParams: { id: conversationId } } : skipToken,
    initialConversation ? { initialData: initialConversation } : undefined,
  );

  const { sendMessage, newChat } = useChatActions({ conversationId });

  const pendingForActive = useChatStore(
    (state) => state.pendingMessagesByConversation[conversationId ?? ""],
  );

  const isSending = useChatStore((state) => state.isSending);
  const displayedMessages = useMemo(() => {
    const serverMessages = conversationData?.data?.messages ?? [];
    const pending = pendingForActive ?? NO_MESSAGES;
    if (serverMessages.length === 0) return pending;
    const seen = new Set(serverMessages.map((m) => `${m.role}:${m.content}`));
    return [
      ...serverMessages,
      ...pending.filter(
        (m) => !(m.role === "user" && seen.has(`user:${m.content}`)),
      ),
    ];
  }, [conversationData, pendingForActive]);

  const sidebarItems = conversations.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar
        conversations={sidebarItems}
        activeConversationId={activeConversation?.id ?? null}
        onNewChat={newChat}
        onSelectConversation={(id) => router.push(`/chat/${id}`)}
      />
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={displayedMessages}
          isSending={isSending}
          onSend={sendMessage}
          onPromptClick={sendMessage}
          userName={user?.name ?? user?.username ?? undefined}
        />
      </main>
    </div>
  );
}
