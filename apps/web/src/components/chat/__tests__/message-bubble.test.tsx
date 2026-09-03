import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MessageBubble } from "@/components/chat/message-bubble";
import type { ChatMessage } from "@/types/chat";

describe("MessageBubble", () => {
  it("renders user message with correct content", () => {
    const message: ChatMessage = {
      id: "1",
      role: "user",
      content: "Hello AI",
    };
    render(<MessageBubble message={message} />);
    expect(screen.getByText("Hello AI")).toBeInTheDocument();
  });

  it("renders assistant message with AIResponseParser", () => {
    const message: ChatMessage = {
      id: "2",
      role: "assistant",
      content: "Hello human!",
    };
    render(<MessageBubble message={message} />);
    expect(screen.getByTestId("ai-response-parser")).toHaveTextContent(
      "Hello human!",
    );
  });

  it("user message is right-aligned", () => {
    const message: ChatMessage = {
      id: "1",
      role: "user",
      content: "test",
    };
    const { container } = render(<MessageBubble message={message} />);
    const wrapper = container.querySelector(".justify-end");
    expect(wrapper).toBeInTheDocument();
  });

  it("assistant message is left-aligned", () => {
    const message: ChatMessage = {
      id: "2",
      role: "assistant",
      content: "test",
    };
    const { container } = render(<MessageBubble message={message} />);
    const wrapper = container.querySelector(".justify-start");
    expect(wrapper).toBeInTheDocument();
  });
});
