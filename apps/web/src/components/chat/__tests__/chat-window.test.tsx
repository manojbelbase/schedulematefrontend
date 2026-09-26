import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ChatWindow from "@/components/chat/chat-window";
import type { ChatMessage } from "@/types/chat";

describe("ChatWindow", () => {
  const defaultProps = {
    messages: [] as ChatMessage[],
    isSending: false,
    onSend: vi.fn(),
    onPromptClick: vi.fn(),
    userName: "Test",
  };

  beforeEach(() => {
    defaultProps.onSend.mockClear();
    defaultProps.onPromptClick.mockClear();
  });

  it("renders empty state when no messages", () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByText(/How can I help you/)).toBeInTheDocument();
  });

  it("renders messages when provided", () => {
    const messages: ChatMessage[] = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi there!" },
    ];
    render(<ChatWindow {...defaultProps} messages={messages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByTestId("ai-response-parser")).toHaveTextContent(
      "Hi there!",
    );
  });

  it("shows typing indicator when sending", () => {
    const messages: ChatMessage[] = [
      { id: "1", role: "user", content: "Hello" },
    ];
    render(
      <ChatWindow {...defaultProps} messages={messages} isSending={true} />,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
  });

  it("calls onSend with trimmed text when send button clicked", () => {
    render(<ChatWindow {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "  Hello AI  " } });
    const sendButton = screen.getByLabelText("Send message");
    fireEvent.click(sendButton);
    expect(defaultProps.onSend).toHaveBeenCalledWith("Hello AI");
  });

  it("does not call onSend when message is empty", () => {
    render(<ChatWindow {...defaultProps} />);
    const sendButton = screen.getByLabelText("Send message");
    fireEvent.click(sendButton);
    expect(defaultProps.onSend).not.toHaveBeenCalled();
  });

  it("calls onSend on Enter key (without shift)", () => {
    render(<ChatWindow {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(defaultProps.onSend).toHaveBeenCalledWith("Hello");
  });
});
