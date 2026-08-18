"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Separator } from "@ui/components/ui/separator";

import { googleAuthUrl } from "@/config/api";
import { useAuthStore } from "@/zustand/auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function AuthUrl() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  return { redirect };
}

function GoogleSignInButton({ redirect }: { redirect: string }) {
  const authUrl = googleAuthUrl(redirect);

  return (
    <Button
      variant="outline"
      type="button"
      asChild
      className="h-11 w-full gap-3 font-medium"
    >
      <Link href={authUrl}>
        <GoogleIcon className="size-5" />
        Continue with Google
      </Link>
    </Button>
  );
}

function EmailForm({ redirect }: { redirect: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function showToast(message: string, type: "success" | "error") {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const login = useAuthStore.getState().login;
      const register = useAuthStore.getState().register;

      if (mode === "signin") {
        await login({ email, password });
        showToast("Welcome back! You're signed in.", "success");
        router.push(redirect);
      } else {
        await register({ email, name, password });
        showToast("Account created successfully! You're signed in.", "success");
        router.push(redirect);
      }
    } catch (err) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
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
        <Label htmlFor="auth-password">Password</Label>
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
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-primary cursor-pointer font-medium underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
    </form>
  );
}

function SignInInner() {
  const { redirect } = AuthUrl();
  return (
    <div className="flex flex-col gap-6">
      <GoogleSignInButton redirect={redirect} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">
          or continue with email
        </span>
        <Separator className="flex-1" />
      </div>

      <EmailForm redirect={redirect} />
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInInner />
    </Suspense>
  );
}
