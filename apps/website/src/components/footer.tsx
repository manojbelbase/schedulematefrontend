"use client";

import { Mail, MessageCircle } from "lucide-react";

import { Button } from "@ui/components/ui/button";

import Logo from "~/components/ui/logo";
import { APP_URL, FOOTER, SITE, WHATSAPP_URL } from "~/constants/content";

const CONTACT_EMAIL = "support@schedulemate.app";

const FOOTER_COLUMNS = [
  { title: "Product", links: FOOTER.product },
  { title: "Legal", links: FOOTER.legal },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.15)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_100%,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(124,58,237,0.12),transparent_70%)]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              {FOOTER.description}
            </p>
            <div className="mt-6">
              <Button
                asChild
                className="h-10 rounded-sm border-0 bg-white text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                  Get Started Free
                </a>
              </Button>
            </div>
          </div>

          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
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
          ))}

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0" />
                  Email us
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500">AI-powered scheduling.</p>
        </div>
      </div>
    </footer>
  );
}
