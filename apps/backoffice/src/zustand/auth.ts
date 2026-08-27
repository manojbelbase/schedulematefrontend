"use client";

import { create } from "zustand";

import type { PublicUser } from "@repo/services/backoffice";

import { clearAuthCookies, setAuthCookies } from "@/services/auth.client";

type AuthState = {
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: PublicUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => {
    if (token) {
      setAuthCookies(token);
    }
    set({ token });
  },

  logout: async () => {
    clearAuthCookies();
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    window.location.href = "/auth/login";
  },
}));
