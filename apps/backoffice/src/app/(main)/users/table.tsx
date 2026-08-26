"use client";

import type { SearchParams } from "nuqs";

import DataTable from "@ui/components/data-table";
import { withDefaultPagination } from "@ui/lib/pagination";

import {
  useBackofficeControllerListUsers,
  type BackofficeControllerListUsersQueryParams,
  type BackofficeUserListResponse,
} from "@repo/services/backoffice";

import TableRowsLoading from "@/components/loaders/table-rows-loading";

import { USER_COLUMNS, UserRowActions } from "./columns";

export function UsersTable({
  searchParams,
  initialData,
}: {
  searchParams: SearchParams;
  initialData: BackofficeUserListResponse;
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

  const users = data?.data ?? [];

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
