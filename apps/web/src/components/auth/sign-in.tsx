"use client";

import { Descope } from "@descope/nextjs-sdk";

export default function SignIn() {
  return (
    <Descope
      flowId="sign-up-or-in"
      redirectAfterSuccess={"/"}
      autoFocus="skipFirstScreen"
    />
  );
}
