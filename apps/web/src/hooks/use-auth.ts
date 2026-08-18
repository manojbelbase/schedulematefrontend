"use client";

import type { PublicUser } from "@repo/services/web";

import { useAuthStore } from "@/zustand/auth";

type UseAuthResult = {
  user: PublicUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export function useAuth(): UseAuthResult {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  return { user, isAuthenticated, isLoading };
}
