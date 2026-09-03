import { describe, expect, it } from "vitest";

import { buildPendingMessages } from "@/utils/chat.utils";

describe("buildPendingMessages", () => {
  it("returns exactly two messages", () => {
    const messages = buildPendingMessages("Hello");
    expect(messages).toHaveLength(2);
  });

  it("first message is user role with correct content", () => {
    const messages = buildPendingMessages("Hello world");
    expect(messages[0].role).toBe("user");
    expect(messages[0].content).toBe("Hello world");
  });

  it("second message is assistant role with empty content", () => {
    const messages = buildPendingMessages("test");
    expect(messages[1].role).toBe("assistant");
    expect(messages[1].content).toBe("");
  });

  it("each message has a unique id", () => {
    const messages = buildPendingMessages("test");
    expect(messages[0].id).not.toBe(messages[1].id);
  });

  it("each message has a createdAt ISO string", () => {
    const messages = buildPendingMessages("test");
    expect(() => new Date(messages[0].createdAt!)).not.toThrow();
    expect(() => new Date(messages[1].createdAt!)).not.toThrow();
  });
});
