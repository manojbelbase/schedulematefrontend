import { endOfDay, startOfDay, subDays } from "date-fns";

export const DASHBOARD_DEFAULT_PRESET = "last-30" as const;

export type DashboardInterval = "hour" | "day" | "week" | "month";

export type DashboardRange = { from: Date; to: Date };

export function getDefaultRange(today = new Date()): DashboardRange {
  return { from: startOfDay(subDays(today, 29)), to: endOfDay(today) };
}

export function parseRange(params: {
  dateFrom?: string;
  dateTo?: string;
}): DashboardRange | undefined {
  if (!params.dateFrom || !params.dateTo) return undefined;

  const from = new Date(params.dateFrom);
  const to = new Date(params.dateTo);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return undefined;
  }

  return { from, to };
}

export function getInterval(from: Date, to: Date): DashboardInterval {
  const days = (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);

  if (days <= 3) return "hour";
  if (days <= 95) return "day";
  if (days <= 420) return "week";
  return "month";
}
