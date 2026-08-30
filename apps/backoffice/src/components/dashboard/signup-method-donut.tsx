"use client";

import { UserPlus } from "lucide-react";

import { DonutChartCard } from "@ui/components/ui/donut-chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function SignupMethodDonut({ stats }: { stats?: UsersDashboardData }) {
  const emailUsers = stats?.emailUsers ?? 0;
  const googleUsers = stats?.googleUsers ?? 0;

  return (
    <DonutChartCard
      icon={UserPlus}
      title="Signups"
      description="Accounts by signup method"
      centerLabel="users"
      items={[
        {
          id: "email",
          label: "Email",
          color: "var(--color-chart-1)",
          value: emailUsers,
        },
        {
          id: "google",
          label: "Google",
          color: "var(--color-chart-2)",
          value: googleUsers,
        },
      ]}
    />
  );
}
