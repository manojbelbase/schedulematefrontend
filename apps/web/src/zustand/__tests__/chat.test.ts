import { beforeEach, describe, expect, it } from "vitest";

import { useChatStore } from "@/zustand/chat";

describe("useChatStore", () => {
  beforeEach(() => {
    useChatStore.setState({
      pendingMessagesByConversation: {},
      isSending: false,
    });
  });

  describe("initial state", () => {
    it("has empty pending messages", () => {
      expect(useChatStore.getState().pendingMessagesByConversation).toEqual({});
    });

    it("isSending is false", () => {
      expect(useChatStore.getState().isSending).toBe(false);
    });
  });

  describe("setPendingMessages", () => {
    it("adds messages for a conversation", () => {
      const messages = [{ id: "1", role: "user" as const, content: "Hi" }];
      useChatStore.getState().setPendingMessages("conv-1", messages);
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-1"],
      ).toEqual(messages);
    });

    it("overwrites messages for same conversation", () => {
      const msgs1 = [{ id: "1", role: "user" as const, content: "Hi" }];
      const msgs2 = [{ id: "2", role: "user" as const, content: "Hello" }];
      useChatStore.getState().setPendingMessages("conv-1", msgs1);
      useChatStore.getState().setPendingMessages("conv-1", msgs2);
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-1"],
      ).toEqual(msgs2);
    });

    it("stores messages for different conversations separately", () => {
      const msgs1 = [{ id: "1", role: "user" as const, content: "A" }];
      const msgs2 = [{ id: "2", role: "user" as const, content: "B" }];
      useChatStore.getState().setPendingMessages("conv-1", msgs1);
      useChatStore.getState().setPendingMessages("conv-2", msgs2);
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-1"],
      ).toEqual(msgs1);
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-2"],
      ).toEqual(msgs2);
    });
  });

  describe("updatePendingMessages", () => {
    it("appends to existing messages", () => {
      const msgs = [{ id: "1", role: "user" as const, content: "Hi" }];
      useChatStore.getState().setPendingMessages("conv-1", msgs);
      useChatStore
        .getState()
        .updatePendingMessages("conv-1", (prev) => [
          ...prev,
          { id: "2", role: "assistant" as const, content: "Hello!" },
        ]);
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-1"],
      ).toHaveLength(2);
    });

    it("creates empty array if no pending messages exist", () => {
      useChatStore
        .getState()
        .updatePendingMessages("new-conv", (prev) => [
          ...prev,
          { id: "1", role: "user" as const, content: "test" },
        ]);
      expect(
        useChatStore.getState().pendingMessagesByConversation["new-conv"],
      ).toHaveLength(1);
    });
  });

  describe("clearPendingMessages", () => {
    it("removes messages for a conversation", () => {
      const msgs = [{ id: "1", role: "user" as const, content: "Hi" }];
      useChatStore.getState().setPendingMessages("conv-1", msgs);
      useChatStore.getState().clearPendingMessages("conv-1");
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-1"],
      ).toBeUndefined();
    });

    it("does not affect other conversations", () => {
      useChatStore
        .getState()
        .setPendingMessages("conv-1", [
          { id: "1", role: "user" as const, content: "A" },
        ]);
      useChatStore
        .getState()
        .setPendingMessages("conv-2", [
          { id: "2", role: "user" as const, content: "B" },
        ]);
      useChatStore.getState().clearPendingMessages("conv-1");
      expect(
        useChatStore.getState().pendingMessagesByConversation["conv-2"],
      ).toHaveLength(1);
    });
  });

  describe("setIsSending", () => {
    it("toggles isSending state", () => {
      useChatStore.getState().setIsSending(true);
      expect(useChatStore.getState().isSending).toBe(true);
      useChatStore.getState().setIsSending(false);
      expect(useChatStore.getState().isSending).toBe(false);
    });
  });
});
