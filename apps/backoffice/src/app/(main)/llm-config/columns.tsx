"use client";

import { type ComponentProps } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Power } from "lucide-react";

import { ContextMenuItem } from "@ui/components/animate-ui/components/radix/context-menu";
import { DropdownMenuItem } from "@ui/components/animate-ui/components/radix/dropdown-menu";
import ActionButtons from "@ui/components/data-table/action-buttons";
import { DataTableColumnHeader } from "@ui/components/data-table/header";
import SNCell from "@ui/components/data-table/sn-cell";
import { Badge } from "@ui/components/ui/badge";
import { Switch } from "@ui/components/ui/switch";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import { cn, options } from "@ui/lib/utils";
import type { _ColumnDef } from "@ui/types/globals";

import {
  useLlmConfigControllerUpdateConfig,
  type LlmConfigData,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";

export const LLM_CONFIG_COLUMNS: _ColumnDef<LlmConfigData>[] = [
  {
    id: TABLE_CONSTANTS.SN_HEADER,
    accessorKey: "id",
    header: (props) => (
      <DataTableColumnHeader
        {...props}
        title={TABLE_CONSTANTS.SN_HEADER}
        variant="sn"
      />
    ),
    cell: (props) => <SNCell {...props} />,
    size: TABLE_CONSTANTS.SN_WIDTH,
    enableHiding: false,
  },
  {
    id: "name",
    exportHeader: "Name",
    header: (props) => <DataTableColumnHeader {...props} title="Name" />,
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original.name}</div>
    ),
    size: 160,
  },
  {
    id: "activeProvider",
    exportHeader: "Active Provider",
    header: (props) => <DataTableColumnHeader {...props} title="Provider" />,
    accessorKey: "activeProvider",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-xs">
        {row.original.activeProvider}
      </Badge>
    ),
    size: 140,
  },
  {
    id: "status",
    exportHeader: "Status",
    header: (props) => <DataTableColumnHeader {...props} title="Status" />,
    accessorKey: "isActive",
    cell: ({ row }) => <LlmConfigStatusCell row={row.original} />,
    size: 120,
  },
  {
    id: "apiKey",
    exportHeader: "API Key",
    header: (props) => <DataTableColumnHeader {...props} title="API Key" />,
    accessorKey: "apiKey",
    cell: ({ row }) =>
      row.original.apiKey ? (
        <span className="font-mono text-sm tracking-widest">
          {"\u2022".repeat(16)}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    size: 200,
  },
  {
    id: "model",
    exportHeader: "Model",
    header: (props) => <DataTableColumnHeader {...props} title="Model" />,
    accessorKey: "model",
    cell: ({ row }) =>
      row.original.model ? (
        <span>{row.original.model}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    size: 200,
  },
  {
    id: "baseUrl",
    exportHeader: "Base URL",
    header: (props) => <DataTableColumnHeader {...props} title="Base URL" />,
    accessorKey: "baseUrl",
    cell: ({ row }) =>
      row.original.baseUrl ? (
        <span className="text-muted-foreground">{row.original.baseUrl}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    size: 300,
  },
  {
    id: TABLE_CONSTANTS.ACTIONS_HEADER,
    enableHiding: false,
    cell: ({ row }) => (
      <LlmConfigRowActions fromRightClick={false} row={row.original} />
    ),
  },
];

function LlmConfigStatusCell({ row }: { row: LlmConfigData }) {
  const queryClient = useQueryClient();
  const { mutate: setActive, isPending } = useLlmConfigControllerUpdateConfig(
    options(undefined, async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.llmConfig });
    }),
  );

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={row.isActive}
        disabled={row.isActive || isPending}
        aria-label={
          row.isActive ? `${row.name} is active` : `Set ${row.name} active`
        }
        onCheckedChange={(checked) => {
          if (checked) {
            setActive({
              pathParams: { id: row.id },
              body: { isActive: true },
            });
          }
        }}
      />
      <Badge
        variant={row.isActive ? "default" : "secondary"}
        className={cn("text-xs")}
      >
        {row.isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}

export function LlmConfigRowActions({
  fromRightClick,
  children,
  row,
}: ComponentProps<typeof ActionButtons> & {
  row: LlmConfigData;
}) {
  const queryClient = useQueryClient();
  const MenuItem = fromRightClick ? ContextMenuItem : DropdownMenuItem;

  const { mutate: setActive, isPending } = useLlmConfigControllerUpdateConfig(
    options(undefined, async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.llmConfig });
    }),
  );

  return (
    <ActionButtons
      edit={{
        modalID: "EDIT_LLM_CONFIG",
        type: "MODAL",
        data: { config: row },
      }}
      remove={{
        modalID: "DELETE_MODAL",
        type: "MODAL",
        label: "Delete",
        data: {
          id: "llm-config",
          name: row.name,
          initiatorName: row.id,
        },
      }}
      items={
        !row.isActive ? (
          <MenuItem
            className="w-full px-3"
            disabled={isPending}
            onSelect={() =>
              setActive({
                pathParams: { id: row.id },
                body: { isActive: true },
              })
            }
          >
            <Power size={16} className="mr-2.5" />
            Set Active
          </MenuItem>
        ) : undefined
      }
      itemsPosition="last"
      fromRightClick={fromRightClick}
      name="Configuration"
    >
      {children}
    </ActionButtons>
  );
}
