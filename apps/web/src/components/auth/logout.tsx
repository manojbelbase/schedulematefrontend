"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import { useDescope, useSession } from "@descope/nextjs-sdk/client";

function LogoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSessionLoading } = useSession();
  const sdk = useDescope();

  const redirect = searchParams.get("redirect") ?? "/auth/login";

  useEffect(() => {
    if (isSessionLoading) return;
    void sdk
      .logout(redirect)
      .then(() => router.replace(redirect))
      .catch(() => router.replace(redirect));
  }, [isSessionLoading, redirect, router, sdk]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Signing you out…</p>
      </div>
    </div>
  );
}

export default function Logout() {
  return (
    <Suspense>
      <LogoutInner />
    </Suspense>
  );
}

export function useLogout(redirect = "/auth/login") {
  const router = useRouter();
  const sdk = useDescope();

  return useCallback(() => {
    void sdk
      .logout(redirect)
      .then(() => router.replace(redirect))
      .catch(() => router.replace(redirect));
  }, [redirect, router, sdk]);
}
