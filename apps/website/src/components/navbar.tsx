"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@ui/components/ui/button";

import Logo from "~/components/ui/logo";
import { NAV_LINKS } from "~/constants/content";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="ScheduleMate AI — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-9 px-4 text-sm text-zinc-600 hover:text-zinc-900"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="h-9 rounded-lg border-0 bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
          >
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center text-zinc-600 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200/70 bg-white px-4 pb-4 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 w-full rounded-lg border-zinc-200 text-sm text-zinc-700"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="h-9 w-full rounded-lg border-0 bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
