"use client";

import type { ReactNode } from "react";

import { Button } from "@ui/components/ui/button";
import { DateCell } from "@ui/components/ui/date-cell";
import type { _TModalProps } from "@ui/types/globals";

import type { PublicUser } from "@repo/services/backoffice";

type TUserViewModalData = {
  user?: PublicUser;
};

export default function ViewUserModal({
  close,
  data,
}: _TModalProps<TUserViewModalData>) {
  const user = data?.user;
  if (!user) return null;

  return (
    <div className="space-y-3 text-sm">
      <Row label="Name" value={user.name || "—"} />
      <Row label="Email" value={user.email} />
      <Row label="Username" value={user.username ? `@${user.username}` : "—"} />
      <Row label="Role" value={user.role || "—"} />
      <Row label="Created At">
        <DateCell value={user.createdAt} />
      </Row>
      <div className="flex justify-end pt-2">
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? children}</span>
    </div>
  );
}
