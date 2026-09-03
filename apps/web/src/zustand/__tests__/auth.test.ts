import { beforeEach, describe, expect, it, vi } from "vitest";

import * as services from "@repo/services/web";

import * as authUtils from "@/services/auth-utils";
import { useAuthStore } from "@/zustand/auth";

vi.mock("@/services/auth-utils", () => ({
  getAuthToken: vi.fn(() => null),
  getRefreshToken: vi.fn(() => null),
  setAuthCookies: vi.fn(),
  clearAuthCookies: vi.fn(),
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has null user", () => {
      expect(useAuthStore.getState().user).toBeNull();
    });

    it("is not authenticated", () => {
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it("is not loading", () => {
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe("login", () => {
    it("sets user and token on successful login", async () => {
      const mockUser = { id: "1", email: "test@test.com", name: "Test" };
      vi.mocked(services.fetchAuthControllerLogin).mockResolvedValue({
        data: {
          accessToken: "access-token",
          refreshToken: "refresh-token",
          user: mockUser,
        },
      } as never);

      await useAuthStore.getState().login({
        email: "test@test.com",
        password: "password",
      });

      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().token).toBe("access-token");
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(authUtils.setAuthCookies).toHaveBeenCalledWith(
        "access-token",
        "refresh-token",
      );
    });
  });

  describe("logout", () => {
    it("clears user, token and auth state", async () => {
      useAuthStore.setState({
        user: { id: "1", email: "test@test.com", name: "Test" },
        token: "token",
        isAuthenticated: true,
      });

      await useAuthStore.getState().logout();

      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(authUtils.clearAuthCookies).toHaveBeenCalled();
    });
  });

  describe("register", () => {
    it("sets user and token on successful registration", async () => {
      const mockUser = { id: "2", email: "new@test.com", name: "New" };
      vi.mocked(services.fetchAuthControllerRegister).mockResolvedValue({
        data: {
          accessToken: "new-access",
          refreshToken: "new-refresh",
          user: mockUser,
        },
      } as never);

      await useAuthStore.getState().register({
        email: "new@test.com",
        name: "New",
        password: "password123",
      });

      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });
});
