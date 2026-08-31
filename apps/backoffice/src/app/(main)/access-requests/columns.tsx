"use client";

import { type ComponentProps } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";

import { ContextMenuItem } from "@ui/components/animate-ui/components/radix/context-menu";
import { DropdownMenuItem } from "@ui/components/animate-ui/components/radix/dropdown-menu";
import ActionButtons from "@ui/components/data-table/action-buttons";
import { DataTableColumnHeader } from "@ui/components/data-table/header";
import SNCell from "@ui/components/data-table/sn-cell";
import Avatar from "@ui/components/ui/avatar";
import { Badge } from "@ui/components/ui/badge";
import { DateCell } from "@ui/components/ui/date-cell";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import { cn, options } from "@ui/lib/utils";
import type { _ColumnDef } from "@ui/types/globals";

import {
  useBackofficeAccessRequestControllerUpdateStatus,
  type AccessRequestData,
  type AccessRequestStatusEnum,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";

const STATUS_VARIANT: Record<
  AccessRequestStatusEnum,
  ComponentProps<typeof Badge>["variant"]
> = {
  pending: "pending",
  approved: "granted",
  rejected: "rejected",
};

export const ACCESS_REQUEST_COLUMNS: _ColumnDef<AccessRequestData>[] = [
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
    id: "requesterName",
    exportHeader: "Requester",
    meta: { pin: "left" },
    header: (props) => <DataTableColumnHeader {...props} title="Requester" />,
    accessorKey: "requesterName",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar
          name={row.original.requesterName || "User"}
          size={32}
          shape="radius-sm"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {row.original.requesterName || "—"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.requesterEmail}
          </span>
        </div>
      </div>
    ),
    size: 260,
  },
  {
    id: "message",
    exportHeader: "Message",
    header: (props) => <DataTableColumnHeader {...props} title="Message" />,
    accessorKey: "message",
    cell: ({ row }) => (
      <span className="line-clamp-2 text-sm text-muted-foreground">
        {row.original.message || "—"}
      </span>
    ),
    size: 260,
  },
  {
    id: "status",
    exportHeader: "Status",
    header: (props) => <DataTableColumnHeader {...props} title="Status" />,
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        variant={STATUS_VARIANT[row.original.status]}
        className={cn("text-xs capitalize")}
      >
        {row.original.status}
      </Badge>
    ),
    size: 120,
  },
  {
    id: "createdAt",
    exportHeader: "Requested At",
    header: (props) => (
      <DataTableColumnHeader {...props} title="Requested At" />
    ),
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        <DateCell value={row.original.createdAt} />
      </span>
    ),
    size: 160,
  },
  {
    id: TABLE_CONSTANTS.ACTIONS_HEADER,
    enableHiding: false,
    cell: ({ row }) => (
      <AccessRequestRowActions row={row.original} fromRightClick={false} />
    ),
  },
];

export function AccessRequestRowActions({
  fromRightClick,
  children,
  row,
}: ComponentProps<typeof ActionButtons> & {
  row: AccessRequestData;
}) {
  const queryClient = useQueryClient();
  const MenuItem = fromRightClick ? ContextMenuItem : DropdownMenuItem;

  const { mutate: updateStatus, isPending } =
    useBackofficeAccessRequestControllerUpdateStatus(
      options(undefined, async () => {
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.accessRequests,
        });
      }),
    );

  const changeStatus = (status: AccessRequestStatusEnum) => {
    updateStatus({ pathParams: { id: row.id }, body: { status } });
  };

  return (
    <ActionButtons
      items={
        <>
          <MenuItem
            className="w-full px-3"
            disabled={isPending}
            onClick={() => changeStatus("approved")}
          >
            <Check size={16} className="mr-2.5 text-green-600" />
            Approve
          </MenuItem>
          <MenuItem
            className="w-full px-3"
            disabled={isPending}
            onClick={() => changeStatus("rejected")}
          >
            <X size={16} className="mr-2.5 text-red-500" />
            Reject
          </MenuItem>
        </>
      }
      fromRightClick={fromRightClick}
      name="Request"
      itemsPosition="first"
    >
      {children}
    </ActionButtons>
  );
}
