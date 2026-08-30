"use client";

import { useRouter } from "next/navigation";
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

type ChatConversationRef = {
  id: string;
  title: string;
};

export function useChatActions({
  conversationId,
}: {
  conversationId?: string;
}) {
  const router = useRouter();
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

  // Lazy-create or reuse an empty ("New conversation") thread when the user is
  // on a screen without a real conversation yet (e.g. `/chat` or `/`). The
  // first message always belongs to a valid conversation, so the API never
  // receives `undefined`/stale ids.
  const ensureConversation = useCallback(async (): Promise<string> => {
    const cached = queryClient.getQueryData(QUERY_KEYS.conversations) as
      { data: { data: ChatConversationRef[] } } | undefined;
    const emptyConv = cached?.data?.data?.find(
      (c) => c.title === "New conversation",
    );
    if (emptyConv?.id) return emptyConv.id;

    const created = await createNewConversation({ body: {} });
    const conversation = created?.data;
    if (!conversation?.id) {
      throw new Error("Could not create a conversation.");
    }

    queryClient.setQueryData([...QUERY_KEYS.conversations, conversation.id], {
      success: true,
      message: "Conversation fetched successfully",
      data: conversation,
    });
    return conversation.id;
  }, [createNewConversation, queryClient]);

  const sendMessage = useCallback(
    (content: string) => {
      const run = async () => {
        let targetId = conversationId;
        try {
          if (!targetId) {
            targetId = await ensureConversation();
            // Move to the concrete conversation so the sidebar highlights it,
            // the url is shareable and subsequent messages use the real id.
            if (targetId !== conversationId) {
              router.replace(`/chat/${targetId}`, { scroll: false });
            }
          }
        } catch (error) {
          const message = getBackendErrorMessage(error);
          useChatStore
            .getState()
            .setPendingMessages(
              conversationId ?? "",
              buildPendingMessages(content),
            );
          useChatStore
            .getState()
            .updatePendingMessages(conversationId ?? "", (prev) =>
              prev.map((m) =>
                m.role === "assistant" && !m.content
                  ? { ...m, content: message }
                  : m,
              ),
            );
          return;
        }

        // Optimistic: show user bubble + typing indicator immediately
        useChatStore
          .getState()
          .setPendingMessages(targetId, buildPendingMessages(content));
        useChatStore.getState().setIsSending(true);

        try {
          await sendChatMessage({
            pathParams: { id: targetId },
            body: {
              conversationId: targetId,
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
          useChatStore.getState().clearPendingMessages(targetId);
          useChatStore.getState().setIsSending(false);
        } catch (error) {
          const message = getBackendErrorMessage(error);
          useChatStore
            .getState()
            .updatePendingMessages(targetId, (prev) =>
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
    [conversationId, ensureConversation, queryClient, router, sendChatMessage],
  );

  const newChat = useCallback(async () => {
    const cached = queryClient.getQueryData(QUERY_KEYS.conversations) as
      { data: { data: ChatConversationRef[] } } | undefined;
    const emptyConv = cached?.data?.data?.find(
      (c) => c.title === "New conversation",
    );
    const emptyId = emptyConv?.id;
    // Reuse an empty thread unless it is the one the user is already on.
    if (emptyId && emptyId !== conversationId) {
      window.location.href = `/chat/${emptyId}`;
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
  }, [conversationId, createNewConversation, queryClient]);

  return { sendMessage, newChat };
}
