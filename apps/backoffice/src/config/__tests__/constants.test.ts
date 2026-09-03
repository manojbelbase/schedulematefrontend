import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ALLOWED_FILE_TYPES,
  COOKIE_EXPIRY_DAYS,
  COOKIE_KEYS,
  CSRF_HEADER,
  CURRENCY_SYMBOL,
  MAX_FILE_SIZE_MB,
  OTP_LENGTH,
  OTP_RESEND_SECONDS,
} from "../constants";

describe("COOKIE_KEYS", () => {
  it("has correct auth cookie key", () => {
    expect(COOKIE_KEYS.AUTH_COOKIE_KEY).toBe("scheduledmate_backoffice_token");
  });

  it("has correct refresh cookie key", () => {
    expect(COOKIE_KEYS.REFRESH_COOKIE_KEY).toBe(
      "scheduledmate_backoffice_refresh",
    );
  });
});

describe("constants", () => {
  it("OTP_LENGTH is 5", () => {
    expect(OTP_LENGTH).toBe(5);
  });

  it("OTP_RESEND_SECONDS is 30", () => {
    expect(OTP_RESEND_SECONDS).toBe(30);
  });

  it("CSRF_HEADER is x-csrf-token", () => {
    expect(CSRF_HEADER).toBe("x-csrf-token");
  });

  it("COOKIE_EXPIRY_DAYS is 1296000", () => {
    expect(COOKIE_EXPIRY_DAYS).toBe(1296000);
  });

  it("CURRENCY_SYMBOL is $", () => {
    expect(CURRENCY_SYMBOL).toBe("$");
  });

  it("MAX_FILE_SIZE_MB is 5", () => {
    expect(MAX_FILE_SIZE_MB).toBe(5);
  });

  it("ALLOWED_FILE_TYPES contains expected types", () => {
    expect(ALLOWED_FILE_TYPES).toContain("image/jpeg");
    expect(ALLOWED_FILE_TYPES).toContain("image/png");
    expect(ALLOWED_FILE_TYPES).toContain("application/pdf");
  });
});
