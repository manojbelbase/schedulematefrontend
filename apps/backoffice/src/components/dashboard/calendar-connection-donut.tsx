"use client";

import { CalendarDays } from "lucide-react";

import { DonutChartCard } from "@ui/components/ui/donut-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function CalendarConnectionDonut({
  stats,
}: {
  stats?: UsersDashboardData;
}) {
  const connected = stats?.googleCalendarConnected ?? 0;
  const notConnected = stats?.googleCalendarNotConnected ?? 0;

  return (
    <DonutChartCard
      icon={CalendarDays}
      title="Google Calendar"
      description="Users with a connected calendar"
      centerLabel="connected"
      centerValue={connected}
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
