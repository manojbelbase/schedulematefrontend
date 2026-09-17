import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EmailForm } from "@/components/auth/email-form";
import { useAuthStore } from "@/zustand/auth";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("EmailForm", () => {
  const defaultProps = {
    redirect: "/",
    onFlowChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it("renders sign-in form by default", () => {
    render(<EmailForm {...defaultProps} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("shows create account link", () => {
    render(<EmailForm {...defaultProps} />);
    expect(screen.getByText("Create one")).toBeInTheDocument();
  });

  it("switches to sign-up mode when create one is clicked", () => {
    render(<EmailForm {...defaultProps} />);
    fireEvent.click(screen.getByText("Create one"));
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("calls onFlowChange when switching to forgot mode", () => {
    render(<EmailForm {...defaultProps} />);
    fireEvent.click(screen.getByText("Forgot password?"));
    expect(defaultProps.onFlowChange).toHaveBeenCalledWith(true);
  });

  it("calls login on sign-in submit", async () => {
    vi.spyOn(useAuthStore.getState(), "login").mockResolvedValue(undefined);

    render(<EmailForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().login).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password",
      });
    });
  });
});
