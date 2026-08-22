"use client";

import { create } from "zustand";

import type { ChatMessage } from "@repo/services/web";

type ChatState = {
  pendingMessagesByConversation: Record<string, ChatMessage[]>;
  isSending: boolean;
  setPendingMessages: (conversationId: string, messages: ChatMessage[]) => void;
  updatePendingMessages: (
    conversationId: string,
    updater: (prev: ChatMessage[]) => ChatMessage[],
  ) => void;
  clearPendingMessages: (conversationId: string) => void;
  setIsSending: (isSending: boolean) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  pendingMessagesByConversation: {},
  isSending: false,

  setPendingMessages: (conversationId, messages) =>
    set((state) => ({
      pendingMessagesByConversation: {
        ...state.pendingMessagesByConversation,
        [conversationId]: messages,
      },
    })),

  updatePendingMessages: (conversationId, updater) =>
    set((state) => {
      const prev = state.pendingMessagesByConversation[conversationId] ?? [];
      return {
        pendingMessagesByConversation: {
          ...state.pendingMessagesByConversation,
          [conversationId]: updater(prev),
        },
      };
    }),

  clearPendingMessages: (conversationId) =>
    set((state) => {
      const next = { ...state.pendingMessagesByConversation };
      delete next[conversationId];
      return { pendingMessagesByConversation: next };
    }),

  setIsSending: (isSending) => set({ isSending }),
}));
