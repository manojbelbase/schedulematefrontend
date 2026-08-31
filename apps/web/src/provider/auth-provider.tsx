"use client";

import { useEffect, type ReactNode } from "react";

import {
  fetchAuthControllerRefresh,
  useAuthControllerMe,
} from "@repo/services/web";

import { registerApiAuth } from "@/services/api-auth";
import {
  getAuthToken,
  getRefreshToken,
  setAuthCookies,
} from "@/services/auth-utils";
import { useAuthStore } from "@/zustand/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  const { data, isPending } = useAuthControllerMe(
    {},
    { retry: false, enabled: Boolean(token) },
  );

  useEffect(() => {
    registerApiAuth();
  }, []);

  useEffect(() => {
    if (!token) {
      useAuthStore.setState({ token: getAuthToken() ?? null });
    }
  }, [token]);

  // If there is no access token but a refresh token exists, attempt to restore
  // the session before the app settles on a logged-out state.
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
