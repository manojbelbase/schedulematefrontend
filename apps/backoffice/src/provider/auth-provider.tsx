"use client";

import { useEffect, type ReactNode } from "react";

import {
  fetchAuthControllerRefresh,
  useBackofficeAuthControllerMe,
} from "@repo/services/backoffice";

import { getAuthToken, getRefreshToken } from "@/services/auth.client";
import { useAuthStore } from "@/zustand/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  const { data, isPending } = useBackofficeAuthControllerMe(
    {},
    { retry: false, enabled: Boolean(token) },
  );

  useEffect(() => {
    if (!token) {
      useAuthStore.setState({ token: getAuthToken() ?? null });
    }
  }, [token]);

  useEffect(() => {
    const hasToken = token ?? getAuthToken();
    const hasRefresh = Boolean(getRefreshToken());
    if (hasToken || !hasRefresh) return;

    let cancelled = false;
    fetchAuthControllerRefresh({})
      .then(() => {
        if (cancelled) return;
        const restoredToken = getAuthToken();
        if (restoredToken) {
          useAuthStore.setState({
            token: restoredToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          useAuthStore.setState({ isLoading: false });
        }
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
  }, [token]);

  useEffect(() => {
    if (!token) {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
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
  }, [data, isPending, token]);

  return children;
}
