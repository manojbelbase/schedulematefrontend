"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Separator } from "@ui/components/ui/separator";

import { EmailForm } from "./email-form";
import { GoogleSignInButton } from "./google-sign-in-button";

function SignInInner() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const [isForgot, setIsForgot] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2 flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {isForgot ? "Reset your password" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isForgot
            ? "We'll send a code to your email to reset your password."
            : "Sign in to your account to continue."}
        </p>
      </div>

      {!isForgot && (
        <>
          <GoogleSignInButton redirect={redirect} />

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm">
              or continue with email
            </span>
            <Separator className="flex-1" />
          </div>
        </>
      )}

      <EmailForm redirect={redirect} onFlowChange={setIsForgot} />
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
