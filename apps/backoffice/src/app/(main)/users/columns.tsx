import { type ComponentProps } from "react";
import { format } from "date-fns";

import ActionButtons from "@ui/components/data-table/action-buttons";
import { DataTableColumnHeader } from "@ui/components/data-table/header";
import SNCell from "@ui/components/data-table/sn-cell";
import Avatar from "@ui/components/ui/avatar";
import { Badge } from "@ui/components/ui/badge";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import { cn } from "@ui/lib/utils";
import type { _ColumnDef } from "@ui/types/globals";

import type { PublicUser } from "@repo/services/backoffice";

export const USER_COLUMNS: _ColumnDef<PublicUser>[] = [
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
    meta: {
      pin: "left",
    },
    header: (props) => <DataTableColumnHeader {...props} title="Name" />,
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar
          name={row.original.name || "User"}
          size={36}
          shape="radius-md"
        />
        <div className="font-medium text-sm">{row.original.name || "—"}</div>
      </div>
    ),
    size: 260,
  },
  {
    id: "email",
    exportHeader: "Email",
    header: (props) => <DataTableColumnHeader {...props} title="Email" />,
    accessorKey: "email",
    cell: ({ row }) => <span>{row.original.email}</span>,
    size: 260,
  },
  {
    id: "username",
    exportHeader: "Username",
    header: (props) => <DataTableColumnHeader {...props} title="Username" />,
    accessorKey: "username",
    cell: ({ row }) =>
      row.original.username ? (
        <span>@{row.original.username}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    size: 160,
  },
  {
    id: "role",
    exportHeader: "Role",
    header: (props) => <DataTableColumnHeader {...props} title="Role" />,
    accessorKey: "role",
    cell: ({ row }) => (
      <Badge
        variant={row.original.role === "admin" ? "default" : "secondary"}
        className={cn("text-xs")}
      >
        {row.original.role || "user"}
      </Badge>
    ),
    size: 120,
  },
  {
    id: "createdAt",
    exportHeader: "Created At",
    header: (props) => <DataTableColumnHeader {...props} title="Created At" />,
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "dd MMM, yyyy")
          : "—"}
      </span>
    ),
    size: 160,
  },
  {
    id: TABLE_CONSTANTS.ACTIONS_HEADER,
    enableHiding: false,
    cell: ({ row }) => (
      <UserRowActions row={row.original} fromRightClick={false} />
    ),
  },
];

export function UserRowActions({
  fromRightClick,
  children,
  row,
}: ComponentProps<typeof ActionButtons> & {
  row: PublicUser;
}) {
  return (
    <ActionButtons
      view={{
        modalID: "VIEW_USER",
        type: "MODAL",
        data: { user: row },
      }}
      edit={{
        modalID: "EDIT_USER",
        type: "MODAL",
        data: { user: row },
      }}
      remove={{
        modalID: "DELETE_MODAL",
        type: "MODAL",
        label: "Delete",
        data: {
          id: "user",
          name: row.name || row.email,
          initiatorName: row.id,
        },
      }}
      fromRightClick={fromRightClick}
      name="User"
    >
      {children}
    </ActionButtons>
  );
}
