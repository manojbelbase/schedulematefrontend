import { NextResponse } from "next/server";

import { fetchAuthControllerRegister } from "@repo/services/web";

import { getErrorMessage, setAuthCookies } from "../_utils";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    name?: string;
    password?: string;
  } | null;

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const data = await fetchAuthControllerRegister({
      body: { email: body.email, name: body.name, password: body.password },
    });

    await setAuthCookies(data.data.accessToken, data.data.refreshToken);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) },
      { status: 401 },
    );
  }
}
