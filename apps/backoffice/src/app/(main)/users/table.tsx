"use client";

import { Activity, ShieldCheck, User, Users } from "lucide-react";
import type { SearchParams } from "nuqs";

import DataTable from "@ui/components/data-table";
import { withDefaultPagination } from "@ui/lib/pagination";

import {
  useBackofficeControllerGetUsersDashboard,
  useBackofficeControllerListUsers,
  type BackofficeControllerListUsersQueryParams,
  type BackofficeUserListResponse,
  type UsersDashboardResponse,
} from "@repo/services/backoffice";

import TableRowsLoading from "@/components/loaders/table-rows-loading";

import { USER_COLUMNS, UserRowActions } from "./columns";

export function UsersTable({
  searchParams,
  initialData,
  dashboardInitialData,
}: {
  searchParams: SearchParams;
  initialData: BackofficeUserListResponse;
  dashboardInitialData: UsersDashboardResponse;
}) {
  const params =
    withDefaultPagination<BackofficeControllerListUsersQueryParams>(
      searchParams,
    );
  const queryParams: BackofficeControllerListUsersQueryParams = {
    page: params.page,
    take: params.take,
    query: params.query,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    role: params.role,
  };

  const { data, isLoading } = useBackofficeControllerListUsers(
    { queryParams },
    { placeholderData: initialData },
  );

  const { data: dashboardData } = useBackofficeControllerGetUsersDashboard(
    {},
    { placeholderData: dashboardInitialData },
  );

  const users = data?.data ?? [];
  const stats = dashboardData?.data;

  const totalUsers = stats
    ? Object.values(stats.countByRole).reduce((sum, count) => sum + count, 0)
    : 0;

  const cards = [
    {
      id: "total-users",
      label: "Total Users",
      value: totalUsers,
      icon: <Users className="size-5" />,
    },
    {
      id: "api-requests-used",
      label: "API Requests Used",
      value: stats?.totalApiRequestsUsed ?? 0,
      icon: <Activity className="size-5" />,
    },
    {
      id: "google-users",
      label: "Signed in with Google",
      value: stats?.googleUsers ?? 0,
      icon: <ShieldCheck className="size-5" />,
    },
    {
      id: "usage-ratio",
      label: "API Usage Ratio",
      value:
        stats !== undefined
          ? `${Math.round((stats.usageRatio ?? 0) * 100)}%`
          : "—",
      icon: <User className="size-5" />,
    },
  ];

  return (
    <DataTable
      columns={USER_COLUMNS}
      data={users}
      instanceId="backoffice-users-table"
      pagination={data?.pagination}
      header={{
        sidebarToggle: false,
        title: "Users",
      }}
      cards={{ items: cards }}
      empty={{
        icon: Users,
        description: "Get started by adding your first user.",
      }}
      functions={{
        add: {
          label: "Add User",
          modal: {
            modalID: "ADD_USER",
            type: "MODAL",
          },
        },
        search: {
          param: "query",
          placeholder: "Search users...",
        },
        filterToggle: true,
        columnToggle: true,
        cardToggle: true,
        exportable: true,
        textWrapToggle: false,
        stickyHeaderToggle: true,
        onRightClick: (item) => ({
          component: UserRowActions,
          idforRowMenu: item.id,
        }),
      }}
      filters={{
        items: {
          date: {
            type: "date",
            key: {
              dateFrom: "dateFrom",
              dateTo: "dateTo",
              preset: "preset",
            },
            props: {
              preset: "lifetime",
            },
          },
          role: {
            key: "role",
            type: "select",
            props: {
              type: "single",
              placeholder: "Select role",
              prependLabel: "Role: ",
              triggerClassname: "w-48!",
              options: [
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ],
            },
          },
        },
      }}

      loading={{
        isLoading,
        Loader: <TableRowsLoading />,
      }}
    />
  );
}
