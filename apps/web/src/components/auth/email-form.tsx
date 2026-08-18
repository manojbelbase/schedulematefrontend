"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeftIcon, Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { OtpInput } from "@ui/components/ui/otp-input";

import { useAuthStore } from "@/zustand/auth";

type Mode = "signin" | "signup" | "forgot";
type ForgotStep = "email" | "otp" | "password";

export function EmailForm({
  redirect,
  onFlowChange,
}: {
  redirect: string;
  onFlowChange: (isForgot: boolean) => void;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onFlowChange(mode === "forgot");
  }, [mode, onFlowChange]);

  function showToast(message: string, type: "success" | "error") {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  function getErrorMessage(err: unknown): string {
    if (typeof err === "object" && err !== null && "message" in err) {
      return String((err as { message?: unknown }).message);
    }
    if (err instanceof Error) {
      return err.message;
    }
    return "Something went wrong. Please try again.";
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { login, register, forgotPassword, verifyOtp, resetPassword } =
        useAuthStore.getState();

      if (mode === "forgot") {
        await handleForgot({
          forgotPassword,
          verifyOtp,
          resetPassword,
        });
      } else if (mode === "signin") {
        await login({ email, password });
        showToast("Welcome back! You're signed in.", "success");
        router.push(redirect);
      } else {
        await register({ email, name, password });
        showToast("Account created successfully! You're signed in.", "success");
        router.push("/");
      }
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(actions: {
    forgotPassword: (email: string) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<void>;
    resetPassword: (
      email: string,
      otp: string,
      newPassword: string,
    ) => Promise<void>;
  }) {
    const { forgotPassword, verifyOtp, resetPassword } = actions;

    if (forgotStep === "email") {
      await forgotPassword(email);
      setForgotStep("otp");
      showToast(
        "If an account exists, a reset code has been sent to your email.",
        "success",
      );
    } else if (forgotStep === "otp") {
      if (!/^\d{6}$/.test(otp)) {
        throw new Error("Please enter the 6-digit code.");
      }
      await verifyOtp(email, otp);
      setForgotStep("password");
      showToast("Code verified. Please choose a new password.", "success");
    } else {
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      await resetPassword(email, otp, newPassword);
      showToast("Password reset successfully! Please sign in.", "success");
      router.push("/auth/login");
    }
  }

  function switchMode(nextMode: Mode) {
    setError(null);
    setForgotStep("email");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setMode(nextMode);
  }

  if (mode === "forgot") {
    return (
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="flex flex-col gap-4"
      >
        {forgotStep === "email" && (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-email">Email</Label>
              <div className="relative">
                <MailIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 pl-9"
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full font-medium"
            >
              {loading && <Loader2Icon className="size-4 animate-spin" />}
              Send reset code
            </Button>
          </>
        )}

        {forgotStep === "otp" && (
          <>
            <p className="text-muted-foreground text-sm">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="text-foreground font-medium">{email}</span> if an
              account exists. Enter it below to continue.
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-otp">Verification code</Label>
              <OtpInput
                id="auth-otp"
                length={6}
                value={otp}
                onChange={setOtp}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full font-medium"
            >
              {loading && <Loader2Icon className="size-4 animate-spin" />}
              Verify code
            </Button>
          </>
        )}

        {forgotStep === "password" && (
          <>
            <p className="text-muted-foreground text-sm">
              Code verified. Choose a new password for your account.
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-new-password">New password</Label>
              <Input
                id="auth-new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 pl-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-confirm-password">Confirm password</Label>
              <Input
                id="auth-confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 pl-3"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full font-medium"
            >
              {loading && <Loader2Icon className="size-4 animate-spin" />}
              Reset password
            </Button>
          </>
        )}

        <button
          type="button"
          onClick={() => switchMode("signin")}
          className="text-muted-foreground inline-flex cursor-pointer items-center justify-center gap-1 text-sm underline-offset-4 hover:underline"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="auth-email">Email</Label>
        <div className="relative">
          <MailIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 pl-9"
          />
        </div>
      </div>

      {mode === "signup" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="auth-name">Name</Label>
          <Input
            id="auth-name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 pl-3"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auth-password">Password</Label>
          {mode === "signin" && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setForgotStep("email");
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
                setMode("forgot");
              }}
              className="text-primary cursor-pointer text-sm font-medium underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <LockIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="auth-password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={mode === "signup" ? 8 : undefined}
            placeholder={
              mode === "signup" ? "At least 8 characters" : "Your password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 pl-9"
          />
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full font-medium"
      >
        {loading && <Loader2Icon className="size-4 animate-spin" />}
        {mode === "signin" ? "Sign in" : "Create account"}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        {mode === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
          className="text-primary cursor-pointer font-medium underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
    </form>
  );
}
