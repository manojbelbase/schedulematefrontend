"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import { fetchAuthControllerLogout } from "@repo/services/web";

import { useAuthStore } from "@/zustand/auth";

function LogoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);

  const redirect = searchParams.get("redirect") ?? "/auth/login";

  const logout = useCallback(async () => {
    try {
      await fetchAuthControllerLogout({});
    } catch {
      /* ignore network errors, redirect anyway */
    } finally {
      useAuthStore.getState().logout();
      router.replace(redirect);
    }
  }, [redirect, router]);

  useEffect(() => {
    if (!done) {
      setDone(true);
      void logout();
    }
  }, [done, logout]);

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
  const [inProgress, setInProgress] = useState(false);

  return useCallback(async () => {
    if (inProgress) return;
    setInProgress(true);
    try {
      await fetchAuthControllerLogout({});
    } catch {
      /* ignore network errors, redirect anyway */
    } finally {
      useAuthStore.getState().logout();
      router.replace(redirect);
    }
  }, [inProgress, redirect, router]);
}
