"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getBackendErrorMessage, options } from "@ui/lib/utils";

import {
  useChatControllerCreateConversation,
  useChatControllerListConversations,
  useChatControllerSendMessage,
} from "@repo/services/web";

import { QUERY_KEYS } from "@/config/query-keys";
import { buildPendingMessages } from "@/utils/chat.utils";
import { useChatStore } from "@/zustand/chat";

export function useChatActions({ conversationId }: { conversationId: string }) {
  const queryClient = useQueryClient();

  const refreshChatCaches = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.chat });

  useChatControllerListConversations({});

  const { mutateAsync: createNewConversation } =
    useChatControllerCreateConversation(
      options(undefined, refreshChatCaches, { disableDefaultToast: true }),
    );

  const { mutateAsync: sendChatMessage } = useChatControllerSendMessage(
    options(undefined, refreshChatCaches, {
      disableDefaultToast: true,
      disableErrorToast: true,
    }),
  );

  const sendMessage = useCallback(
    (content: string) => {
      const run = async () => {
        // Optimistic: show user bubble + typing indicator immediately
        useChatStore
          .getState()
          .setPendingMessages(conversationId, buildPendingMessages(content));
        useChatStore.getState().setIsSending(true);

        try {
          await sendChatMessage({
            pathParams: { id: conversationId },
            body: {
              conversationId,
              content,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          });

          // Await the refetch so optimistic bubbles swap to real data
          // atomically - no flash, no lost history - then end the cycle.
          await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.chat });
          // Refetch the current user so the sidebar shows the updated
          // request limit in realtime without a reload.
          await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
          useChatStore.getState().clearPendingMessages(conversationId);
          useChatStore.getState().setIsSending(false);
        } catch (error) {
          const message = getBackendErrorMessage(error);
          useChatStore
            .getState()
            .updatePendingMessages(conversationId, (prev) =>
              prev.map((m) =>
                m.role === "assistant" && !m.content
                  ? { ...m, content: message }
                  : m,
              ),
            );
          useChatStore.getState().setIsSending(false);
        }
      };

      void run();
    },
    [conversationId, queryClient, sendChatMessage],
  );

  const newChat = useCallback(async () => {
    const cached = queryClient.getQueryData(QUERY_KEYS.conversations) as
      { data: { data: { id: string; title: string }[] } } | undefined;
    const emptyConv = cached?.data?.data?.find(
      (c) => c.title === "New conversation",
    );
    if (emptyConv?.id) {
      window.location.href = `/chat/${emptyConv.id}`;
      return;
    }

    const created = await createNewConversation({ body: {} });
    const conversation = created?.data;
    if (!conversation?.id) return;

    queryClient.setQueryData([...QUERY_KEYS.conversations, conversation.id], {
      success: true,
      message: "Conversation fetched successfully",
      data: conversation,
    });
    window.location.href = `/chat/${conversation.id}`;
  }, [createNewConversation, queryClient]);

  return { sendMessage, newChat };
}
