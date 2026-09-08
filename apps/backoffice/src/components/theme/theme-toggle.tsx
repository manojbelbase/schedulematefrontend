"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";

import { Switch } from "@ui/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
    >
      {mounted ? (
        isDark ? (
          <Moon className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <SunMedium className="size-4 shrink-0 text-muted-foreground" />
        )
      ) : (
        <span className="size-4 shrink-0" />
      )}
      <span className="flex-1">Dark mode</span>
      <Switch
        checked={isDark}
        onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
      />
    </div>
  );
}
