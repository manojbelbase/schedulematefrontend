import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

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

vi.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

vi.mock("@repo/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).map(String).join(" "),
  getBackendErrorMessage: (error: unknown) => {
    if (typeof error === "object" && error !== null && "message" in error) {
      return String((error as { message: unknown }).message);
    }
    return "Something went wrong.";
  },
  options: vi.fn(() => ({})),
  parseBackendValidation: vi.fn(),
}));

vi.mock("@repo/ui/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: string;
    size?: string;
  }) => <button {...props}>{children}</button>,
}));

vi.mock("@repo/ui/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

vi.mock("@repo/ui/components/ui/label", () => ({
  Label: ({
    children,
    ...props
  }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{children}</label>
  ),
}));

vi.mock("@repo/ui/components/ui/separator", () => ({
  Separator: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} data-testid="separator" />
  ),
}));

vi.mock("@repo/ui/components/ui/textarea", () => ({
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} />
  ),
}));

vi.mock("@repo/ui/components/ui/otp-input", () => ({
  OtpInput: ({
    value,
    onChange,
    length,
    id,
  }: {
    value: string;
    onChange: (value: string) => void;
    length: number;
    id?: string;
  }) => (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={length}
      data-testid="otp-input"
    />
  ),
}));

vi.mock("@repo/ui/components/ui/sonner", () => ({
  Toaster: () => null,
}));

vi.mock("@repo/ui/components/ui/trigger", () => ({
  default: ({
    children,
  }: {
    children: React.ReactNode;
    modalID?: string;
    type?: unknown;
    initiatorName?: string;
    queryKeys?: unknown[];
    data?: unknown;
  }) => <div>{children}</div>,
}));

vi.mock("@repo/ui/context/modal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@repo/ui/components/modal", () => ({
  default: () => null,
}));

vi.mock("@repo/services/web", () => ({
  fetchAuthControllerLogin: vi.fn(),
  fetchAuthControllerRegister: vi.fn(),
  fetchAuthControllerMe: vi.fn(),
  fetchAuthControllerLogout: vi.fn(),
  fetchAuthControllerRefresh: vi.fn(),
  fetchAuthControllerForgotPassword: vi.fn(),
  fetchAuthControllerVerifyOtp: vi.fn(),
  fetchAuthControllerResetPassword: vi.fn(),
  useAuthControllerMe: vi.fn(() => ({
    data: undefined,
    isPending: true,
  })),
  useChatControllerListConversations: vi.fn(() => ({
    data: undefined,
    isPending: false,
  })),
  useChatControllerSendMessage: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useChatControllerCreateConversation: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  setDynamicHeaderProvider: vi.fn(),
}));

vi.mock("@/config/env", () => ({
  env: {
    NEXT_PUBLIC_WEB_API_BASE_URL: "http://localhost:3000",
    DOCS_AUTH_TOKEN: undefined,
    NODE_ENV: "test",
  },
  validateEnv: vi.fn(() => ({
    NEXT_PUBLIC_WEB_API_BASE_URL: "http://localhost:3000",
    DOCS_AUTH_TOKEN: undefined,
    NODE_ENV: "test",
  })),
}));

vi.mock("@/config/api", () => ({
  webApiBaseUrl: "http://localhost:3000",
  googleAuthUrl: (redirect: string) =>
    `http://localhost:3000/api/auth/google?redirect=${encodeURIComponent(redirect)}`,
  calendarConnectUrl: (redirect: string) =>
    `http://localhost:3000/api/calendar-connection/connect?redirect=${encodeURIComponent(redirect)}`,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock("ai-response-parser", () => ({
  AIResponseParser: ({
    content,
  }: {
    content: string;
    textColor?: string;
    className?: string;
  }) => <div data-testid="ai-response-parser">{content}</div>,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
