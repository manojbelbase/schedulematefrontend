"use client";

import { KeyRound } from "lucide-react";
import type { SearchParams } from "nuqs";

import DataTable from "@ui/components/data-table";
import { withDefaultPagination } from "@ui/lib/pagination";

import {
  useBackofficeAccessRequestControllerList,
  type AccessRequestListResponse,
  type BackofficeAccessRequestControllerListQueryParams,
} from "@repo/services/backoffice";

import TableRowsLoading from "@/components/loaders/table-rows-loading";

import { ACCESS_REQUEST_COLUMNS, AccessRequestRowActions } from "./columns";

export function AccessRequestsTable({
  searchParams,
  initialData,
}: {
  searchParams: SearchParams;
  initialData: AccessRequestListResponse;
}) {
  const params =
    withDefaultPagination<BackofficeAccessRequestControllerListQueryParams>(
      searchParams,
    );
  const queryParams: BackofficeAccessRequestControllerListQueryParams = {
    page: params.page,
    take: params.take,
    query: params.query,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
  };

  const { data, isLoading } = useBackofficeAccessRequestControllerList(
    { queryParams },
    { placeholderData: initialData },
  );

  const requests = data?.data ?? [];

  return (
    <DataTable
      columns={ACCESS_REQUEST_COLUMNS}
      data={requests}
      instanceId="backoffice-access-requests-table"
      pagination={data?.pagination}
      header={{
        sidebarToggle: false,
        title: "Access Requests",
      }}
      empty={{
        icon: KeyRound,
        description: "No calendar access requests yet.",
      }}
      functions={{
        search: {
          param: "query",
          placeholder: "Search requests...",
        },
        filterToggle: true,
        columnToggle: true,
        exportable: true,
        onRightClick: (item) => ({
          component: AccessRequestRowActions,
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
      loading={{
        isLoading,
        Loader: <TableRowsLoading />,
      }}
    />
  );
}
