import type { ChatMessage } from "@repo/services/web";

/**
 * Optimistic pair shown while a send is in flight: the user bubble
 * immediately, plus an empty assistant bubble that renders as a typing
 * indicator until real data replaces both.
 */
export function buildPendingMessages(content: string): ChatMessage[] {
  const createdAt = new Date().toISOString();
  const createLocalId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return [
    { id: createLocalId(), role: "user", content, createdAt },
    { id: createLocalId(), role: "assistant", content: "", createdAt },
  ];
}
