"use client";

import { setDynamicHeaderProvider } from "@repo/services/web";

import { getAuthToken } from "@/services/auth-utils";

let registered = false;

export function registerApiAuth() {
  if (registered) return;
  registered = true;

  setDynamicHeaderProvider((): Record<string, string> => {
    const token = getAuthToken();
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  });
}
