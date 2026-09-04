import { describe, expect, it } from "vitest";

import {
  AUTH_COOKIE_DAYS,
  COOKIE_KEYS,
  REFRESH_COOKIE_DAYS,
} from "@/config/constants";

describe("COOKIE_KEYS", () => {
  it("has correct auth cookie key", () => {
    expect(COOKIE_KEYS.AUTH_COOKIE_KEY).toBe("schedulegpt-token");
  });

  it("has correct refresh cookie key", () => {
    expect(COOKIE_KEYS.REFRESH_COOKIE_KEY).toBe("schedulegpt_refresh");
  });
});

describe("Cookie expiry durations", () => {
  it("AUTH_COOKIE_DAYS is 7", () => {
    expect(AUTH_COOKIE_DAYS).toBe(7);
  });

  it("REFRESH_COOKIE_DAYS is 15", () => {
    expect(REFRESH_COOKIE_DAYS).toBe(15);
  });
});
