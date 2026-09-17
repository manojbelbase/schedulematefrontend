"use client";

import { Activity, MessagesSquare, User, Users } from "lucide-react";

import { OverviewCard } from "@ui/components/ui/overview-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

const cardItems = [
  {
    id: "total-users",
    label: "Total Users",
    icon: <Users />,
    info: "Total registered users in the selected period",
  },
  {
    id: "api-requests-used",
    label: "API Requests Used",
    icon: <Activity />,
    info: "Total API requests consumed in the selected period",
  },
  {
    id: "total-messages",
    label: "Total Messages",
    icon: <MessagesSquare />,
    info: "Total chat messages in the selected period",
  },
  {
    id: "total-conversations",
    label: "Total Conversations",
    icon: <User />,
    info: "Total chat conversations in the selected period",
  },
] as const;

export function StatCards({ stats }: { stats?: UsersDashboardData }) {
  const totalUsers = stats
    ? Object.values(stats.countByRole).reduce((sum, count) => sum + count, 0)
    : 0;

  const values: Record<(typeof cardItems)[number]["id"], number> = {
    "total-users": totalUsers,
    "api-requests-used": stats?.totalApiRequestsUsed ?? 0,
    "total-messages": stats?.totalChatMessages ?? 0,
    "total-conversations": stats?.totalChatConversations ?? 0,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {cardItems.map((item) => (
        <OverviewCard
          key={item.id}
          title={item.label}
          value={values[item.id].toLocaleString()}
          icon={item.icon}
          info={item.info}
          wrapperContainerClassname="max-w-full"
          className="w-full"
        />
      ))}
    </div>
  );
}
