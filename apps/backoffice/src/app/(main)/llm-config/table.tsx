"use client";

import { Bot } from "lucide-react";
import type { SearchParams } from "nuqs";

import DataTable from "@ui/components/data-table";
import { withDefaultPagination } from "@ui/lib/pagination";

import {
  useLlmConfigControllerListConfigs,
  type LlmConfigControllerListConfigsQueryParams,
  type LlmConfigListResponse,
} from "@repo/services/backoffice";

import { LLM_CONFIG_COLUMNS, LlmConfigRowActions } from "./columns";

export function LlmConfigTable({
  searchParams,
  initialData,
}: {
  searchParams: SearchParams;
  initialData: LlmConfigListResponse;
}) {
  const params =
    withDefaultPagination<LlmConfigControllerListConfigsQueryParams>(
      searchParams,
    );
  const queryParams: LlmConfigControllerListConfigsQueryParams = {};
  queryParams.page = params.page;
  queryParams.take = params.take;
  if (params.query) queryParams.query = params.query;
  if (params.dateFrom) queryParams.dateFrom = params.dateFrom;
  if (params.dateTo) queryParams.dateTo = params.dateTo;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

  const { data, isLoading } = useLlmConfigControllerListConfigs(
    { queryParams },
    { placeholderData: initialData },
  );

  const configs = data?.data ?? [];

  return (
    <DataTable
      columns={LLM_CONFIG_COLUMNS}
      data={configs}
      instanceId="backoffice-llm-config-table"
      pagination={data?.pagination}
      header={{
        sidebarToggle: false,
        title: "LLM Config",
      }}

      functions={{
        search: {
          param: "query",
          placeholder: "Search ...",
        },
        add: {
          label: "Add Config",
          modal: {
            modalID: "ADD_LLM_CONFIG",
            type: "MODAL",
          },
        },
        filterToggle: true,
        cardToggle: true,
        columnToggle: true,
        exportable: true,
        textWrapToggle: true,
        onRightClick: (item) => ({
          component: LlmConfigRowActions,
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
        icon: Bot,
        description: "Connect an LLM provider to get started.",
      }}
      loading={{ isLoading }}
    />
  );
}
