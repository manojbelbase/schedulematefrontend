"use client";

import { create } from "zustand";

import {
  fetchAuthControllerLogin,
  fetchAuthControllerMe,
  fetchAuthControllerRegister,
  type PublicUser,
} from "@repo/services/web";

import {
  clearAuthCookies,
  getAuthToken,
  setAuthCookies,
} from "@/services/auth-utils";

type AuthState = {
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    name?: string;
    password: string;
  }) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async ({ email, password }) => {
    const data = await fetchAuthControllerLogin({ body: { email, password } });
    setAuthCookies(data.data.accessToken, data.data.refreshToken);
    set({
      token: data.data.accessToken,
      user: data.data.user,
      isAuthenticated: true,
    });
  },

  register: async ({ email, name, password }) => {
    const data = await fetchAuthControllerRegister({
      body: { email, name, password },
    });
    setAuthCookies(data.data.accessToken, data.data.refreshToken);
    set({
      token: data.data.accessToken,
      user: data.data.user,
      isAuthenticated: true,
    });
  },

  refreshProfile: async () => {
    const token = get().token ?? getAuthToken();
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }
    try {
      const data = await fetchAuthControllerMe({});
      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },

  logout: async () => {
    clearAuthCookies();
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
