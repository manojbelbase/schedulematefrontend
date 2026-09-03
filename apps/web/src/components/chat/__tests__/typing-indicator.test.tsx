import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TypingIndicator } from "@/components/chat/typing-indicator";

describe("TypingIndicator", () => {
  it("renders three animated dots", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll(".animate-pulse");
    expect(dots).toHaveLength(3);
  });

  it("renders inside a message bubble container", () => {
    const { container } = render(<TypingIndicator />);
    expect(container.querySelector(".rounded-2xl")).toBeInTheDocument();
  });
});
