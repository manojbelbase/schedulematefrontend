import { env } from "./env";

export const COOKIE_KEYS = {
  AUTH_COOKIE_KEY:
    env.NEXT_PUBLIC_SCHEDULEMATE_AUTH_TOKEN_KEY || "schedulemate-token",
  REFRESH_COOKIE_KEY: "schedulemate_refresh",
} as const;

export const AUTH_COOKIE_DAYS = 7;

export const REFRESH_COOKIE_DAYS = 15;
