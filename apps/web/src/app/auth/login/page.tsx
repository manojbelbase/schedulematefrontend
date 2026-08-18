import { Suspense } from "react";

import SignIn from "@/components/auth/sign-in";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 sm:p-12">
      <div
        aria-hidden
        className="bg-[radial-gradient(circle,rgba(147,51,234,0.12)_1px,transparent_1px)] absolute inset-0 bg-[size:24px_24px]"
      />
      <div
        aria-hidden
        className="from-purple-500/20 via-transparent to-fuchsia-500/20 absolute -top-40 -right-40 size-[30rem] rounded-full bg-gradient-to-br blur-3xl"
      />
      <div
        aria-hidden
        className="from-violet-500/15 to-transparent absolute -bottom-40 -left-40 size-[26rem] rounded-full bg-gradient-to-tr blur-3xl"
      />

      <div className="relative flex w-full flex-col items-center space-y-4">
        <div className="w-full max-w-lg rounded-2xl border bg-background/80 p-8 shadow-2xl shadow-purple-950/10 backdrop-blur sm:p-10">
          <Logo className="mb-4" />
          <p className="mt-2  text-center text-sm font-medium">
            Sign in to your account to continue.
          </p>
          <Suspense>
            <SignIn />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
