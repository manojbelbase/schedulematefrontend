import { cookies } from "next/headers";

import { COOKIE_KEYS } from "@/config/constants";

export async function getServerAuthToken(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_KEYS.AUTH_COOKIE_KEY)?.value;
  return token ?? null;
}
