import { env } from "@/config/env";

export const webApiBaseUrl =
  env.NEXT_PUBLIC_WEB_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const googleAuthUrl = (redirect: string) =>
  `${webApiBaseUrl}/api/auth/google?redirect=${encodeURIComponent(redirect)}`;

export const googleConnectUrl = (redirect: string) =>
  `${webApiBaseUrl}/api/google/connect?redirect=${encodeURIComponent(redirect)}`;
