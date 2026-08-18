"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSession } from "@descope/nextjs-sdk/client";

function RedirectIfAuthenticatedInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isSessionLoading } = useSession();

  useEffect(() => {
    if (isSessionLoading) return;
    if (!isAuthenticated) {
      router.replace(
        `/auth/login?redirect=${searchParams.get("redirect") ?? "/"}`,
      );
      return;
    }
    router.replace(searchParams.get("redirect") ?? "/");
  }, [isAuthenticated, isSessionLoading, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Redirecting you…</p>
      </div>
    </div>
  );
}

export default function RedirectIfAuthenticated() {
  return (
    <Suspense>
      <RedirectIfAuthenticatedInner />
    </Suspense>
  );
}
