import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/zustand/auth";

const fetchMock = vi.fn();

function mockFetchOnce(status: number, body?: unknown) {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body ?? null), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

describe("useAuthStore", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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
    it("sets user and authenticated state on success", async () => {
      const mockUser = { id: "1", email: "test@test.com", name: "Test" };
      mockFetchOnce(200, { data: { user: mockUser } });

      await useAuthStore.getState().login({
        email: "test@test.com",
        password: "password",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        "/api/auth/login",
        expect.objectContaining({ method: "POST" }),
      );
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    it("throws and stays logged out on failure", async () => {
      mockFetchOnce(401, { message: "Invalid credentials" });
      useAuthStore.setState({ isAuthenticated: true });

      await expect(
        useAuthStore.getState().login({
          email: "test@test.com",
          password: "wrong",
        }),
      ).rejects.toThrow("Invalid credentials");

      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe("register", () => {
    it("sets user and authenticated state on success", async () => {
      const mockUser = { id: "2", email: "new@test.com", name: "New" };
      mockFetchOnce(200, { data: { user: mockUser } });

      await useAuthStore.getState().register({
        email: "new@test.com",
        name: "New",
        password: "password123",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        "/api/auth/register",
        expect.objectContaining({ method: "POST" }),
      );
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });

  describe("logout", () => {
    it("clears user and auth state", async () => {
      mockFetchOnce(200, { success: true });
      useAuthStore.setState({
        user: { id: "1", email: "test@test.com", name: "Test" },
        isAuthenticated: true,
      });

      await useAuthStore.getState().logout();

      expect(fetchMock).toHaveBeenCalledWith("/api/auth/logout", {
        method: "POST",
      });
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it("still clears state if the logout request fails", async () => {
      mockFetchOnce(500, { message: "Upstream down" });
      useAuthStore.setState({
        user: { id: "1", email: "test@test.com", name: "Test" },
        isAuthenticated: true,
      });

      await useAuthStore.getState().logout();

      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });
});
