"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { cn } from "@ui/lib/utils";

export type TColorVariant =
  "violet" | "emerald" | "purple" | "rose" | "teal" | "amber";

type OverviewCardProps = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  colorVariant?: TColorVariant;
  iconContainerClassName?: string;
  description?: string;
  info?: string;
  className?: string;
  wrapperContainerClassname?: string;
  onClick?: () => void;
};

const colorVariants: Record<
  TColorVariant,
  { icon: string; base: string; overlay: string; isActive: string }
> = {
  violet: {
    base: "group-hover:from-violet-50 group-hover:to-white dark:group-hover:from-violet-950 dark:group-hover:to-background",
    overlay:
      "group-hover:from-violet-200/60 dark:group-hover:from-violet-800/40",
    icon: "text-white bg-violet-600",
    isActive: "ring-1 !ring-violet-600",
  },
  emerald: {
    base: "group-hover:from-emerald-50 group-hover:to-white dark:group-hover:from-emerald-950 dark:group-hover:to-background",
    overlay:
      "group-hover:from-emerald-200/60 dark:group-hover:from-emerald-800/40",
    icon: "text-white bg-emerald-600",
    isActive: "ring-1 !ring-emerald-600",
  },
  purple: {
    base: "group-hover:from-purple-50 group-hover:to-white dark:group-hover:from-purple-950 dark:group-hover:to-background",
    overlay:
      "group-hover:from-purple-200/60 dark:group-hover:from-purple-800/40",
    icon: "text-white bg-purple-600",
    isActive: "ring-1 !ring-purple-600",
  },
  rose: {
    base: "group-hover:from-rose-50 group-hover:to-white dark:group-hover:from-rose-950 dark:group-hover:to-background",
    overlay: "group-hover:from-rose-200/60 dark:group-hover:from-rose-800/40",
    icon: "text-white bg-rose-600",
    isActive: "ring-1 !ring-rose-600",
  },
  teal: {
    base: "group-hover:from-teal-50 group-hover:to-white dark:group-hover:from-teal-950 dark:group-hover:to-background",
    overlay: "group-hover:from-teal-200/60 dark:group-hover:from-teal-800/40",
    icon: "text-white bg-teal-600",
    isActive: "ring-1 !ring-teal-600",
  },
  amber: {
    base: "group-hover:from-amber-50 group-hover:to-white dark:group-hover:from-amber-950 dark:group-hover:to-background",
    overlay: "group-hover:from-amber-200/60 dark:group-hover:from-amber-800/40",
    icon: "text-white bg-amber-500",
    isActive: "ring-1 !ring-amber-600",
  },
};

export function OverviewCard({
  title,
  value,
  icon,
  colorVariant = "violet",
  iconContainerClassName,
  description,
  info,
  className,
  wrapperContainerClassname,
  onClick,
}: OverviewCardProps) {
  const color = colorVariants[colorVariant];

  return (
    <div
      className={cn(
        "max-w-[270px] w-full group relative rounded-sm p-px bg-gradient-to-br cursor-pointer dark:bg-background",
        color?.isActive,
        wrapperContainerClassname,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "overflow-hidden group relative transition-all ease-in-out rounded-sm p-3.5 flex flex-col gap-3 bg-gradient-to-br from-transparent to-transparent h-full",
          className,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            color?.overlay,
          )}
        >
          <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br to-transparent" />
        </div>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex size-5 items-center justify-center rounded-sm ring-1 ring-black/5 [&_svg]:size-3",
                color?.icon,
                iconContainerClassName,
              )}
            >
              {icon}
            </span>
            <h6 className="font-medium text-gray-700 dark:text-white flex-shrink-0 truncate text-xs">
              {title}
            </h6>
          </div>
          {info ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center"
                  aria-label={title}
                >
                  <Info size={12} className="text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between truncate">
            <h1
              className={cn("text-lg font-semibold truncate line-clamp-1")}
              title={typeof value === "string" ? value : undefined}
            >
              {value}
            </h1>
          </div>
        </div>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
