"use client";

import { useMemo } from "react";
import { Users } from "lucide-react";

import { DonutChartCard } from "@ui/components/ui/donut-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

const CHART_PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function UsersByRoleChart({ stats }: { stats?: UsersDashboardData }) {
  const items = useMemo(
    () =>
      Object.entries(stats?.countByRole ?? {}).map(([role, count], index) => ({
        id: role,
        label: role,
        color:
          CHART_PALETTE[index % CHART_PALETTE.length] ??
          CHART_PALETTE[0] ??
          "var(--color-chart-1)",
        value: count,
      })),
    [stats?.countByRole],
  );

  return (
    <DonutChartCard
      icon={Users}
      title="Users by Role"
      description="Registered users grouped by role"
      centerLabel="users"
      items={items}
    />
  );
}
