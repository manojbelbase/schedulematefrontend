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
  };

  const { data, isLoading } = useBackofficeControllerListUsers(
    { queryParams },
    { placeholderData: initialData },
  );

  return (
    <DataTable
      columns={USER_COLUMNS}
      data={data?.data ?? []}
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
        exportable: true,
        textWrapToggle: true,
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
        },
      }}
      hasEditPermission
      loading={{
        isLoading,
        Loader: <TableRowsLoading />,
      }}
    />
  );
}
