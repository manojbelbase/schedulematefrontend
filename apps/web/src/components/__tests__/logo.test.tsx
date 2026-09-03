import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Logo from "@/components/logo";

describe("Logo", () => {
  it("renders ScheduleMate text", () => {
    render(<Logo />);
    expect(screen.getByText("Schedule")).toBeInTheDocument();
    expect(screen.getByText("Mate")).toBeInTheDocument();
  });

  it("renders AI badge", () => {
    render(<Logo />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
