import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Logo from "@/components/logo";

describe("Logo", () => {
  it("renders the scheduleGPT logo image", () => {
    render(<Logo />);
    const img = screen.getByAltText("scheduleGPT");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("scheduleGPT.svg");
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
