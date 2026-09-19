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
    gradientClassName: "from-violet-500/15 via-background to-background",
    accentClassName:
      "bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  },
  {
    id: "api-requests-used",
    label: "API Requests Used",
    description: "Requests against the limit",
    icon: <Activity />,
    info: "Total API requests consumed in the selected period",
    gradientClassName: "from-sky-500/15 via-background to-background",
    accentClassName:
      "bg-sky-500/15 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
  },
  {
    id: "total-messages",
    label: "Total Messages",
    description: "Chat messages exchanged",
    icon: <MessagesSquare />,
    info: "Total chat messages in the selected period",
    gradientClassName: "from-emerald-500/15 via-background to-background",
    accentClassName:
      "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  {
    id: "total-conversations",
    label: "Total Conversations",
    description: "Chat sessions started",
    icon: <User />,
    info: "Total chat conversations in the selected period",
    gradientClassName: "from-amber-500/15 via-background to-background",
    accentClassName:
      "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
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
          gradientClassName={item.gradientClassName}
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
