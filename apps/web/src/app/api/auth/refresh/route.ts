import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { fetchAuthControllerRefresh } from "@repo/services/web";

import { COOKIE_KEYS } from "@/config/constants";

import { setAuthCookies } from "../_utils";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "No refresh token found." },
      { status: 401 },
    );
  }

  try {
    const data = await fetchAuthControllerRefresh({});

    await setAuthCookies(data.data.accessToken, data.data.refreshToken);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Session expired." },
      { status: 401 },
    );
  }
}
