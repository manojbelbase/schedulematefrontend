"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { skipToken, useQueryClient } from "@tanstack/react-query";

import { getBackendErrorMessage, options } from "@ui/lib/utils";

import {
  useChatControllerCreateConversation,
  useChatControllerGetConversation,
  useChatControllerListConversations,
  useChatControllerSendMessage,
  type ChatConversationListResponse,
  type ChatConversationResponse,
  type ChatMessage,
} from "@repo/services/web";

import ChatWindow from "@/components/chat/chat-window";
import ChatSidebar from "@/components/layouts/sidebar/chat-sidebar";
import { QUERY_KEYS } from "@/config/query-keys";
import { useAuth } from "@/hooks/use-auth";
import { useChatStore } from "@/zustand/chat";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const NO_MESSAGES: ChatMessage[] = [];

function buildPendingMessages(content: string): ChatMessage[] {
  const createdAt = new Date().toISOString();
  return [
    { id: createId(), role: "user", content, createdAt },
    { id: createId(), role: "assistant", content: "", createdAt },
  ];
}

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
  const queryClient = useQueryClient();

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

  const conversationQuery = useChatControllerGetConversation(
    conversationId ? { pathParams: { id: conversationId } } : skipToken,
    initialConversation ? { initialData: initialConversation } : undefined,
  );

  const pendingForActive = useChatStore((state) =>
    conversationId
      ? state.pendingMessagesByConversation[conversationId]
      : undefined,
  );
  const isSending = useChatStore((state) => state.isSending);

  const persistedMessages = conversationQuery.data?.data.messages ?? [];
  const pendingMessages = pendingForActive ?? NO_MESSAGES;

  // The conversation behind this URL disappeared (deleted in another tab);
  // fall back to the new-chat view.
  useEffect(() => {
    if (conversationId && conversationQuery.isError) {
      router.replace("/chat");
    }
  }, [conversationId, conversationQuery.isError, router]);

  const { mutateAsync: createNewConversation } =
    useChatControllerCreateConversation(
      options(
        undefined,
        async () => {
          void queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.chat,
          });
        },
        { disableDefaultToast: true },
      ),
    );

  const { mutateAsync: sendChatMessage } = useChatControllerSendMessage(
    options(
      undefined,
      async () => {
        void queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.chat,
        });
      },
      {
        disableDefaultToast: true,
        disableErrorToast: true,
      },
    ),
  );

  const sendMessage = useCallback(
    (content: string) => {
      const run = async () => {
        const targetId =
          conversationId ?? (await createNewConversation({ body: {} })).data.id;

        if (!conversationId) {
          router.push(`/chat/${targetId}`);
        }

        const chat = useChatStore.getState();
        chat.setPendingMessages(targetId, buildPendingMessages(content));
        chat.setIsSending(true);

        try {
          await sendChatMessage({
            pathParams: { id: targetId },
            body: { conversationId: targetId, content },
          });
          chat.clearPendingMessages(targetId);
          chat.setIsSending(false);
          void queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.chat,
          });
        } catch (error) {
          const message = getBackendErrorMessage(error);
          chat.updatePendingMessages(targetId, (prev) =>
            prev.map((m) =>
              m.role === "assistant" && !m.content
                ? { ...m, content: message }
                : m,
            ),
          );
          chat.setIsSending(false);
        }
      };

      void run().catch(() => {
        // handled by the default error toast in options()
      });
    },
    [
      conversationId,
      createNewConversation,
      queryClient,
      router,
      sendChatMessage,
    ],
  );

  const newChat = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const selectConversation = useCallback(
    (id: string) => {
      router.push(`/chat/${id}`);
    },
    [router],
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
        activeConversationId={activeConversation?.id ?? null}
        onNewChat={newChat}
        onSelectConversation={selectConversation}
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
