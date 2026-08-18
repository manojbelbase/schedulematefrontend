"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthControllerMe } from "@repo/services/web";

import { getAuthToken } from "@/services/auth-utils";
import { useAuthStore } from "@/zustand/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  const { data, isPending } = useAuthControllerMe(
    {},
    { retry: false, enabled: Boolean(token) },
  );

  useEffect(() => {
    if (!token) {
      useAuthStore.setState({ token: getAuthToken() ?? null });
    }
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
