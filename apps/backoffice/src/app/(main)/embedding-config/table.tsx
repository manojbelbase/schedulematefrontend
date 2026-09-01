"use client";

import { Zap } from "lucide-react";
import type { SearchParams } from "nuqs";

import DataTable from "@ui/components/data-table";
import { withDefaultPagination } from "@ui/lib/pagination";

import {
  useEmbeddingConfigControllerListConfigs,
  type EmbeddingConfigControllerListConfigsQueryParams,
  type EmbeddingConfigListResponse,
} from "@repo/services/backoffice";

import TableRowsLoading from "@/components/loaders/table-rows-loading";

import { EMBEDDING_CONFIG_COLUMNS, EmbeddingConfigRowActions } from "./columns";

export function EmbeddingConfigTable({
  searchParams,
  initialData,
}: {
  searchParams: SearchParams;
  initialData: EmbeddingConfigListResponse;
}) {
  const params =
    withDefaultPagination<EmbeddingConfigControllerListConfigsQueryParams>(
      searchParams,
    );
  const queryParams: EmbeddingConfigControllerListConfigsQueryParams = {};
  queryParams.page = params.page;
  queryParams.take = params.take;
  if (params.query) queryParams.query = params.query;
  if (params.dateFrom) queryParams.dateFrom = params.dateFrom;
  if (params.dateTo) queryParams.dateTo = params.dateTo;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

  const { data, isLoading } = useEmbeddingConfigControllerListConfigs(
    { queryParams },
    { placeholderData: initialData },
  );

  const configs = data?.data ?? [];

  return (
    <DataTable
      columns={EMBEDDING_CONFIG_COLUMNS}
      data={configs}
      instanceId="backoffice-embedding-config-table"
      pagination={data?.pagination}
      header={{
        sidebarToggle: false,
        title: "Embedding Config",
      }}

      functions={{
        search: {
          param: "query",
          placeholder: "Search ...",
        },
        add: {
          label: "Add Config",
          modal: {
            modalID: "ADD_EMBEDDING_CONFIG",
            type: "MODAL",
          },
        },
        filterToggle: true,
        cardToggle: true,
        columnToggle: true,
        exportable: true,
        textWrapToggle: true,
        onRightClick: (item) => ({
          component: EmbeddingConfigRowActions,
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
      empty={{
        icon: Zap,
        description: "Connect an embedding provider to get started.",
      }}
      loading={{
        isLoading,
        Loader: <TableRowsLoading />,
      }}
    />
  );
}
