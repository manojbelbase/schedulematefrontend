"use client";

import { Button } from "@ui/components/ui/button";
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
      <Row label="Created At" value={user.createdAt || "—"} />
      <div className="flex justify-end pt-2">
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
