"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

import Logo from "~/components/ui/logo";
import { APP_URL, NAV_LINKS } from "~/constants/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled && "px-4 py-3 sm:px-6 lg:px-8",
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-300",
            scrolled
              ? "max-w-6xl rounded-full border border-zinc-200/70 bg-white/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md"
              : "max-w-none border-b border-zinc-200/70 bg-white/85 backdrop-blur-md",
          )}
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

            <div className="hidden items-center md:flex">
              <Button
                size="sm"
                asChild
                className="h-9 rounded-sm border-0 bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>

            <button
              className="flex size-10 items-center justify-center text-zinc-600 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-zinc-200/70 bg-white/95 p-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2">
                <Button
                  size="sm"
                  asChild
                  className="h-10 w-full rounded-full border-0 bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
