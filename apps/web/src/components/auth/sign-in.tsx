"use client";

import { useSearchParams } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";

export default function SignIn() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  callbackUrl.searchParams.set("redirect", redirect);

  return (
    <Descope
      flowId="sign-up-or-in"
      redirectAfterSuccess={callbackUrl.toString()}
      autoFocus="skipFirstScreen"
    />
  );
}
