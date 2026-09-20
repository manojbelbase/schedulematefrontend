"use client";

import { Activity, MessagesSquare, User, Users } from "lucide-react";

import { OverviewCard } from "@ui/components/ui/overview-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

import {
  computeChange,
  MetricTrend,
  sumRoles,
} from "@/components/dashboard/metric-trend";

type CardId =
  | "total-users"
  | "api-requests-used"
  | "total-messages"
  | "total-conversations";

const cardItems = [
  {
    id: "total-users",
    label: "Total Users",
    description: "Registered accounts",
    icon: <Users />,
    info: "Total registered users in the selected period",
    accentClassName:
      "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary",
  },
  {
    id: "api-requests-used",
    label: "API Requests Used",
    description: "Requests against the limit",
    icon: <Activity />,
    info: "Total API requests consumed in the selected period",
    accentClassName:
      "bg-chart-2/15 text-chart-2 dark:bg-chart-2/20 dark:text-chart-2",
  },
  {
    id: "total-messages",
    label: "Total Messages",
    description: "Chat messages exchanged",
    icon: <MessagesSquare />,
    info: "Total chat messages in the selected period",
    accentClassName:
      "bg-status-success/15 text-status-success dark:bg-status-success/20 dark:text-status-success",
  },
  {
    id: "total-conversations",
    label: "Total Conversations",
    description: "Chat sessions started",
    icon: <User />,
    info: "Total chat conversations in the selected period",
    accentClassName:
      "bg-status-warning/15 text-status-warning dark:bg-status-warning/20 dark:text-status-warning",
  },
] as const;

export function StatCards({
  stats,
  previousStats,
}: {
  stats?: UsersDashboardData;
  previousStats?: UsersDashboardData;
}) {
  const values: Record<CardId, number> = {
    "total-users": sumRoles(stats),
    "api-requests-used": stats?.totalApiRequestsUsed ?? 0,
    "total-messages": stats?.totalChatMessages ?? 0,
    "total-conversations": stats?.totalChatConversations ?? 0,
  };

  const previousValues: Record<CardId, number> = {
    "total-users": sumRoles(previousStats),
    "api-requests-used": previousStats?.totalApiRequestsUsed ?? 0,
    "total-messages": previousStats?.totalChatMessages ?? 0,
    "total-conversations": previousStats?.totalChatConversations ?? 0,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {cardItems.map((item) => (
        <OverviewCard
          key={item.id}
          title={item.label}
          value={values[item.id].toLocaleString()}
          description={item.description}
          icon={item.icon}
          iconContainerClassName={item.accentClassName}
          info={item.info}
          footer={
            <MetricTrend
              change={computeChange(values[item.id], previousValues[item.id])}
            />
          }
          wrapperContainerClassname="max-w-full"
          className="w-full"
        />
      ))}
    </div>
  );
}
