"use client";

import { useEffect, type ReactNode } from "react";

import {
  fetchAuthControllerRefresh,
  useBackofficeAuthControllerMe,
} from "@repo/services/backoffice";

import { registerApiAuth } from "@/services/api-auth";
import {
  getAuthToken,
  getRefreshToken,
  setAuthCookies,
} from "@/services/auth.client";
import { useAuthStore } from "@/zustand/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  registerApiAuth();

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
      .then((data) => {
        if (cancelled) return;
        const refreshed = data?.data?.accessToken;
        if (refreshed) {
          setAuthCookies(refreshed, data.data.refreshToken);
          useAuthStore.setState({
            token: refreshed,
            isAuthenticated: true,
            isLoading: false,
          });
          if (window.location.pathname === "/login") {
            window.location.assign("/");
          }
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
