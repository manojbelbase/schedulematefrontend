"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { cn } from "@ui/lib/utils";

type StatItem = {
  label: string;
  value: string | number;
  className?: string;
};

type OverviewCardProps = {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  iconContainerClassName?: string;
  description?: string;
  info?: string;
  className?: string;
  wrapperContainerClassname?: string;
  onClick?: () => void;
  footer?: ReactNode;
  gradientClassName?: string;
  subtitle?: string;
  stats?: StatItem[];
};

export function OverviewCard({
  title,
  value,
  icon,
  iconContainerClassName,
  description,
  info,
  className,
  wrapperContainerClassname,
  onClick,
  footer,
  gradientClassName,
  subtitle,
  stats,
}: OverviewCardProps) {
  const hasStats = stats && stats.length > 0;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative w-full overflow-hidden rounded-sm border border-border",
            hasStats ? "bg-card" : "bg-gradient-to-br",
            !hasStats &&
              (gradientClassName ??
                "from-primary/10 via-background to-background"),
            onClick && "cursor-pointer",
            wrapperContainerClassname,
          )}
          onClick={onClick}
        >
          {hasStats ? (
            <div
              className={cn(
                "flex h-full flex-col overflow-hidden p-4 transition-all ease-in-out",
                className,
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {icon && (
                    <span
                      className={cn(
                        "inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-subtle [&_svg]:size-3.5",
                        iconContainerClassName,
                      )}
                    >
                      {icon}
                    </span>
                  )}
                  <h6 className="text-sm font-medium text-heading">{title}</h6>
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold text-heading tabular-nums">
                    {value}
                  </h1>
                  {subtitle && (
                    <span className="text-sm text-muted-foreground">
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-3 h-px bg-border" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn("flex flex-col", stat.className)}
                  >
                    <span className="text-lg font-semibold text-heading tabular-nums">
                      {typeof stat.value === "number"
                        ? stat.value.toLocaleString()
                        : stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "flex h-full flex-col gap-2 overflow-hidden p-3 transition-all ease-in-out",
                className,
              )}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-subtle [&_svg]:size-3",
                      iconContainerClassName,
                    )}
                  >
                    {icon}
                  </span>
                  <h6 className="truncate text-xs font-medium text-heading">
                    {title}
                  </h6>
                </div>
                {info || description ? (
                  <Info className="size-3.5 shrink-0 text-subtle" />
                ) : null}
              </div>
              <div className="mt-auto flex items-end justify-between gap-2">
                <h1 className="truncate text-2xl leading-none font-semibold tracking-tight text-heading tabular-nums">
                  {value}
                </h1>
                {footer}
              </div>
            </div>
          )}
        </div>
      </TooltipTrigger>
      {info || description ? (
        <TooltipContent
          className="max-w-xs bg-background text-foreground p-3 mt-1"
          side="bottom"
          arrow={false}
        >
          <div className="flex flex-col gap-1 text-xs">
            {description ? (
              <p className="font-medium text-heading">{description}</p>
            ) : null}
            {info ? <p className="text-subtle">{info}</p> : null}
          </div>
        </TooltipContent>
      ) : null}
    </Tooltip>
  );
}
