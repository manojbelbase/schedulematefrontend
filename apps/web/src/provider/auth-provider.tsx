"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthControllerMe } from "@repo/services/web";

import { useAuthStore } from "@/zustand/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isPending } = useAuthControllerMe(
    {},
    { retry: false, enabled: isAuthenticated },
  );

  // The session cookie is httpOnly, so JavaScript cannot read it. Attempt a
  // silent refresh on mount: if the browser holds a refresh cookie the route
  // re-issues the pair, otherwise it answers 401 and we settle logged-out.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/refresh", { method: "POST" })
      .then((res) => {
        if (cancelled) return;
        useAuthStore.setState({
          isAuthenticated: res.ok,
          isLoading: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      useAuthStore.setState({
        user: null,
        isLoading: false,
      });
      return;
    }
    if (data) {
      useAuthStore.setState({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } else if (!isPending) {
      useAuthStore.setState({ isLoading: false });
    }
  }, [data, isPending, isAuthenticated]);

  return children;
}
