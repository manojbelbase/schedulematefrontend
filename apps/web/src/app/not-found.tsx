import Link from "next/link";

import { Button } from "@ui/components/ui/button";

import Logo from "@/components/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <Link href="/" aria-label="scheduleGPT home">
        <Logo />
      </Link>

      <h1 className="mt-8 font-display bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-8xl">
        404
      </h1>
      <p className="mt-4 text-lg font-medium text-foreground">Page not found</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for doesn&apos;t exist or may have been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Go to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/auth/login">Sign in</Link>
        </Button>
      </div>
    </main>
  );
}
