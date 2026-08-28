"use client";

import DataTable from "@ui/components/data-table";

import {
  useLlmConfigControllerListConfigs,
  type LlmConfigListResponse,
} from "@repo/services/backoffice";

import TableRowsLoading from "@/components/loaders/table-rows-loading";

import { LLM_CONFIG_COLUMNS, LlmConfigRowActions } from "./columns";

export function LlmConfigTable({
  initialData,
}: {
  initialData: LlmConfigListResponse;
}) {
  const { data, isLoading } = useLlmConfigControllerListConfigs(
    {},
    { placeholderData: initialData },
  );

  const configs = data?.data ?? [];

  return (
    <DataTable
      columns={LLM_CONFIG_COLUMNS}
      data={configs}
      instanceId="backoffice-llm-config-table"
      header={{
        sidebarToggle: false,
        title: "LLM Config",
      }}
      functions={{
        add: {
          label: "Add Config",
          modal: {
            modalID: "ADD_LLM_CONFIG",
            type: "MODAL",
          },
        },
        cardToggle: true,
        columnToggle: true,
        exportable: true,
        textWrapToggle: true,
        onRightClick: (item) => ({
          component: LlmConfigRowActions,
          idforRowMenu: item.id,
        }),
      }}
      loading={{
        isLoading,
        Loader: <TableRowsLoading />,
      }}
    />
  );
}
