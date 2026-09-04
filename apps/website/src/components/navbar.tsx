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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-sm text-zinc-500 hover:text-zinc-900 h-9 px-4"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90 border-0 h-9 px-4 text-sm font-medium rounded-full"
          >
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center text-zinc-500 hover:text-zinc-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white px-4 pb-4 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
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
                className="w-full border-zinc-200 text-sm h-9"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="w-full bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90 border-0 h-9 text-sm rounded-full"
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
