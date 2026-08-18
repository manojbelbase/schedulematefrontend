export const COOKIE_KEYS = {
  AUTH_COOKIE_KEY: "scheduledmate-token",
  WORKSPACE_ID_COOKIE_KEY: "x-workspace-id",
  CSRF_TOKEN_KEY: "scheduledmate-csrf-token",
  SIDEBAR_OPEN_COOKIE_KEY: "sidebar_state",
};

export const DESCOPE_COOKIE_CONFIG = {
  cookieName: COOKIE_KEYS.AUTH_COOKIE_KEY,
  sameSite: "Lax" as const,
  secure: true,
};
export const OTP_LENGTH = 5;
export const OTP_RESEND_SECONDS = 30;

export const CSRF_HEADER = "x-csrf-token";

export const COOKIE_EXPIRY_DAYS = 60 * 60 * 24 * 15;

export const CURRENCY_SYMBOL = "$";

export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];
