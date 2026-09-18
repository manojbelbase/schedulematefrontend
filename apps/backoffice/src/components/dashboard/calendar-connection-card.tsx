"use client";

import { CalendarDays } from "lucide-react";

import { StackedBarCard } from "@ui/components/ui/stacked-bar-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function CalendarConnectionCard({
  stats,
}: {
  stats?: UsersDashboardData;
}) {
  const connected = stats?.googleCalendarConnected ?? 0;
  const notConnected = stats?.googleCalendarNotConnected ?? 0;
  const total = connected + notConnected;

  return (
    <StackedBarCard
      icon={CalendarDays}
      title="Google Calendar"
      description="Users with a connected calendar"
      headlineValue={connected}
      headlineLabel={
        total > 0
          ? `connected (${((connected / total) * 100).toFixed(1)}%)`
          : "connected"
      }
      items={[
        {
          id: "connected",
          label: "Connected",
          color: "var(--color-chart-2)",
          value: connected,
        },
        {
          id: "notConnected",
          label: "Not connected",
          color: "var(--color-chart-4)",
          value: notConnected,
        },
      ]}
    />
  );
}
