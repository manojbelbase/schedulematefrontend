"use client";

import { create } from "zustand";

import {
  fetchAuthControllerForgotPassword,
  fetchAuthControllerMe,
  fetchAuthControllerResetPassword,
  fetchAuthControllerVerifyOtp,
  type PublicUser,
} from "@repo/services/web";

type AuthState = {
  user: PublicUser | null;
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
  forgotPassword: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (
    email: string,
    otp: string,
    newPassword: string,
  ) => Promise<void>;
};

async function postAuth(
  path: string,
  body: unknown,
): Promise<{ user: PublicUser; accessToken?: string; refreshToken?: string }> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await res.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    data?: { user: PublicUser; accessToken?: string; refreshToken?: string };
  } | null;

  if (!res.ok || !payload?.data) {
    throw new Error(
      payload?.message ?? "Something went wrong. Please try again.",
    );
  }

  return payload.data;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async ({ email, password }) => {
    try {
      const data = await postAuth("/api/auth/login", { email, password });
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  register: async ({ email, name, password }) => {
    try {
      const data = await postAuth("/api/auth/register", {
        email,
        name,
        password,
      });
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  refreshProfile: async () => {
    try {
      const data = await fetchAuthControllerMe({});
      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    await fetchAuthControllerForgotPassword({ body: { email } });
  },

  verifyOtp: async (email, otp) => {
    await fetchAuthControllerVerifyOtp({ body: { email, otp } });
  },

  resetPassword: async (email, otp, newPassword) => {
    await fetchAuthControllerResetPassword({
      body: { email, otp, newPassword },
    });
  },
}));
