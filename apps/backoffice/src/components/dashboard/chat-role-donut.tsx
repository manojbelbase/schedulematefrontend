"use client";

import { MessagesSquare } from "lucide-react";

import { DonutChartCard } from "@ui/components/ui/donut-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function ChatRoleDonut({ stats }: { stats?: UsersDashboardData }) {
  const byRole = stats?.chatMessagesByRole ?? {};

  return (
    <DonutChartCard
      icon={MessagesSquare}
      title="Messages"
      description="User vs assistant messages"
      centerLabel="messages"
      items={[
        {
          id: "user",
          label: "User messages",
          color: "var(--color-chart-1)",
          value: byRole.user ?? 0,
        },
        {
          id: "assistant",
          label: "Assistant messages",
          color: "var(--color-chart-3)",
          value: byRole.assistant ?? 0,
        },
      ]}
    />
  );
}
