"use client";

import { useCallback, useState } from "react";
import { skipToken, useQueryClient } from "@tanstack/react-query";

import {
  chatControllerListConversationsQuery,
  chatControllerListMessagesQuery,
  useChatControllerCreateConversation,
  useChatControllerDeleteConversation,
  useChatControllerListConversations,
  useChatControllerListMessages,
  useChatControllerSendMessage,
  type ChatConversationListResponse,
  type ChatMessage,
} from "@repo/services/web";

import ChatWindow from "@/components/chat/chat-window";
import ChatSidebar from "@/components/layouts/sidebar/chat-sidebar";
import { useAuth } from "@/hooks/use-auth";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type ChatLayoutProps = {
  data?: ChatConversationListResponse;
};

export default function ChatLayout({ data }: ChatLayoutProps) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<ChatMessage[]>([]);

  const conversationsQuery = useChatControllerListConversations(
    {},
    {
      enabled: isAuthenticated,
      initialData: data,
    },
  );
  const conversations = conversationsQuery.data?.data ?? [];

  const messagesQuery = useChatControllerListMessages(
    activeId ? { pathParams: { id: activeId } } : skipToken,
    { enabled: Boolean(activeId) },
  );
  const persistedMessages = messagesQuery.data?.data ?? [];

  const createConversation = useChatControllerCreateConversation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chatControllerListConversationsQuery({}).queryKey,
      });
    },
  });

  const deleteConversationMutation = useChatControllerDeleteConversation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chatControllerListConversationsQuery({}).queryKey,
      });
    },
  });

  const deleteByID = useCallback(
    async (id: string) => {
      await deleteConversationMutation.mutateAsync({ pathParams: { id } });
      setActiveId((prev) => (prev === id ? null : prev));
      setPendingMessages([]);
    },
    [deleteConversationMutation],
  );

  const sendMessageMutation = useChatControllerSendMessage();

  const newChat = useCallback(() => {
    setActiveId(null);
    setPendingMessages([]);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
    setPendingMessages([]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let targetId: string;
      if (activeId) {
        targetId = activeId;
      } else {
        const created = await createConversation.mutateAsync({ body: {} });
        targetId = created.data.id;
        setActiveId(targetId);
      }

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };
      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      setPendingMessages([userMessage, assistantMessage]);
      setIsSending(true);

      try {
        await sendMessageMutation.mutateAsync({
          pathParams: { id: targetId },
          body: { conversationId: targetId, content },
        });
        setPendingMessages([]);
        void queryClient.invalidateQueries({
          queryKey: chatControllerListMessagesQuery({
            pathParams: { id: targetId },
          }).queryKey,
        });
        void queryClient.invalidateQueries({
          queryKey: chatControllerListConversationsQuery({}).queryKey,
        });
      } catch {
        setPendingMessages([
          userMessage,
          { ...assistantMessage, content: "Sorry, something went wrong." },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [activeId, createConversation, queryClient, sendMessageMutation],
  );

  const displayedMessages = [...persistedMessages, ...pendingMessages];

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
        onDeleteConversation={deleteByID}
      />
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={displayedMessages}
          isSending={isSending}
          onSend={(content) => {
            void sendMessage(content);
          }}
          onPromptClick={(prompt) => {
            void sendMessage(prompt);
          }}
          userName={user?.name ?? user?.username ?? undefined}
        />
      </main>
    </div>
  );
}
