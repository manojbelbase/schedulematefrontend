import { describe, expect, it } from "vitest";

import { buildPendingMessages } from "@/utils/chat.utils";

describe("buildPendingMessages", () => {
  it("returns exactly two messages", () => {
    const messages = buildPendingMessages("Hello");
    expect(messages).toHaveLength(2);
  });

  it("first message is user role with correct content", () => {
    const [user] = buildPendingMessages("Hello world");
    expect(user?.role).toBe("user");
    expect(user?.content).toBe("Hello world");
  });

  it("second message is assistant role with empty content", () => {
    const [, assistant] = buildPendingMessages("test");
    expect(assistant?.role).toBe("assistant");
    expect(assistant?.content).toBe("");
  });

  it("each message has a unique id", () => {
    const [user, assistant] = buildPendingMessages("test");
    expect(user?.id).not.toBe(assistant?.id);
  });

  it("each message has a createdAt ISO string", () => {
    const messages = buildPendingMessages("test");
    expect(() => new Date(messages[0]!.createdAt)).not.toThrow();
    expect(() => new Date(messages[1]!.createdAt)).not.toThrow();
  });
});
