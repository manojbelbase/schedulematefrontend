"use client";

import { useMemo } from "react";
import { MessagesSquare } from "lucide-react";

import { DistributionChartCard } from "@ui/components/ui/distribution-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function ChatRoleChart({
  stats,
  className,
}: {
  stats?: UsersDashboardData;
  className?: string;
}) {
  const byRole = stats?.chatMessagesByRole ?? {};

  const items = useMemo(
    () => [
      {
        id: "user",
        label: "User",
        color: "var(--color-chart-1)",
        count: byRole.user ?? 0,
      },
      {
        id: "assistant",
        label: "Assistant",
        color: "var(--color-chart-3)",
        count: byRole.assistant ?? 0,
      },
    ],
    [byRole.user, byRole.assistant],
  );

  return (
    <DistributionChartCard
      icon={MessagesSquare}
      title="Messages"
      description="User vs assistant messages"
      defaultChartType="bar-horizontal"
      items={items}
      className={className}
    />
  );
}
