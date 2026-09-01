"use client";

import { type ComponentProps } from "react";
import { useQueryClient } from "@tanstack/react-query";

import ActionButtons from "@ui/components/data-table/action-buttons";
import { DataTableColumnHeader } from "@ui/components/data-table/header";
import SNCell from "@ui/components/data-table/sn-cell";
import { Badge } from "@ui/components/ui/badge";
import { Switch } from "@ui/components/ui/switch";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import { cn, options } from "@ui/lib/utils";
import type { _ColumnDef } from "@ui/types/globals";

import {
  useEmbeddingConfigControllerUpdateConfig,
  type EmbeddingConfigData,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";

export const EMBEDDING_CONFIG_COLUMNS: _ColumnDef<EmbeddingConfigData>[] = [
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
    cell: ({ row }) => <EmbeddingConfigStatusCell row={row.original} />,
    size: 120,
  },
  {
    id: "apiKey",
    exportHeader: "API Key",
    header: (props) => <DataTableColumnHeader {...props} title="API Key" />,
    accessorKey: "apiKey",
    cell: ({ row }) => {
      const key = row.original.apiKey;
      if (!key) return <span className="text-muted-foreground">—</span>;
      const masked =
        key.length > 4
          ? `${key.slice(0, 4)}${"\u2022".repeat(key.length - 4)}`
          : "\u2022".repeat(key.length);
      return (
        <span className="font-mono text-sm tracking-widest">{masked}</span>
      );
    },
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
    id: "dimension",
    exportHeader: "Dimension",
    header: (props) => <DataTableColumnHeader {...props} title="Dimension" />,
    accessorKey: "dimension",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.original.dimension}
      </Badge>
    ),
    size: 120,
  },
  {
    id: TABLE_CONSTANTS.ACTIONS_HEADER,
    enableHiding: false,
    cell: ({ row }) => (
      <EmbeddingConfigRowActions fromRightClick={false} row={row.original} />
    ),
  },
];

function EmbeddingConfigStatusCell({ row }: { row: EmbeddingConfigData }) {
  const queryClient = useQueryClient();
  const { mutate: setActive, isPending } =
    useEmbeddingConfigControllerUpdateConfig(
      options(undefined, async () => {
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.embeddingConfig,
        });
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

export function EmbeddingConfigRowActions({
  fromRightClick,
  children,
  row,
}: ComponentProps<typeof ActionButtons> & {
  row: EmbeddingConfigData;
}) {
  return (
    <ActionButtons
      edit={{
        modalID: "EDIT_EMBEDDING_CONFIG",
        type: "MODAL",
        data: { config: row },
      }}
      remove={{
        modalID: "DELETE_MODAL",
        type: "MODAL",
        label: "Delete",
        data: {
          id: "embedding-config",
          name: row.name,
          initiatorName: row.id,
        },
      }}

      itemsPosition="last"
      fromRightClick={fromRightClick}
      name="Configuration"
    >
      {children}
    </ActionButtons>
  );
}
