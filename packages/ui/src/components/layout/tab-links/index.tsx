"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

export type TTabs = {
  label: string;
  component?: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & (
  | { href: string }
  | {
      value: string;
      onClick: (value: string) => void;
      defaultSelected?: boolean;
    }
);

export type TTabLinksProps = {
  id: string;
  variant?: "default" | "form-select";
  tabs: TTabs[];
  disabled?: boolean;
  containerClassName?: string;
  highlightClassName?: string;
  matchQueries?: boolean;
};

export default function TabLinks({
  id,
  variant = "default",
  tabs,
  disabled,
  containerClassName,
  highlightClassName,
  matchQueries = false,
}: TTabLinksProps) {
  const defaultSelected = useMemo(
    () => tabs.find((tab) => "defaultSelected" in tab && tab.defaultSelected),
    [tabs],
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = useMemo(
    () => searchParams?.toString() ?? "",
    [searchParams],
  );

  const [active, setActive] = useState<string | undefined>(
    defaultSelected && "value" in defaultSelected
      ? defaultSelected.value
      : undefined,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;

    tabs?.forEach((tab) => {
      if (!("href" in tab)) return;

      const tabUrl = new URL(tab.href, origin);
      const matchesPath = tabUrl.pathname === pathname;

      if (!matchesPath) return;

      if (!matchQueries) {
        setActive(tab.label);
        return;
      }

      // Treat tab queries as filters: the current URL can have extra params but must include these.
      const matchesQueries = Array.from(tabUrl.searchParams.entries()).every(
        ([key, value]) => (searchParams?.getAll(key) ?? []).includes(value),
      );

      if (matchesQueries) {
        setActive(tab.label);
      }
    });
  }, [matchQueries, pathname, searchParams, searchParamsString, tabs]);

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2  rounded-lg p-0.5 bg-card border border-muted w-fit",
        variant === "form-select" && "h-8 border-0 p-0",
        containerClassName,
      )}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tabs.map((tab) => {
        const isDisabled = tab.disabled || disabled;

        return (
          <div key={tab.label} className="relative">
            {active === ("value" in tab ? tab.value : tab.label) && (
              <motion.div
                layoutId={`${id}-tab`}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
                className={cn(
                  "bg-primary text-white! absolute inset-0 rounded-lg z-0",
                  isDisabled && "bg-primary/50",
                  highlightClassName,
                )}
              />
            )}
            {"href" in tab ? (
              <Button
                key={tab.label}
                className={cn(
                  "h-8",
                  active === tab.label &&
                    "text-white hover:bg-transparent disabled:opacity-100",
                  tab.className,
                )}
                variant="ghost"
                disabled={isDisabled}
                asChild
              >
                <Link href={tab.href} prefetch shallow>
                  {tab.label} {tab.component}
                </Link>
              </Button>
            ) : (
              <Button
                key={tab.label}
                className={cn(
                  "h-8",
                  active === tab.value &&
                    "text-white hover:bg-transparent disabled:opacity-100",
                  tab.className,
                )}
                onClick={() => {
                  tab.onClick(tab.value);
                  setActive(tab.value);
                }}
                variant="ghost"
                disabled={isDisabled}
              >
                {tab.label} {tab.component}
              </Button>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
