import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EmptyState } from "@/components/chat/chat-empty-state";

vi.mock("@/components/chat/chat-prompts.data", () => ({
  CHAT_PROMPTS: [
    { title: "Plan my day", description: "Organize your schedule" },
    { title: "Find free slots", description: "Check availability" },
  ],
}));

describe("EmptyState", () => {
  it("renders greeting with user name", () => {
    render(<EmptyState userName="John" onPromptClick={vi.fn()} />);
    expect(screen.getByText(/How can I help you, John/)).toBeInTheDocument();
  });

  it("renders greeting without user name", () => {
    render(<EmptyState onPromptClick={vi.fn()} />);
    expect(screen.getByText("How can I help you?")).toBeInTheDocument();
  });

  it("renders all prompt buttons", () => {
    render(<EmptyState onPromptClick={vi.fn()} />);
    expect(screen.getByText("Plan my day")).toBeInTheDocument();
    expect(screen.getByText("Find free slots")).toBeInTheDocument();
  });

  it("calls onPromptClick when prompt is clicked", () => {
    const handleClick = vi.fn();
    render(<EmptyState onPromptClick={handleClick} />);
    fireEvent.click(screen.getByText("Plan my day"));
    expect(handleClick).toHaveBeenCalledWith("Plan my day");
  });
});
