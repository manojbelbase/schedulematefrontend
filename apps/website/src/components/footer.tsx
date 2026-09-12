"use client";

import Link from "next/link";

import Logo from "~/components/ui/logo";
import { FOOTER, SITE } from "~/constants/content";

export function Footer() {
  return (
    <footer className="bg-zinc-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              {FOOTER.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
