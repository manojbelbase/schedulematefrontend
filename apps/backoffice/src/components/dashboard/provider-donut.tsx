"use client";

import { useMemo } from "react";
import { Boxes } from "lucide-react";

import { DistributionChartCard } from "@ui/components/ui/distribution-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

const CHART_PALETTE = [
  "#385AD0",
  "#5398FF",
  "#826FED",
  "#7C81F8",
  "#10b981",
  "#f97316",
  "#94A3B8",
];

export function ProviderDonut({ stats }: { stats?: UsersDashboardData }) {
  const entries = useMemo(
    () => Object.entries(stats?.countByProvider ?? {}),
    [stats?.countByProvider],
  );

  const items = useMemo(
    () =>
      entries.map(([provider, count], index) => ({
        id: provider,
        label: provider,
        count,
        color:
          CHART_PALETTE[index % CHART_PALETTE.length] ??
          CHART_PALETTE[0] ??
          "#6b7280",
      })),
    [entries],
  );

  return (
    <DistributionChartCard
      icon={Boxes}
      title="LLM Providers"
      description="Configurations by provider"
      items={items}
    />
  );
}
