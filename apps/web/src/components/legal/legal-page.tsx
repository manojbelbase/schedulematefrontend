import Link from "next/link";

export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6 sm:p-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: {lastUpdated}
        </p>
      </header>
      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        {children}
      </div>
      <footer className="mt-8 flex items-center justify-center gap-4 text-muted-foreground text-xs">
        <Link href="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
      </footer>
    </main>
  );
}
